export type EmailLead = Record<string, string> & {
  name: string;
  email: string;
  variant: string;
};

export async function sendLeadWithEmailJs(lead: EmailLead) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Email delivery is not configured.");
  }

  const leadId = `lead_${Date.now()}`;
  const receivedAt = new Date().toISOString();
  const meeting = lead.meetingDate
    ? `${lead.meetingDate} at ${lead.meetingTime || "Not selected"} (${lead.timezone || "Not selected"})`
    : "Not selected";
  const subject =
    lead.variant === "demo"
      ? `New MedicoreERP demo request — ${lead.org || lead.name}`
      : `New MedicoreERP ${lead.variant} enquiry — ${lead.name}`;
  const message = [
    `Reference: ${leadId}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Organization: ${lead.org || "Not provided"}`,
    `Role: ${lead.role || "Not provided"}`,
    `Organization size: ${lead.size || "Not provided"}`,
    `Edition: ${lead.edition || "Not provided"}`,
    `Requested meeting: ${meeting}`,
    `Message: ${lead.message || "No message"}`,
    `Source page: ${lead.page || window.location.pathname}`,
    `Received: ${receivedAt}`,
  ].join("\n");

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: "info@medicoreerp.com",
        to_name: "MedicoreERP Team",
        from_name: lead.name,
        from_email: lead.email,
        reply_to: lead.email,
        subject,
        name: lead.name,
        email: lead.email,
        organization: lead.org || "Not provided",
        org: lead.org || "Not provided",
        role: lead.role || "Not provided",
        size: lead.size || "Not provided",
        edition: lead.edition || "Not provided",
        meeting_date: lead.meetingDate || "Not selected",
        meeting_time: lead.meetingTime || "Not selected",
        timezone: lead.timezone || "Not selected",
        lead_id: leadId,
        page: lead.page || window.location.pathname,
        message,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`EmailJS rejected the message (${response.status}): ${detail}`);
  }

  return { leadId };
}
