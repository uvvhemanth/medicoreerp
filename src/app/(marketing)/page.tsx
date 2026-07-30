import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Reveal, LogoWall, Eyebrow } from "@/components/marketing/blocks";
import { HisDashboard } from "@/components/marketing/his-dashboard";
import { PATIENT_JOURNEY } from "@/lib/content/dashboard";
import { HOME_STATS, LOGO_WALL, TESTIMONIALS, PRODUCT_DOMAINS, CASE_STUDIES, COMPLIANCE_BADGES, MAIN_FEATURES } from "@/lib/content/marketing";
import {
  Sparkles, Zap, Network, ArrowRight, Star,
  Stethoscope, Building2, CheckCircle2, Receipt, Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Best Hospital Management System in Hyderabad | MedicoreERP",
  },
  description:
    "Looking for the best Hospital Management System in Hyderabad? MedicoreERP simplifies EMR, OPD, IPD, billing, pharmacy, laboratory, radiology, inventory and complete hospital operations.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Hospital Management System in Hyderabad | MedicoreERP",
    description:
      "Looking for the best Hospital Management System in Hyderabad? MedicoreERP simplifies EMR, OPD, IPD, billing, pharmacy, laboratory, radiology, inventory and complete hospital operations.",
  },
};

const MOATS = [
  {
    icon: Sparkles,
    title: "AI in every workflow",
    stat: "↓62% doc time",
    desc: "Ambient scribe drafts SOAP notes in the consult. Autonomous RCM codes, scrubs, and appeals — denials down ~45%. Predictive ops flags no-shows, LOS, and bed demand before they become chaos.",
  },
  {
    icon: Network,
    title: "Open by design",
    stat: "FHIR R4 native",
    desc: "Patient, Encounter, and Observation over a public FHIR API. HL7 v2 for labs, DICOM for imaging, ABDM/ABHA ready. Guaranteed exports — your data leaves with you, no lock-in.",
  },
  {
    icon: Zap,
    title: "Live in weeks",
    stat: "6–10 wk go-live",
    desc: "Clinics in 2–3 weeks, hospitals typically 6–10. Workflow Studio and Form Builder replace year-long consultant projects. Average customer go-live: ~9 weeks across branches.",
  },
];

const PERSONAS = [
  {
    icon: Building2,
    role: "Hospital admin",
    desc: "Beds, OT, IPD, staff, departments, operations and hospital reports.",
    href: "/dashboard",
  },
  {
    icon: Stethoscope,
    role: "Doctors & nurses",
    desc: "EMR, OPD notes, prescriptions, vitals, clinical orders and patient care.",
    href: "/product/emr",
  },
  {
    icon: Receipt,
    role: "Billing & finance",
    desc: "Invoices, GST, insurance, claims, payments and collections.",
    href: "/product/billing-invoices",
  },
  {
    icon: Users,
    role: "Front desk",
    desc: "Patient registration, appointments, check-ins, queues and reminders.",
    href: "/product/appointments",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — reference layout: copy left + HIS dashboard right */}
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <div>
              <p className="font-heading text-[13px] font-extrabold uppercase tracking-[0.18em] text-teal">
                MedicoreERP
              </p>
              <h1 className="text-heading-display mt-4 max-w-xl">
                Best Hospital Management System Software in Hyderabad
              </h1>
              <p className="mt-3 text-xl font-semibold text-teal">
                Advanced HMS & HIS Software for Modern Hospitals and Clinics
              </p>
              <div className="mt-4 max-w-xl space-y-3">
                <p className="text-subtitle font-medium">
                  MedicoreERP is an integrated Hospital Management System in Hyderabad that connects patient registration, appointments, OPD, IPD, EMR, laboratory, radiology, pharmacy, billing, insurance, inventory and discharge in one platform.
                </p>
                <p className="text-subtitle">
                  Manage the complete patient journey while helping your clinical, administrative and financial teams work from one connected system.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/demo">
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/dashboard">Open full dashboard</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Trusted by hospitals, clinics and healthcare teams
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="his-dashboard" className="scroll-mt-24">
              <HisDashboard compact />
              <p className="mt-3 text-center text-sm text-muted lg:text-left">
                Modules follow your patient journey (Steps 1–10). Click any tile.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PATIENT JOURNEY — third photo blueprint */}
      <Section className="!py-12">
        <SectionHeading
          center
          title="Overall Patient Journey"
          subtitle="Your Blueprint"
          className="mb-8"
        />
        <div className="mx-auto max-w-3xl overflow-hidden rounded-card border bg-card shadow-soft">
          <div className="grid grid-cols-[80px_1fr] border-b bg-mist/60 text-[11px] font-bold uppercase tracking-wide text-muted">
            <div className="border-r px-4 py-2.5">Step</div>
            <div className="px-4 py-2.5">Flow</div>
          </div>
          {PATIENT_JOURNEY.map((j) => (
            <div key={j.step} className="grid grid-cols-[80px_1fr] border-b last:border-b-0">
              <div className="border-r px-4 py-3 font-heading text-sm font-extrabold text-teal">{j.step}</div>
              <div className="px-4 py-3">
                <p className="font-heading text-sm font-bold text-heading">{j.title}</p>
                <p className="text-card-desc">{j.flow}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TRUST BAR */}
      <Section className="!py-10">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Powering care teams across India, MENA & SEA
        </p>
        <LogoWall logos={LOGO_WALL} />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {COMPLIANCE_BADGES.map((b) => (
            <span key={b} className="rounded-pill border bg-card px-3 py-1 text-[11px] font-semibold text-muted">
              {b}
            </span>
          ))}
        </div>
      </Section>

      {/* WHY AETHER */}
      <Section muted>
        <SectionHeading
          center
          eyebrow="Why hospitals switch"
          title="One system. Measurable outcomes."
          subtitle="Replace disconnected applications and manual processes with an integrated Hospital Management System built to connect clinical, administrative and financial workflows."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOATS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-card border bg-card p-6 shadow-soft transition duration-standard hover:-translate-y-1 hover:border-teal/30 hover:shadow-card">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-teal/15 to-clinical/10 text-teal transition group-hover:from-teal/25 group-hover:to-clinical/15">
                  <m.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal">{m.stat}</p>
                <h3 className="mt-1.5 font-heading text-lg font-bold text-heading">{m.title}</h3>
                <p className="text-card-desc mt-2 flex-1">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PERSONA ROUTER */}
      <Section>
        <SectionHeading
          center
          eyebrow="Medical ERP roles"
          title="Built for how your hospital runs"
          subtitle="Give every department access to the HMS modules and information they need every day."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map((p, i) => (
            <Reveal key={p.role} delay={i * 0.05}>
              <Link
                href={p.href}
                className="group flex h-full min-h-[148px] flex-col gap-4 rounded-card border bg-card p-6 shadow-soft transition duration-standard hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-teal" />
                </div>
                <div className="text-left">
                  <p className="font-heading text-lg font-bold leading-snug text-heading">
                    {p.role}
                  </p>
                  <p className="text-card-desc mt-2">
                    {p.desc}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* MAIN FEATURES — reference HIS capabilities grid */}
      <Section muted>
        <SectionHeading
          center
          eyebrow="MedicoreERP platform"
          title="Complete Hospital Management System Features"
          subtitle="Everything your hospital needs in one integrated HMS software platform."
          className="mb-14"
        />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {MAIN_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <div className="flex gap-4">
                <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clinical/10 text-clinical">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-bold text-heading">{f.title}</h3>
                  <p className="text-card-desc mt-1.5">{f.desc}</p>
                  <Link
                    href={f.href}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-clinical hover:underline"
                  >
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/product">See all product modules</Link>
          </Button>
        </div>
      </Section>

      {/* PRODUCT SHOWCASE */}
      <Section>
        <SectionHeading
          eyebrow="One platform, every workflow"
          title="Hospital Modules That Work as One System"
          subtitle="Manage EMR, appointments, billing, patient communication and hospital operations through one connected Hospital Management System in Hyderabad."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DOMAINS.filter((d) =>
            ["emr", "appointments", "billing-invoices", "patient-reminders", "clinical", "revenue-cycle"].includes(d.slug),
          ).map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05}>
              <Link
                href={`/product/${d.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border bg-card shadow-soft transition duration-standard hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading font-bold text-heading">{d.name}</h3>
                  <p className="text-card-desc mt-1 flex-1">{d.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/product">See all modules</Link>
          </Button>
        </div>
      </Section>

      {/* OUTCOMES */}
      <Section>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionHeading
            center
            eyebrow="Proven outcomes"
            title="Results That Matter to Hospitals"
            subtitle="Improve operational efficiency, patient experience and financial visibility with one connected hospital platform."
            className="mb-0 max-w-3xl"
          />
          <p className="text-subtitle mx-auto mt-5 max-w-2xl font-medium">
            For this section, I recommend using only verified MedicoreERP statistics.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[28px] border bg-gradient-to-br from-ink via-teal-deep to-teal px-8 py-12 text-white shadow-pop sm:px-14 sm:py-16">
          <div className="bg-grid absolute inset-0 opacity-10" />
          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {HOME_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="text-center sm:text-left">
                  <p className="font-heading text-[40px] font-extrabold leading-none tracking-tight sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[14px] font-medium leading-snug text-white/80 sm:text-[15px]">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CASE + TESTIMONIALS */}
      <Section muted>
        <SectionHeading center title="Loved by the people who use it daily" className="mb-12" />
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 1).map((c) => (
            <Reveal key={c.slug} className="lg:col-span-3">
              <div className="group grid overflow-hidden rounded-card border bg-card shadow-soft lg:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.org} className="aspect-[16/11] h-full w-full object-cover lg:aspect-auto" />
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <Eyebrow>{c.edition} · {c.region}</Eyebrow>
                  <h3 className="mt-4 font-heading text-2xl font-extrabold text-heading sm:text-3xl">{c.org}</h3>
                  <p className="mt-3 text-muted">{c.challenge}</p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {c.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <p className="font-heading text-2xl font-extrabold text-teal">{m.value}</p>
                        <p className="text-xs text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <blockquote className="flex-1 text-body">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-heading">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}, {t.org}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!py-12">
        <div className="flex flex-col items-center justify-between gap-6 rounded-card border bg-card px-6 py-8 shadow-soft sm:flex-row sm:px-10">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-teal" />
            <div>
              <p className="font-heading font-bold text-heading">Ready when your hospital is</p>
              <p className="mt-1 text-sm text-muted">Sandbox in minutes · Migration with data-freedom · Dedicated onboarding</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/demo">Talk to sales <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
