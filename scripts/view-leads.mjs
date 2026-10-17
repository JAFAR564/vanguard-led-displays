#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');

async function main() {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    const lines = raw.split('\n').filter((l) => l.trim().length > 0);
    const leads = lines.map((l) => JSON.parse(l));

    if (leads.length === 0) {
      console.log('\n[LEADS LEDGER] No leads recorded yet in data/leads.jsonl\n');
      return;
    }

    console.log('\n================================================================================');
    console.log(`                     CAPTURED LEADS LEDGER (${leads.length} TOTAL)`);
    console.log('================================================================================\n');

    leads.forEach((lead, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      const time = new Date(lead.submittedAt).toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      console.log(`[${num}] ${lead.leadId}  |  ${time} (SAST)`);
      if (lead.formType === 'installation_quote') {
        console.log(`     TYPE:     SITE ASSESSMENT INQUIRY (ESTATE / COMMERCIAL)`);
        console.log(`     CONTACT:  ${lead.fullName} (${lead.buyerRole})`);
        console.log(`     PROPERTY: ${lead.propertyName} [${lead.propertyType}] - ${lead.townCity}`);
        console.log(`     PHONE:    ${lead.phone}  |  EMAIL: ${lead.email}`);
        if (lead.projectNotes) {
          console.log(`     NOTES:    "${lead.projectNotes}"`);
        }
      } else {
        console.log(`     TYPE:     SCREEN NETWORK ADVERTISING INQUIRY`);
        console.log(`     CONTACT:  ${lead.advName} (${lead.advCompany})`);
        console.log(`     PHONE:    ${lead.phone}  |  EMAIL: ${lead.email}`);
        if (lead.advNotes) {
          console.log(`     NOTES:    "${lead.advNotes}"`);
        }
      }
      console.log('--------------------------------------------------------------------------------');
    });
    console.log(`\nAll records persisted in ${LEADS_FILE}\n`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('\n[LEADS LEDGER] Ledger file data/leads.jsonl does not exist yet. Submit an inquiry through the form to initialise.\n');
    } else {
      console.error('[LEADS LEDGER ERROR]', err);
    }
  }
}

main();
