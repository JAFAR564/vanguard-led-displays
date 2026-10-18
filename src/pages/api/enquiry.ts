import type { APIRoute } from 'astro';
import { validateEnquiry, type FormType } from '../../lib/validation';
import { persistLead } from '../../lib/lead-storage';
import { deliverLead, deliveryConfigured, activeTransport } from '../../lib/notify';
import { rateLimit } from '../../lib/rate-limit';

export const prerender = false;

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function json(body: unknown, status: number, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extra },
  });
}

/**
 * Origin check.
 *
 * Astro's built-in CSRF check is disabled in astro.config.mjs because the Node
 * adapter rewrites request.url to http://localhost. We compare the Origin host
 * against the request host instead, plus any extra hosts in ALLOWED_ORIGINS.
 * Requests without an Origin header (curl, server-to-server) are allowed.
 */
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }

  const requestHost = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '')
    .split(',')[0]!
    .trim()
    .toLowerCase();

  if (requestHost && originHost === requestHost) return true;

  const extra = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return extra.some((entry) => {
    if (entry === originHost) return true;
    try {
      return new URL(entry).host.toLowerCase() === originHost;
    } catch {
      return false;
    }
  });
}

function reference(formType: FormType): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 3; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return formType === 'advertising_enquiry' ? `VGD-ADV-${stamp}${suffix}` : `VGD-${stamp}${suffix}`;
}

function sourcePathOf(value: unknown): string {
  const raw = String(value ?? '/').trim();
  if (!raw.startsWith('/')) return '/';
  return raw.slice(0, 120);
}

export const POST: APIRoute = async ({ request }) => {
  if (!isAllowedOrigin(request)) {
    return json({ success: false, error: 'Request rejected.' }, 403);
  }

  const limit = rateLimit(request);
  if (!limit.allowed) {
    return json(
      {
        success: false,
        error: 'Too many submissions. Please try again shortly, or call us directly.',
      },
      429,
      { 'Retry-After': String(limit.retryAfterSeconds) },
    );
  }

  // Fail closed: never accept a lead in production that cannot be delivered.
  const requireDelivery = process.env.REQUIRE_LEAD_DELIVERY !== 'false';
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction && requireDelivery && !deliveryConfigured()) {
    console.error('[leads] production submission refused: no delivery transport configured');
    return json(
      {
        success: false,
        error: 'DELIVERY_UNAVAILABLE',
        message:
          'Online enquiries are temporarily unavailable. Please call or WhatsApp us and we will respond directly.',
      },
      503,
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, error: 'Expected a form submission.' }, 400);
  }

  // Honeypot: accept silently so automated clients learn nothing.
  const honeypot = String(form.get('company_website_url') ?? '').trim();
  if (honeypot) {
    console.warn('[leads] honeypot triggered');
    return json({ success: true, delivered: false }, 200);
  }

  // Time trap: a form completed in under two seconds was not filled by a person.
  const rendered = Number(form.get('formRenderTimestamp'));
  if (Number.isFinite(rendered) && rendered > 0) {
    const elapsed = Date.now() - rendered;
    if (elapsed >= 0 && elapsed < 2000) {
      console.warn(`[leads] time trap triggered after ${elapsed}ms`);
      return json({ success: true, delivered: false }, 200);
    }
  }

  const formType = String(form.get('formType') ?? 'installation_quote') as FormType;
  if (formType !== 'installation_quote' && formType !== 'advertising_enquiry') {
    return json({ success: false, error: 'Unknown form type.' }, 400);
  }

  const data: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === 'string') data[key] = value;
  }

  const result = validateEnquiry(formType, data);
  if (!result.valid) {
    return json(
      {
        success: false,
        error: 'Please check the highlighted fields.',
        errors: result.errors,
      },
      400,
    );
  }

  const ref = reference(formType);
  const sourcePath = sourcePathOf(form.get('sourcePath'));
  const submittedAt = new Date().toISOString();

  try {
    await persistLead({
      reference: ref,
      submittedAt,
      sourcePath,
      ...result.values,
    });
  } catch (error) {
    console.error('[leads] ledger write failed', ref, error);
    return json(
      {
        success: false,
        error: 'We could not record your enquiry. Please call or email us directly.',
      },
      500,
    );
  }

  const delivery = await deliverLead(result.values, ref, sourcePath);

  if (!delivery.delivered && isProduction && requireDelivery) {
    return json(
      {
        success: false,
        reference: ref,
        error: 'DELIVERY_UNAVAILABLE',
        message: 'Your enquiry was recorded, but delivery failed. Please call us to confirm.',
      },
      503,
    );
  }

  const message =
    formType === 'installation_quote'
      ? 'Your survey request has been recorded.'
      : 'Your advertising enquiry has been recorded.';

  console.info(
    `[leads] ${ref} · ${formType} · ${activeTransport()} · ${delivery.delivered ? 'delivered' : 'not delivered'}`,
  );

  return json(
    {
      success: true,
      reference: ref,
      delivered: delivery.delivered,
      message,
    },
    200,
  );
};

export const ALL: APIRoute = ({ request }) => {
  const headers = { Allow: 'POST', ...JSON_HEADERS };
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }
  return new Response(JSON.stringify({ success: false, error: 'Method not allowed.' }), {
    status: 405,
    headers,
  });
};
