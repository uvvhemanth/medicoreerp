import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JOBS } from "@/lib/content/company";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { jobPostingJsonLd } from "@/lib/seo";
import { MapPin, Briefcase, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return JOBS.map((j) => ({ job: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ job: string }> }): Promise<Metadata> {
  const { job } = await params;
  const j = JOBS.find((x) => x.slug === job);
  return j
    ? { title: `${j.title} — Careers`, description: j.desc, alternates: { canonical: `/company/careers/${j.slug}` } }
    : {};
}

export default async function JobPage({ params }: { params: Promise<{ job: string }> }) {
  const { job } = await params;
  const j = JOBS.find((x) => x.slug === job);
  if (!j) notFound();

  return (
    <Section>
      <JsonLd
        data={jobPostingJsonLd({
          title: j.title,
          description: j.desc,
          location: j.location,
          path: `/company/careers/${j.slug}`,
          employmentType: j.type,
        })}
      />
      <div className="mx-auto max-w-3xl">
        <Link href="/company/careers" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> All roles
        </Link>
        <div className="mt-6">
          <Eyebrow>{j.dept}</Eyebrow>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-heading">{j.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {j.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {j.type}</span>
          </div>
        </div>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-body">
          <p>{j.desc}</p>
          <h2 className="font-heading text-xl font-bold text-heading">What you'll do</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Ship high-quality, accessible, performant features used by clinicians daily.</li>
            <li>Collaborate across design, product, and clinical to solve real hospital problems.</li>
            <li>Care about the details — states, edge cases, and the 10th-consult experience.</li>
          </ul>
          <h2 className="font-heading text-xl font-bold text-heading">What we look for</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Senior craft and ownership; you raise the bar around you.</li>
            <li>Empathy for users in high-stakes, time-pressured environments.</li>
            <li>Bias for simplicity — the hard work of making things easy.</li>
          </ul>
        </div>
        <Button asChild size="lg" className="mt-8"><Link href="/contact">Apply for this role</Link></Button>
      </div>
    </Section>
  );
}
