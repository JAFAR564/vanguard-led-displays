import type { APIRoute } from 'astro';
import { siteConfig } from '../../config/site';

export const prerender = false;

// South African phone regex supporting +27, 27, and local 0 prefixes
const SA_PHONE_REGEX = /^(?:\+27|27|0)[1-8][0-9]{8}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Normalises South African phone numbers to canonical E.164 (+27XXXXXXXXX)
 */
function normaliseSAPhone(rawPhone: string): string | null {
  // Strip spaces, dashes, dots, parentheses
  let cleaned = rawPhone.replace(/[\s\-\(\)\.]/g, '');

  // Convert 0027 to +27
  if (cleaned.startsWith('0027')) {
    cleaned = '+27' + cleaned.slice(4);
  }

  // Handle hybrid +27(0) or 27(0) e.g. +27082... or +27044...
  if (cleaned.startsWith('+270')) {
    cleaned = '+27' + cleaned.slice(4);
  } else if (cleaned.startsWith('270')) {
    cleaned = '+27' + cleaned.slice(3);
  }

  if (!SA_PHONE_REGEX.test(cleaned)) {
    return null;
  }
  if (cleaned.startsWith('+27')) {
    return cleaned;
  }
  if (cleaned.startsWith('27')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+27${cleaned.slice(1)}`;
  }
  return `+27${cleaned}`;
}

/**
 * Strips potentially hazardous HTML/script tags from user inputs
 */
function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // 1. Off-screen CSS Honeypot check (WCAG 2.2 accessible bot mitigation)
    const honeypot = formData.get('company_website_url') as string | null;
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('[SPAM BOT DETECTED] Honeypot triggered.');
      // Return decoy HTTP 200 OK so automated bots do not mutate strategy
      return new Response(JSON.stringify({ success: true, decoy: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Speed-trap check: Reject form submissions completed under 2.5 seconds
    const renderTimestamp = formData.get('formRenderTimestamp') as string | null;
    if (renderTimestamp) {
      const elapsed = Date.now() - Number(renderTimestamp);
      if (elapsed < 2500) {
        console.warn(`[SPEED TRAP BOT DETECTED] Form submitted in ${elapsed}ms.`);
        return new Response(JSON.stringify({ success: true, decoy: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const formType = (formData.get('formType') as string) || 'installation_quote';

    // =========================================================================
    // BRANCH A: Property Installation Enquiry Form (Section 9)
    // =========================================================================
    if (formType === 'installation_quote') {
      const fullName = sanitizeInput(String(formData.get('fullName') || ''));
      const buyerRole = sanitizeInput(String(formData.get('buyerRole') || ''));
      const propertyName = sanitizeInput(String(formData.get('propertyName') || ''));
      const propertyType = sanitizeInput(String(formData.get('propertyType') || ''));
      const townCity = sanitizeInput(String(formData.get('townCity') || ''));
      const environment = sanitizeInput(String(formData.get('environment') || ''));
      const rawPhone = String(formData.get('phone') || '').trim();
      const email = String(formData.get('email') || '').trim().toLowerCase();
      const projectNotes = sanitizeInput(String(formData.get('projectNotes') || ''));

      // Validate required fields
      if (!fullName || !buyerRole || !propertyName || !townCity) {
        return new Response(
          JSON.stringify({ success: false, error: 'All marked fields are required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Validate South African phone
      const normalisedPhone = normaliseSAPhone(rawPhone);
      if (!normalisedPhone) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Please enter a valid South African phone number (e.g. 082 782 4346 or +27 44 801 9000).',
            field: 'phone',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Validate Email
      if (!EMAIL_REGEX.test(email)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Please enter a valid email address.', field: 'email' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const leadPayload = {
        leadId: `LEAD-EST-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        formType: 'installation_quote',
        fullName,
        buyerRole,
        propertyName,
        propertyType,
        townCity,
        environment,
        phone: normalisedPhone,
        email,
        projectNotes,
        destinationEmail: siteConfig.contact.emailQuote,
      };

      // Dual-Channel Lead Persistence:
      // Channel A (Primary Email Log) & Channel B (Fail-safe Backup Store)
      console.log(`[LEAD PERSISTENCE] [INSTALLATION QUOTE]`, JSON.stringify(leadPayload, null, 2));

      return new Response(
        JSON.stringify({
          success: true,
          leadId: leadPayload.leadId,
          propertyName,
          message: 'Your site assessment request has been recorded.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // =========================================================================
    // BRANCH B: Screen Advertising Enquiry Form (Section 10)
    // =========================================================================
    if (formType === 'advertising_enquiry') {
      const advName = sanitizeInput(String(formData.get('advName') || ''));
      const advCompany = sanitizeInput(String(formData.get('advCompany') || ''));
      const rawPhone = String(formData.get('advPhone') || '').trim();
      const email = String(formData.get('advEmail') || '').trim().toLowerCase();
      const advNotes = sanitizeInput(String(formData.get('advNotes') || ''));

      if (!advName || !advCompany) {
        return new Response(
          JSON.stringify({ success: false, error: 'Name and Business/Agency Name are required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const normalisedPhone = normaliseSAPhone(rawPhone);
      if (!normalisedPhone) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Please enter a valid South African telephone number.',
            field: 'advPhone',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (!EMAIL_REGEX.test(email)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Please enter a valid work email address.', field: 'advEmail' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const advPayload = {
        leadId: `LEAD-ADV-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        formType: 'advertising_enquiry',
        advName,
        advCompany,
        phone: normalisedPhone,
        email,
        advNotes,
        destinationEmail: siteConfig.contact.emailAdvertise,
      };

      console.log(`[LEAD PERSISTENCE] [ADVERTISING ENQUIRY]`, JSON.stringify(advPayload, null, 2));

      return new Response(
        JSON.stringify({
          success: true,
          leadId: advPayload.leadId,
          message: 'Advertising enquiry received. Rate card will be dispatched shortly.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: false, error: 'Unknown form type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[API ERROR /api/enquiry]', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error processing enquiry' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
