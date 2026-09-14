import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { FileText, User, ShieldCheck, Search, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Audit Trails & Activity Tracking | MedicoreERP" },
  description:
    "Track logins, patient record access, edits, exports, and other important user activity with secure audit trails in MedicoreERP.",
  keywords: [
    "Healthcare Audit Trail",
    "hospital audit log",
    "patient record activity tracking",
    "healthcare user activity log",
    "immutable audit trails",
  ],
  alternates: { canonical: "/security/audit-trails" },
  openGraph: {
    title: "Healthcare Audit Trails & Activity Tracking | MedicoreERP",
    description:
      "Track logins, patient record access, edits, exports, and other important user activity with secure audit trails in MedicoreERP.",
    url: "/security/audit-trails",
  },
};

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Track Important Actions",
    desc: "Record activities such as user logins, patient record views, updates, exports, and printing.",
  },
  {
    icon: User,
    title: "See Who Made a Change",
    desc: "Identify which user performed an action, what was changed, and when it happened.",
  },
  {
    icon: ShieldCheck,
    title: "Protect Audit Records",
    desc: "Audit information is designed to help prevent unnoticed changes and maintain reliable activity history.",
  },
  {
    icon: Search,
    title: "Support Internal Reviews",
    desc: "Security and management teams can review activity records when investigating issues or preparing for audits.",
  },
];

export default function AuditTrailsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
          { name: "Audit Trails", path: "/security/audit-trails" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <FileText className="h-7 w-7" />
            </div>
            <Eyebrow>Healthcare Audit Trail</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">Know Who Accessed What and When</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              MedicoreERP keeps a clear record of important activity across the system, helping hospitals improve security, accountability, and operational control.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/security">
                  Explore Audit & Activity Tracking <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to Our Security Team</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Immutable audit trails"
          title="A clear record of important activity"
          subtitle="Track logins, patient record access, edits, exports, and other important user activity with secure audit trails."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex h-full gap-4 rounded-card border bg-card p-6 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-heading">{item.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl rounded-card border bg-card p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-heading">Why It Matters</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Hospitals gain better visibility into how sensitive information is being accessed and used.
          </p>
        </div>
      </Section>

      <CTABand
        title="Explore Audit & Activity Tracking"
        subtitle="Track logins, patient record access, edits, exports, and other important user activity with secure audit trails in MedicoreERP."
        ctaLabel="Explore Audit & Activity Tracking"
        ctaHref="/security"
      />
    </>
  );
}
