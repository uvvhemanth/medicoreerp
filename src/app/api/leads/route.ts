import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  org?: string;
  role?: string;
  size?: string;
  edition?: string;
  message?: string;
  variant?: string;
  page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  persona?: string;
  consent?: string;
  meetingDate?: string;
  meetingTime?: string;
  timezone?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Email delivery is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL ?? "MedicoreERP <bookings@medicoreerp.com>",
      to: [to],
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Email provider rejected the message (${response.status}): ${detail}`);
  }
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const org = body.org?.trim() ?? "";
  const variant = body.variant ?? "demo";

  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid work email is required." }, { status: 400 });
  }
  if (variant !== "contact" && !org) {
    return NextResponse.json({ ok: false, error: "Organization is required." }, { status: 400 });
  }

  const lead = {
    id: `lead_${Date.now()}`,
    receivedAt: new Date().toISOString(),
    name,
    email,
    org: org || null,
    role: body.role ?? null,
    size: body.size ?? null,
    edition: body.edition ?? null,
    message: body.message ?? null,
    variant,
    page: body.page ?? null,
    persona: body.persona ?? null,
    consent: body.consent ?? null,
    meeting: body.meetingDate
      ? {
          date: body.meetingDate,
          time: body.meetingTime ?? null,
          timezone: body.timezone ?? null,
        }
      : null,
    utm: {
      source: body.utm_source ?? null,
      medium: body.utm_medium ?? null,
      campaign: body.utm_campaign ?? null,
    },
  };

  const inbox = process.env.LEADS_TO_EMAIL ?? "info@medicoreerp.com";
  const meetingDetails = lead.meeting
    ? `${escapeHtml(lead.meeting.date)} at ${escapeHtml(lead.meeting.time)} (${escapeHtml(lead.meeting.timezone)})`
    : "No meeting time selected";
  const subject =
    variant === "demo"
      ? `New MedicoreERP demo request — ${org || name}`
      : `New MedicoreERP ${variant} enquiry — ${name}`;

  try {
    await sendEmail({
      to: inbox,
      replyTo: email,
      subject,
      html: `
        <h1>${variant === "demo" ? "New demo request" : "New website enquiry"}</h1>
        <p>A visitor submitted the MedicoreERP website form.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><td><strong>Reference</strong></td><td>${escapeHtml(lead.id)}</td></tr>
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td><strong>Organization</strong></td><td>${escapeHtml(org || "Not provided")}</td></tr>
          <tr><td><strong>Role</strong></td><td>${escapeHtml(lead.role || "Not provided")}</td></tr>
          <tr><td><strong>Organization size</strong></td><td>${escapeHtml(lead.size || "Not provided")}</td></tr>
          <tr><td><strong>Edition</strong></td><td>${escapeHtml(lead.edition || "Not provided")}</td></tr>
          <tr><td><strong>Requested meeting</strong></td><td>${meetingDetails}</td></tr>
          <tr><td><strong>Message</strong></td><td>${escapeHtml(lead.message || "No message")}</td></tr>
          <tr><td><strong>Source page</strong></td><td>${escapeHtml(lead.page || "Unknown")}</td></tr>
          <tr><td><strong>Received</strong></td><td>${escapeHtml(lead.receivedAt)}</td></tr>
        </table>
        <p>Reply directly to this email to contact ${escapeHtml(name)}.</p>
      `,
    });
  } catch (error) {
    console.error("[lead-email-failed]", lead.id, error);
    return NextResponse.json(
      {
        ok: false,
        error: "We could not deliver your request. Please email info@medicoreerp.com or call +91 99664 11913.",
      },
      { status: 503 },
    );
  }

  try {
    await sendEmail({
      to: email,
      replyTo: inbox,
      subject: variant === "demo" ? "We received your MedicoreERP demo request" : "We received your MedicoreERP enquiry",
      html: `
        <h1>Thank you, ${escapeHtml(name)}</h1>
        <p>We received your ${variant === "demo" ? "demo request" : "message"} and sent it to the MedicoreERP team.</p>
        ${lead.meeting ? `<p><strong>Your requested time:</strong> ${meetingDetails}</p>` : ""}
        <p>Our team will review the request and confirm the next step by email.</p>
        <p><strong>Reference:</strong> ${escapeHtml(lead.id)}</p>
        <p>
          MedicoreERP<br />
          <a href="mailto:info@medicoreerp.com">info@medicoreerp.com</a><br />
          <a href="tel:+919966411913">+91 99664 11913</a>
        </p>
      `,
    });
  } catch (error) {
    console.error("[lead-confirmation-email-failed]", lead.id, error);
  }

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    message: lead.meeting
      ? "Demo request received. Our team will confirm your selected time by email."
      : "Message received. Our team will follow up by email.",
    meeting: lead.meeting,
  });
}
