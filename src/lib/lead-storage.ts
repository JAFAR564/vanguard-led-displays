import fs from 'node:fs/promises';
import path from 'node:path';

export interface BaseLead {
  leadId: string;
  submittedAt: string;
  formType: 'installation_quote' | 'advertising_enquiry';
  phone: string;
  email: string;
  destinationEmail: string;
}

export interface InstallationLead extends BaseLead {
  formType: 'installation_quote';
  fullName: string;
  buyerRole: string;
  propertyName: string;
  propertyType: string;
  townCity: string;
  environment: string;
  projectNotes: string;
}

export interface AdvertisingLead extends BaseLead {
  formType: 'advertising_enquiry';
  advName: string;
  advCompany: string;
  advNotes: string;
}

export type LeadRecord = InstallationLead | AdvertisingLead;

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');

/**
 * Persists a lead record atomically to an append-only JSON Lines file on disk.
 * This guarantees no inquiries are lost across server reboots.
 */
export async function persistLead(lead: LeadRecord): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const line = JSON.stringify(lead) + '\n';
    await fs.appendFile(LEADS_FILE, line, 'utf-8');
    console.log(`[LEAD PERSISTENCE] [DISK SUCCESS] Written to ${LEADS_FILE}`);
  } catch (err) {
    console.error('[LEAD PERSISTENCE] [DISK ERROR] Failed to append lead:', err);
  }
}

/**
 * Reads all stored leads from disk.
 */
export async function getAllLeads(): Promise<LeadRecord[]> {
  try {
    const content = await fs.readFile(LEADS_FILE, 'utf-8');
    return content
      .split('\n')
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => JSON.parse(line));
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}
