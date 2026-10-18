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

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function prune(now: number): void {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(request: Request, now = Date.now()): RateLimitResult {
  prune(now);
  const key = clientKey(request);
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
