import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COMPETITORS } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, CTABand, Eyebrow, SectionHeading } from "@/components/marketing/blocks";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
  const { competitor } = await params;
  const c = COMPETITORS.find((x) => x.slug === competitor);
  return c ? { title: `MedicoreERP vs ${c.name}`, description: c.summary } : {};
}

export default async function ComparePage({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  const c = COMPETITORS.find((x) => x.slug === competitor);
  if (!c) notFound();

  return (
    <>
      <section className="border-b">
        <div className="container-page py-16">
          <Eyebrow>Comparison</Eyebrow>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">
            MedicoreERP <span className="text-muted">vs</span> {c.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{c.summary}</p>
        </div>
      </section>

      <Section>
        <div className="overflow-x-auto rounded-card border bg-card shadow-soft">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b bg-mist/40">
                <th className="px-5 py-4 text-sm font-bold text-heading">Feature</th>
                <th className="px-5 py-4 text-sm font-bold text-teal">
                  <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> MedicoreERP</span>
                </th>
                <th className="px-5 py-4 text-sm font-bold text-muted">{c.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {c.rows.map((r) => (
                <tr key={r.feature}>
                  <td className="px-5 py-4 text-sm font-medium text-heading">{r.feature}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-teal">
                      <Check className="h-4 w-4" /> {r.medicore}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border-2 border-teal/25 bg-teal/[0.04] p-7">
            <h2 className="font-heading text-xl font-bold text-teal">Where we win</h2>
            <p className="mt-2 text-body">Modern UX, AI-native workflows by default, and weeks-not-years deployment.</p>
          </div>
          <div className="rounded-card border bg-card p-7 shadow-soft">
            <h2 className="font-heading text-xl font-bold text-heading">Where they're strong</h2>
            <ul className="mt-3 space-y-2">
              {c.theyStrong.map((t) => (
                <li key={t} className="text-sm text-muted">• {t}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Candor builds trust. We'd rather tell you the truth than lose it later.</p>
          </div>
        </div>
        <div className="mt-8 rounded-card border bg-card p-6 text-center shadow-soft">
          <p className="font-heading text-lg font-bold text-heading">Switching is easier than you think</p>
          <p className="mt-1 text-sm text-muted">Guaranteed data-freedom migration with no lock-in.</p>
          <Button asChild className="mt-4"><Link href="/demo">See a migration plan <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      <SectionHeading center title="Compare with others" className="mx-auto mb-6" />
      <div className="container-page mb-16 flex flex-wrap justify-center gap-2">
        {COMPETITORS.filter((x) => x.slug !== c.slug).map((x) => (
          <Link key={x.slug} href={`/compare/${x.slug}`} className="rounded-pill border bg-card px-4 py-2 text-sm font-semibold text-body hover:border-teal/40 hover:text-teal">
            vs {x.name}
          </Link>
        ))}
      </div>

      <CTABand />
    </>
  );
}
