import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Eye, Stethoscope, Building2, ShieldCheck, Settings2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Access Control & User Security | MedicoreERP" },
  description:
    "Control who can access patient and hospital information based on user roles, departments, branches, and responsibilities with MedicoreERP.",
  keywords: [
    "Healthcare Access Control",
    "role-based access control healthcare",
    "hospital user permissions",
    "RBAC hospital software",
    "healthcare ABAC",
  ],
  alternates: { canonical: "/security/access-control" },
  openGraph: {
    title: "Healthcare Access Control & User Security | MedicoreERP",
    description:
      "Control who can access patient and hospital information based on user roles, departments, branches, and responsibilities with MedicoreERP.",
    url: "/security/access-control",
  },
};

const CAPABILITIES = [
  {
    icon: Stethoscope,
    title: "Access Based on Job Role",
    desc: "Doctors, nurses, pharmacists, billing teams, and administrators can receive access based on their responsibilities.",
  },
  {
    icon: Building2,
    title: "Access Based on Department or Branch",
    desc: "Permissions can also depend on a user's hospital, department, branch, or relationship with the patient.",
  },
  {
    icon: Eye,
    title: "Only the Information They Need",
    desc: "Users receive access only to the information required to perform their work.",
  },
  {
    icon: Settings2,
    title: "Easy Permission Management",
    desc: "Administrators can manage and update user access from one place.",
  },
];

export default function AccessControlPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
          { name: "Access Control", path: "/security/access-control" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <Eyebrow>Healthcare Access Control</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">Give the Right Access to the Right People</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Not every employee needs access to every patient record or hospital system. MedicoreERP helps healthcare organizations control what each user can see and do.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/security">
                  Learn About Access Security <ArrowRight className="h-4 w-4" />
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
          eyebrow="Role-based and attribute-based access"
          title="Control what each user can see and do"
          subtitle="Control who can access patient and hospital information based on user roles, departments, branches, and responsibilities."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex h-full gap-4 rounded-card border bg-card p-6 shadow-soft">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
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
            Better access control helps protect patient information while making daily work easier for healthcare teams.
          </p>
        </div>
      </Section>

      <CTABand
        title="Learn About Access Security"
        subtitle="Control who can access patient and hospital information based on user roles, departments, branches, and responsibilities with MedicoreERP."
        ctaLabel="Learn About Access Security"
        ctaHref="/security"
      />
    </>
  );
}
