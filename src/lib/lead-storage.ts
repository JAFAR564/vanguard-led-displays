/**
 * Append-only JSONL backup ledger.
 *
 * Every valid enquiry is written here *before* delivery is attempted, so a
 * transport outage never loses a lead. The file is git-ignored. On a serverless
 * platform the filesystem is ephemeral, which is why a delivery transport is
 * mandatory in production (see /api/enquiry).
 */

import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export interface StoredLead {
  reference: string;
  submittedAt: string;
  formType: string;
  sourcePath: string;
  [key: string]: unknown;
}

/**
 * True when the ledger lands somewhere the platform throws away.
 *
 * Both branches read the same environment, so the directory and the promises
 * made about it can never drift apart. `AWS_LAMBDA_FUNCTION_NAME` is here
 * because Lambda mounts the working directory read-only: writing to `./data`
 * would throw EROFS and turn a recoverable lead into a 500.
 */
export function ledgerIsEphemeral(): boolean {
  if (process.env.LEAD_STORE_DIR) return false;
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

export function ledgerDir(): string {
  if (process.env.LEAD_STORE_DIR) return process.env.LEAD_STORE_DIR;
  if (ledgerIsEphemeral()) return '/tmp';
  return join(process.cwd(), 'data');
}

export function ledgerFile(): string {
  return join(ledgerDir(), 'leads.jsonl');
}

/**
 * Throws on failure rather than returning a result object. The only caller
 * answers 500 and tells the visitor to phone, which is the correct response;
 * a `{ ok: false }` return would invite a caller to ignore it and report a lead
 * that was never written.
 */
export async function persistLead(lead: StoredLead): Promise<void> {
  const dir = ledgerDir();
  await mkdir(dir, { recursive: true });
  await appendFile(ledgerFile(), `${JSON.stringify(lead)}\n`, 'utf8');
}
