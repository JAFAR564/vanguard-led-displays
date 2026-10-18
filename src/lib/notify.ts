/**
 * Lead delivery transports.
 *
 * One transport is enough. A webhook suits a CRM or automation platform;
 * Resend suits an inbox. With NODE_ENV=production and neither configured the
 * API returns 503 rather than accepting a lead it cannot deliver.
 */

import type { EnquiryValues } from './validation';

export interface DeliveryResult {
  delivered: boolean;
  transport: 'webhook' | 'email' | 'none';
  error?: string;
}

const webhookUrl = () => process.env.LEAD_WEBHOOK_URL?.trim() ?? '';
const webhookSecret = () => process.env.LEAD_WEBHOOK_SECRET?.trim() ?? '';
const resendKey = () => process.env.RESEND_API_KEY?.trim() ?? '';
const toEmail = () => process.env.LEAD_TO_EMAIL?.trim() ?? 'quotes@leddisplays.co.za';
const fromEmail = () => process.env.LEAD_FROM_EMAIL?.trim() ?? 'website@leddisplays.co.za';

export function deliveryConfigured(): boolean {
  return Boolean(webhookUrl() || resendKey());
}

export function activeTransport(): DeliveryResult['transport'] {
  if (webhookUrl()) return 'webhook';
  if (resendKey()) return 'email';
  return 'none';
}

/** Plain-text summary, used for both transports. */
export function formatLead(values: EnquiryValues, reference: string, sourcePath: string): string {
  const lines: string[] = [
    `Reference: ${reference}`,
    `Type: ${values.formType === 'installation_quote' ? 'Installation survey' : 'Advertising enquiry'}`,
    `Received: ${new Date().toISOString()}`,
    `Source: ${sourcePath || '/'}`,
    '',
    `Name: ${values.fullName}`,
    values.formType === 'installation_quote'
      ? `Role: ${values.buyerRole}`
      : `Business: ${values.company}`,
  ];

  if (values.formType === 'installation_quote') {
    lines.push(
      `Property: ${values.propertyName}`,
      `Town / city: ${values.townCity}`,
      `Property type: ${values.propertyType}`,
      `Environment: ${values.environment || 'Not specified'}`,
    );
  }

  lines.push(`Phone: ${values.phone}`, `Email: ${values.email}`, '', 'Notes:', values.notes || '—');

  return lines.join('\n');
}

async function sendWebhook(text: string, values: EnquiryValues, reference: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (webhookSecret()) headers['X-Vanguard-Secret'] = webhookSecret();

  const response = await fetch(webhookUrl(), {
    method: 'POST',
    headers,
    body: JSON.stringify({ reference, text, lead: values }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
}

async function sendEmail(text: string, values: EnquiryValues) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Vanguard website <${fromEmail()}>`,
      to: [toEmail()],
      reply_to: values.email,
      subject: `Website enquiry — ${values.fullName}`,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Resend returned ${response.status}`);
}

export async function deliverLead(
  values: EnquiryValues,
  reference: string,
  sourcePath: string,
): Promise<DeliveryResult> {
  const transport = activeTransport();
  if (transport === 'none') return { delivered: false, transport };

  const text = formatLead(values, reference, sourcePath);

  try {
    if (transport === 'webhook') await sendWebhook(text, values, reference);
    else await sendEmail(text, values);
    return { delivered: true, transport };
  } catch (error) {
    console.error('[leads] delivery failed', reference, transport, error);
    return {
      delivered: false,
      transport,
      error: error instanceof Error ? error.message : 'Unknown delivery error',
    };
  }
}
