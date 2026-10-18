/**
 * Client behaviour shared by both enquiry forms.
 *
 * Validation is imported from the same module the API uses, so inline messages
 * match server messages exactly. The server response remains authoritative:
 * any field errors it returns are applied to the same error slots.
 */

import { validateEnquiry, type FormType } from './validation';

interface Options {
  formType: FormType;
  whatsappNumber: string;
  endpoint?: string;
}

function errorSlot(form: HTMLFormElement, field: string): HTMLElement | null {
  return form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
}

function setFieldError(form: HTMLFormElement, field: string, message?: string): void {
  const slot = errorSlot(form, field);
  const input = form.querySelector<HTMLElement>(`[name="${field}"]`);
  if (slot) {
    slot.textContent = message ?? '';
    slot.hidden = !message;
  }
  if (input) {
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
}

function clearErrors(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((slot) => {
    slot.textContent = '';
    slot.hidden = true;
  });
  form.querySelectorAll<HTMLElement>('[aria-invalid]').forEach((input) => {
    input.removeAttribute('aria-invalid');
  });
}

function firstInvalid(form: HTMLFormElement, errors: Record<string, string>): void {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const target =
    form.querySelector<HTMLElement>(`[name="${first}"]`) ??
    form.querySelector<HTMLElement>(`[name="${first}[]"]`);
  target?.focus();
}

export function wireForm(form: HTMLFormElement, options: Options): void {
  const timestamp = form.querySelector<HTMLInputElement>('[name="formRenderTimestamp"]');
  const sourcePath = form.querySelector<HTMLInputElement>('[name="sourcePath"]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');

  if (timestamp) timestamp.value = String(Date.now());
  if (sourcePath) sourcePath.value = window.location.pathname;

  form.addEventListener('invalid', (event) => event.preventDefault(), true);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors(form);

    const data: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') data[key] = value;
    });

    const local = validateEnquiry(options.formType, data);
    if (!local.valid) {
      for (const [field, message] of Object.entries(local.errors)) {
        setFieldError(form, field, message);
      }
      if (status) {
        status.hidden = false;
        status.textContent = 'Please check the highlighted fields.';
      }
      firstInvalid(form, local.errors);
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.dataset.label = submit.textContent ?? 'Submit';
      submit.textContent = 'Sending…';
    }
    if (status) status.hidden = true;

    try {
      const response = await fetch(options.endpoint ?? '/api/enquiry', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        reference?: string;
        errors?: Record<string, string>;
        error?: string;
        message?: string;
      } | null;

      if (!response.ok || !payload?.success) {
        if (payload?.errors) {
          for (const [field, message] of Object.entries(payload.errors)) {
            setFieldError(form, field, message);
          }
          firstInvalid(form, payload.errors);
        }
        if (status) {
          status.hidden = false;
          status.textContent =
            payload?.message ??
            payload?.error ??
            'We could not send this enquiry. Please call us directly.';
        }
        return;
      }

      const reference = payload.reference ?? '';
      const confirmation = document.querySelector<HTMLElement>(
        `[data-confirmation="${options.formType}"]`,
      );
      const referenceSlot = confirmation?.querySelector<HTMLElement>('[data-reference]');
      const whatsapp = confirmation?.querySelector<HTMLAnchorElement>('[data-whatsapp]');

      if (referenceSlot) referenceSlot.textContent = reference;
      if (whatsapp && reference) {
        const message = encodeURIComponent(
          `Hello Vanguard, following up on enquiry ${reference} submitted through your website.`,
        );
        whatsapp.href = `https://wa.me/${options.whatsappNumber}?text=${message}`;
      }

      if (confirmation) {
        form.hidden = true;
        confirmation.hidden = false;
        confirmation.querySelector<HTMLElement>('[data-confirmation-title]')?.focus();
      }
    } catch {
      if (status) {
        status.hidden = false;
        status.textContent =
          'The connection failed. Please check your signal and try again, or call us directly.';
      }
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.label ?? 'Submit';
      }
    }
  });
}
