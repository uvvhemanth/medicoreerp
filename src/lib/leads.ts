import { sendLeadWithEmailJs, type EmailLead } from "@/lib/emailjs";

/** Indian or international number: 10–15 digits, optional +, spaces, dashes or brackets. */
export function isValidPhone(value: string | undefined) {
  if (!value) return false;
  if (!/^[+\d\s()-]+$/.test(value.trim())) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * Copy the lead to a backup store (e.g. a Google Apps Script web app that appends
 * rows to a Google Sheet) when NEXT_PUBLIC_LEAD_WEBHOOK_URL is set.
 * Uses a text/plain no-cors POST so Apps Script accepts it without a CORS preflight.
 */
async function backupLead(lead: EmailLead & { leadId: string }) {
  const url = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
  if (!url) return false;
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
    keepalive: true,
    signal: AbortSignal.timeout(8000),
  });
  return true;
}

/**
 * Deliver a lead by email and to the backup store. Succeeds if either channel
 * accepts it, so one failing provider no longer loses the lead.
 */
export async function submitLead(lead: EmailLead) {
  const leadId = `lead_${Date.now()}`;
  const [email, backup] = await Promise.allSettled([
    sendLeadWithEmailJs({ ...lead, leadId }),
    backupLead({ ...lead, leadId }),
  ]);

  const emailOk = email.status === "fulfilled";
  const backupOk = backup.status === "fulfilled" && backup.value === true;
  if (!emailOk && !backupOk) {
    throw email.status === "rejected" ? email.reason : new Error("Lead delivery failed.");
  }
  if (!emailOk) console.error("[lead-email-failed; saved to backup]", email.reason);
  if (backup.status === "rejected") console.error("[lead-backup-failed]", backup.reason);
  return { leadId };
}
