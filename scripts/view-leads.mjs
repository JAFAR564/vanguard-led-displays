#!/usr/bin/env node
/**
 * Print the local lead ledger.
 *
 *   npm run leads
 *
 * Reads data/leads.jsonl (or LEAD_STORE_DIR). The ledger is a backup, not the
 * system of record: production leads are delivered by webhook or email.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = process.env.LEAD_STORE_DIR ?? join(process.cwd(), 'data');
const file = join(dir, 'leads.jsonl');

function truncate(value, length = 28) {
  const text = String(value ?? '—');
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

try {
  const raw = await readFile(file, 'utf8');
  const leads = raw
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (leads.length === 0) {
    console.log(`No leads recorded in ${file}`);
    process.exit(0);
  }

  console.log(`\n${leads.length} lead${leads.length === 1 ? '' : 's'} · ${file}\n`);

  const header = ['Reference', 'Received', 'Type', 'Name', 'Town / company'];
  console.log(header.map((h) => h.padEnd(20)).join(''));

  for (const lead of leads) {
    const received = lead.submittedAt ? new Date(lead.submittedAt).toISOString().slice(0, 16) : '—';
    const type = lead.formType === 'advertising_enquiry' ? 'advertising' : 'installation';
    const town = lead.townCity ?? lead.company ?? '—';
    console.log(
      [
        truncate(lead.reference, 20).padEnd(20),
        received.replace('T', ' ').padEnd(20),
        type.padEnd(20),
        truncate(lead.fullName, 20).padEnd(20),
        truncate(town, 28),
      ].join(''),
    );
  }
  console.log('');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log(`No ledger yet at ${file}. Submit an enquiry first.`);
  } else {
    console.error('Could not read the ledger:', error.message);
    process.exitCode = 1;
  }
}
