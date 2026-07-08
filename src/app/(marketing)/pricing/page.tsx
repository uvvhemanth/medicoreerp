import type { Metadata } from "next";
import Link from "next/link";
import { PRICING, FAQ_PRICING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, FAQ, Reveal } from "@/components/marketing/blocks";
import { Check, Calculator, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — transparent per-bed & per-seat",
  description: "Honest, published pricing by edition. AI features included. Try the ROI calculator to see your payback.",
};

export default function PricingPage() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Pricing" title="Transparency as a feature" subtitle="No opaque enterprise quotes. Published pricing, AI included, cancel anytime." className="mb-14" />
        <div className="grid gap-5 lg:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className={cn("flex h-full flex-col rounded-card border bg-card p-7 shadow-soft", p.highlight && "border-teal ring-2 ring-teal/20 shadow-card")}>
                {p.highlight && <span className="mb-3 w-fit rounded-pill bg-teal px-3 py-1 text-xs font-bold text-white">Most popular</span>}
                <h3 className="font-heading text-xl font-bold text-heading">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.blurb}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-heading text-4xl font-extrabold text-heading">{p.price}</span>
                  <span className="pb-1.5 text-sm text-muted">{p.unit}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-body">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={p.highlight ? "primary" : "outline"} className="mt-7">
                  <Link href="/demo">{p.cta}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-card border bg-mist/40 p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal"><Calculator className="h-5 w-5" /></div>
            <div>
              <p className="font-heading font-bold text-heading">Not sure what it's worth?</p>
              <p className="text-sm text-muted">Estimate your payback in 60 seconds.</p>
            </div>
          </div>
          <Button asChild><Link href="/pricing/roi-calculator">Open ROI calculator <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      <Section muted>
        <SectionHeading center title="Frequently asked" className="mb-10" />
        <FAQ items={FAQ_PRICING} />
      </Section>

      <CTABand />
    </>
  );
}
