/**
 * Shared validation for the two enquiry forms.
 *
 * Imported by the API route and by the browser components, so a message the
 * visitor sees is always the same message the server would have returned.
 */

export type FormType = 'installation_quote' | 'advertising_enquiry';

export type FieldErrors = Record<string, string>;

export interface InstallationValues {
  formType: 'installation_quote';
  fullName: string;
  buyerRole: string;
  propertyName: string;
  townCity: string;
  propertyType: string;
  environment: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

export interface AdvertisingValues {
  formType: 'advertising_enquiry';
  fullName: string;
  company: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

export type EnquiryValues = InstallationValues | AdvertisingValues;

export type ValidationResult =
  { valid: true; values: EnquiryValues } | { valid: false; errors: FieldErrors };

const SA_PHONE = /^(?:\+27|27|0)[1-8]\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Strip angle brackets and control characters, collapse whitespace. */
export function clean(value: unknown, max = 2000): string {
  return (
    String(value ?? '')
      .replace(/[<>]/g, '')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001f\u007f]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max)
  );
}

/** Normalise South African numbers to E.164 (+27XXXXXXXXX), or null. */
export function normalisePhone(raw: string): string | null {
  let value = String(raw ?? '').replace(/[\s\-().]/g, '');

  if (value.startsWith('0027')) value = `+27${value.slice(4)}`;
  if (value.startsWith('+270')) value = `+27${value.slice(4)}`;
  else if (value.startsWith('270')) value = `+27${value.slice(3)}`;

  if (!SA_PHONE.test(value)) return null;
  if (value.startsWith('+27')) return value;
  if (value.startsWith('27')) return `+${value}`;
  if (value.startsWith('0')) return `+27${value.slice(1)}`;
  return `+27${value}`;
}

export function isEmail(raw: string): boolean {
  const value = String(raw ?? '').trim();
  return value.length <= 160 && EMAIL.test(value);
}

function isConsent(raw: unknown): boolean {
  const value = String(raw ?? '').toLowerCase();
  return value === 'on' || value === 'true' || value === '1' || value === 'yes';
}

export function validateEnquiry(
  formType: FormType,
  data: Record<string, unknown>,
): ValidationResult {
  const errors: FieldErrors = {};
  const fullName = clean(data.fullName, 120);
  const phoneRaw = clean(data.phone, 40);
  const email = clean(data.email, 160).toLowerCase();
  const notes = clean(data.notes ?? data.projectNotes ?? data.advNotes, 2000);
  const consent = isConsent(data.consent);

  if (fullName.length < 2) errors.fullName = 'Enter your full name.';
  else if (!fullName.includes(' ')) errors.fullName = 'Enter your first and last name.';

  const phone = normalisePhone(phoneRaw);
  if (!phoneRaw) errors.phone = 'Enter a contact number.';
  else if (!phone) errors.phone = 'Enter a South African number, e.g. 082 782 4346.';

  if (!email) errors.email = 'Enter an email address.';
  else if (!isEmail(email)) errors.email = 'Enter a valid email address.';

  if (!consent) errors.consent = 'Please accept the privacy notice to continue.';

  if (formType === 'installation_quote') {
    const buyerRole = clean(data.buyerRole ?? data.role, 80);
    const propertyName = clean(data.propertyName, 120);
    const townCity = clean(data.townCity ?? data.town, 80);
    const propertyType = clean(data.propertyType, 80);
    const environment = clean(data.environment, 80);

    if (!buyerRole) errors.buyerRole = 'Select your role.';
    if (propertyName.length < 2) errors.propertyName = 'Enter the property or scheme name.';
    if (townCity.length < 2) errors.townCity = 'Enter the town or city.';
    if (!propertyType) errors.propertyType = 'Select the property type.';

    if (Object.keys(errors).length > 0) return { valid: false, errors };

    return {
      valid: true,
      values: {
        formType,
        fullName,
        buyerRole,
        propertyName,
        townCity,
        propertyType,
        environment,
        phone: phone!,
        email,
        notes,
        consent,
      },
    };
  }

  const company = clean(data.company ?? data.advCompany, 120);
  if (company.length < 2) errors.company = 'Enter your business or agency name.';

  if (Object.keys(errors).length > 0) return { valid: false, errors };

  return {
    valid: true,
    values: {
      formType: 'advertising_enquiry',
      fullName,
      company,
      phone: phone!,
      email,
      notes,
      consent,
    },
  };
}

export const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full name',
  buyerRole: 'Role',
  propertyName: 'Property',
  townCity: 'Town',
  propertyType: 'Property type',
  environment: 'Environment',
  company: 'Business',
  phone: 'Phone',
  email: 'Email',
  notes: 'Notes',
  consent: 'Consent',
};
