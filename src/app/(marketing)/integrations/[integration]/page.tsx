import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Code2,
  CreditCard,
  FileCheck2,
  FlaskConical,
  Link2,
  MessageSquareText,
  Scan,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTABand, Eyebrow, Reveal, Section, SectionHeading } from "@/components/marketing/blocks";

type IntegrationPage = {
  title: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  image: string;
  icon: LucideIcon;
  highlights: string[];
  features: Array<{ icon: LucideIcon; title: string; desc: string }>;
  useCases: Array<{ title: string; desc: string; image: string }>;
  workflow: Array<{ title: string; desc: string }>;
  securityTitle: string;
  securityText: string;
};

const INTEGRATIONS: Record<string, IntegrationPage> = {
  "third-party-api": {
    title: "Third-party API Integrations",
    eyebrow: "Connected medical ERP",
    tagline: "Connect every clinical, financial, and operational system.",
    intro:
      "MedicoreERP provides secure FHIR, HL7, DICOM, REST API, and webhook connections for laboratories, imaging systems, payment gateways, insurers, ABDM services, and your existing hospital applications.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    icon: Code2,
    highlights: ["FHIR R4 & REST APIs", "HL7 v2 & DICOM", "OAuth 2.0 security", "Real-time webhooks"],
    features: [
      {
        icon: FlaskConical,
        title: "Laboratory & analyzer integration",
        desc: "Exchange orders, sample status, quality-control data, and signed results with LIS platforms and laboratory analyzers.",
      },
      {
        icon: Scan,
        title: "Radiology, RIS & PACS",
        desc: "Connect imaging orders, schedules, reports, and DICOM studies while keeping results available inside the patient chart.",
      },
      {
        icon: CreditCard,
        title: "Payments, insurance & claims",
        desc: "Integrate UPI, cards, payment gateways, TPAs, insurers, eligibility checks, claims submission, and settlement updates.",
      },
      {
        icon: Link2,
        title: "ABDM and external health systems",
        desc: "Support ABHA workflows, consent-based health information exchange, government programs, referral networks, and partner apps.",
      },
      {
        icon: Webhook,
        title: "Real-time events and automation",
        desc: "Subscribe to appointment, admission, order, result, invoice, payment, and discharge events without repeatedly polling the API.",
      },
      {
        icon: ShieldCheck,
        title: "Secure developer platform",
        desc: "Use OAuth 2.0, scoped access, role-based permissions, audit logs, idempotency controls, and isolated sandbox environments.",
      },
    ],
    useCases: [
      {
        title: "Diagnostics and medical devices",
        desc: "Connect LIS, analyzers, bedside devices, RIS, PACS, and imaging workflows so orders and results move without duplicate entry.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Payments, banking and finance",
        desc: "Link payment gateways, UPI, cards, bank reconciliation, accounting systems, GST workflows, refunds, and digital receipts.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Insurance, TPA and government health",
        desc: "Exchange eligibility, pre-authorizations, claims, settlements, ABHA consent, and program reporting with approved partners.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Pharmacy and supply partners",
        desc: "Connect distributors, e-pharmacy services, barcode systems, purchase orders, stock updates, batch tracking, and expiry alerts.",
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "HR, attendance and payroll",
        desc: "Synchronize employees, rosters, biometric attendance, leave, payroll inputs, departments, and role-based access.",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "CRM and patient engagement",
        desc: "Connect contact centers, referral partners, campaigns, surveys, email, SMS, and communication tools around one patient journey.",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      },
    ],
    workflow: [
      { title: "Discover", desc: "Map systems, data fields, owners, and clinical workflows." },
      { title: "Connect", desc: "Configure API credentials, standards, mappings, and webhooks." },
      { title: "Validate", desc: "Test in a sandbox with sample data and error handling." },
      { title: "Monitor", desc: "Track uptime, failures, retries, audit events, and data quality." },
    ],
    securityTitle: "Healthcare data stays controlled",
    securityText:
      "Every integration uses least-privilege access, encrypted transport, tenant isolation, detailed audit trails, and configurable data scopes. No partner receives more patient information than the approved workflow requires.",
  },
  whatsapp: {
    title: "WhatsApp Integration",
    eyebrow: "Patient communication",
    tagline: "Keep patients informed before, during, and after care.",
    intro:
      "Connect MedicoreERP with the official WhatsApp Business Platform to automate appointment updates, reminders, secure report links, invoices, payment requests, discharge instructions, and follow-up communication.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    icon: MessageSquareText,
    highlights: ["Official Business API", "Consent-based messaging", "Multilingual templates", "Delivery tracking"],
    features: [
      {
        icon: Bell,
        title: "Appointments and reminders",
        desc: "Send booking confirmations, preparation instructions, reschedule options, queue updates, and no-show reduction reminders.",
      },
      {
        icon: FileCheck2,
        title: "Reports and prescriptions",
        desc: "Notify patients when reports or prescriptions are ready and deliver access through authenticated, time-limited secure links.",
      },
      {
        icon: CreditCard,
        title: "Invoices and payment links",
        desc: "Share billing notifications, itemized invoice links, outstanding balance reminders, receipts, and supported online payment options.",
      },
      {
        icon: MessageSquareText,
        title: "Two-way patient conversations",
        desc: "Route replies to the right front-desk, billing, laboratory, pharmacy, or care team queue with context from the patient journey.",
      },
      {
        icon: Link2,
        title: "Follow-up and patient engagement",
        desc: "Automate medication reminders, post-discharge check-ins, vaccination recalls, health campaigns, and feedback collection.",
      },
      {
        icon: ShieldCheck,
        title: "Consent, privacy, and audit",
        desc: "Record opt-in and opt-out status, control approved templates, avoid unnecessary PHI, and retain a complete communication audit trail.",
      },
    ],
    useCases: [
      {
        title: "Appointment and queue updates",
        desc: "Confirm bookings, share preparation instructions, offer rescheduling, and notify patients when their token or consultation is approaching.",
        image:
          "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Reports, prescriptions and pharmacy",
        desc: "Notify patients when results or medicines are ready and send secure links for prescriptions, reports, refill requests, and pickup updates.",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Billing and digital payments",
        desc: "Share invoice notifications, payment links, outstanding reminders, receipts, insurance document requests, and settlement updates.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Admission and discharge support",
        desc: "Send admission instructions, attendant guidance, discharge summaries, medication schedules, and follow-up appointment reminders.",
        image:
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Preventive care and recalls",
        desc: "Automate vaccination reminders, chronic-care check-ins, health-package campaigns, annual reviews, and missed-visit recalls.",
        image:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80",
      },
      {
        title: "Patient support conversations",
        desc: "Route patient replies to front desk, billing, laboratory, pharmacy, nursing, or support teams with ownership and response tracking.",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
      },
    ],
    workflow: [
      { title: "Consent", desc: "Capture the patient's preferred language, number, and messaging consent." },
      { title: "Trigger", desc: "Start approved messages from appointments, orders, billing, or discharge events." },
      { title: "Engage", desc: "Let patients confirm, reschedule, pay, or reply through guided actions." },
      { title: "Audit", desc: "Track template, delivery, read, response, opt-out, and staff follow-up status." },
    ],
    securityTitle: "Patient communication without careless data exposure",
    securityText:
      "MedicoreERP uses approved templates, consent checks, minimal message content, secure portal links, role-based staff access, and auditable delivery records. Sensitive clinical details can remain inside the authenticated patient portal.",
  },
};

export function generateStaticParams() {
  return Object.keys(INTEGRATIONS).map((integration) => ({ integration }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ integration: string }>;
}): Promise<Metadata> {
  const { integration } = await params;
  const page = INTEGRATIONS[integration];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ integration: string }>;
}) {
  const { integration } = await params;
  const page = INTEGRATIONS[integration];
  if (!page) notFound();

  const HeroIcon = page.icon;

  return (
    <>
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal text-white shadow-soft">
                <HeroIcon className="h-6 w-6" />
              </span>
              <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
                {page.title}
              </h1>
            </div>
            <p className="mt-5 text-xl font-semibold text-teal">{page.tagline}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{page.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/demo">Request a demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Discuss your integration</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 rounded-pill border bg-card px-3 py-1.5 text-sm font-semibold text-body"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border bg-card shadow-pop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.image} alt={`${page.title} for MedicoreERP`} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Capabilities"
          title={`What ${page.title} includes`}
          subtitle="Designed around real hospital workflows, security requirements, and operational accountability."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl font-bold text-heading">{feature.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Connected workflows"
          title="More ways MedicoreERP connects"
          subtitle="Practical integrations for clinical care, patient service, revenue, and hospital operations."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.useCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.04}>
              <article className="h-full overflow-hidden rounded-card border bg-card shadow-soft transition duration-standard hover:-translate-y-1 hover:shadow-card">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-xl font-bold text-heading">{useCase.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{useCase.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Implementation" title="A controlled path from setup to scale" className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.workflow.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft">
                <span className="font-heading text-4xl font-extrabold text-teal/25">{index + 1}</span>
                <h2 className="mt-2 font-heading text-lg font-bold text-heading">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-4xl rounded-[24px] border bg-ink p-8 text-white shadow-pop sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-sage">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-white">{page.securityTitle}</h2>
              <p className="mt-3 leading-relaxed text-white/75">{page.securityText}</p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title={`See ${page.title} in action`}
        subtitle="Book a guided walkthrough using a workflow relevant to your hospital."
      />
    </>
  );
}
