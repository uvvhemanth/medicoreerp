import type { Metadata } from "next";
import Link from "next/link";
import { MARKETPLACE_APPS } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Discover SMART-on-FHIR apps for devices, RCM, engagement, and imaging on MedicoreERP.",
  alternates: { canonical: "/developers/marketplace" },
};

export default function MarketplacePage() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Developers"
          title="App marketplace"
          subtitle="Extend the platform with certified apps — or publish your own."
          className="mb-12"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {MARKETPLACE_APPS.map((app, i) => (
            <Reveal key={app.slug} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-mist text-teal">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-heading">{app.name}</h3>
                    <p className="text-xs text-muted">{app.publisher}</p>
                  </div>
                </div>
                <Badge tone="teal">{app.category}</Badge>
                <p className="mt-3 flex-1 text-sm text-muted">{app.desc}</p>
                <Button asChild variant="outline" className="mt-5 w-fit">
                  <Link href="/developers/sandbox">Try in sandbox</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTABand title="Publish on the marketplace" subtitle="Build SMART apps against our FHIR API and reach every MedicoreERP hospital." />
    </>
  );
}
