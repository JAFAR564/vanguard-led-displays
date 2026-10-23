/**
 * In-process rate limiting.
 *
 * Deliberately small: six submissions per client per ten minutes. On a
 * serverless platform each instance keeps its own window, so this is a blunt
 * abuse brake rather than a security control. Pair it with the platform WAF if
 * form spam becomes a problem.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;

/**
 * The store is bounded. A long-running standalone Node process would otherwise
 * grow a bucket per distinct client forever; a burst of live IPs is as much a
 * problem as expired ones, so eviction is by soonest expiry rather than by age.
 */
const MAX_BUCKETS = 5000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const IPV4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;

function isIpv4(value: string): boolean {
  if (!IPV4.test(value)) return false;
  return value.split('.').every((part) => Number(part) <= 255);
}

function isIpv6Groups(value: string): boolean {
  if (!value.includes(':') || value.split('::').length > 2) return false;
  const groups = value.split(':').filter((group) => group.length > 0);
  if (groups.length > 8) return false;
  if (!value.includes('::') && groups.length !== 8) return false;
  return groups.every((group) => /^[0-9a-fA-F]{1,4}$/.test(group));
}

function isIpv6(value: string): boolean {
  // An IPv4-mapped address ends in a dotted quad; validate both halves.
  const mapped = value.match(/^(.*:)(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mapped) {
    if (!isIpv4(mapped[2]!)) return false;
    const head = mapped[1]!;
    return head === ':' || isIpv6Groups(head.replace(/:$/, ''));
  }
  return isIpv6Groups(value);
}

function isIp(value: string): boolean {
  return isIpv4(value) || isIpv6(value);
}

/**
 * Client IP, from headers the platform sets.
 *
 * `x-real-ip` and `cf-connecting-ip` are written by the proxy, so a client
 * cannot choose its own bucket by sending one. `x-forwarded-for` is read from
 * the right, because that is where the nearest proxy appends; everything to its
 * left arrived with the request and is worth nothing.
 *
 * Self-hosted Node: these headers are only trustworthy if the reverse proxy
 * overwrites them. HANDOVER §6 already requires a reverse proxy in front.
 */
export function clientIp(request: Request): string {
  const direct = (
    request.headers.get('x-real-ip') ??
    request.headers.get('cf-connecting-ip') ??
    ''
  ).trim();
  if (direct && isIp(direct)) return direct;

  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  if (forwarded) {
    const chain = forwarded
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
    for (let i = chain.length - 1; i >= 0; i -= 1) {
      const candidate = chain[i]!;
      if (isIp(candidate)) return candidate;
    }
  }

  return 'unknown';
}

function prune(now: number): void {
  if (buckets.size < 500) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  if (buckets.size <= MAX_BUCKETS) return;

  const excess = buckets.size - MAX_BUCKETS;
  const oldest = [...buckets.entries()]
    .sort((a, b) => a[1].resetAt - b[1].resetAt)
    .slice(0, excess);
  for (const [key] of oldest) buckets.delete(key);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(request: Request, now = Date.now()): RateLimitResult {
  prune(now);
  const key = clientIp(request);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - existing.count, retryAfterSeconds: 0 };
}

/** Exposed for tests and for clearing the window between integration runs. */
export function resetRateLimit(): void {
  buckets.clear();
}
