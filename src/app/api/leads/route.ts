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

  // Stub CRM / calendar handoff — replace with HubSpot/Calendly/webhook later.
  console.info("[lead-capture]", lead);

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    message: lead.meeting
      ? "Demo meeting booked. Calendar invite simulated for this demo."
      : "Lead captured. Sales will follow up within one business day.",
    meeting: lead.meeting,
  });
}
