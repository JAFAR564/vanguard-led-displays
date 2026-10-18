/**
 * Append-only JSONL backup ledger.
 *
 * Every valid enquiry is written here *before* delivery is attempted, so a
 * transport outage never loses a lead. The file is git-ignored. On Vercel the
 * filesystem is ephemeral, which is why a delivery transport is mandatory in
 * production (see /api/enquiry).
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

export function ledgerDir(): string {
  if (process.env.LEAD_STORE_DIR) return process.env.LEAD_STORE_DIR;
  if (process.env.VERCEL) return '/tmp';
  return join(process.cwd(), 'data');
}

export function ledgerFile(): string {
  return join(ledgerDir(), 'leads.jsonl');
}

export async function persistLead(lead: StoredLead): Promise<void> {
  const dir = ledgerDir();
  await mkdir(dir, { recursive: true });
  await appendFile(ledgerFile(), `${JSON.stringify(lead)}\n`, 'utf8');
}
