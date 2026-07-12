import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WEBINARS } from "@/lib/content/marketing";
import { LeadForm } from "@/components/marketing/lead-form";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return WEBINARS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = WEBINARS.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: w.title,
    description: w.excerpt,
    alternates: { canonical: `/resources/webinars/${w.slug}` },
  };
}

export default async function WebinarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = WEBINARS.find((x) => x.slug === slug);
  if (!w) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Webinars", path: "/resources/webinars" },
          { name: w.title, path: `/resources/webinars/${w.slug}` },
        ])}
      />
      <Section>
        <Link href="/resources/webinars" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> All webinars
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={w.status === "upcoming" ? "Upcoming webinar" : "On-demand replay"}
              title={w.title}
              subtitle={w.excerpt}
            />
            <p className="mt-6 text-sm text-muted">{formatDate(w.date)}</p>
            <p className="mt-2 text-body">Speakers: {w.speakers.join(" · ")}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.image} alt="" className="mt-8 aspect-video w-full rounded-card border object-cover" />
          </div>
          <div>
            <h2 className="mb-4 font-heading text-xl font-bold text-heading">
              {w.status === "upcoming" ? "Reserve your seat" : "Get the replay link"}
            </h2>
            <LeadForm variant="demo" />
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
