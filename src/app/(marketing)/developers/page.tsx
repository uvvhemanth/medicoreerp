import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { Code2, Webhook, Package, TerminalSquare, KeyRound, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Developers", description: "Public FHIR-native API, SMART-on-FHIR apps, webhooks, sandbox, SDKs, and a marketplace." };

const RESOURCES = [
  { icon: Code2, title: "API & FHIR docs", desc: "Interactive reference for REST + FHIR R4." },
  { icon: KeyRound, title: "SMART-on-FHIR", desc: "Register apps and request scoped access." },
  { icon: Webhook, title: "Webhooks", desc: "Subscribe to real-time platform events." },
  { icon: Package, title: "Marketplace", desc: "Publish and discover healthcare apps." },
];

export default function DevelopersPage() {
  return (
    <>
      <section className="border-b bg-ink text-white">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <Eyebrow>Developer Platform</Eyebrow>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">Build on the same API we do.</h1>
            <p className="mt-4 max-w-lg text-lg text-white/70">FHIR-native, public, and documented. The web app is a client of this API — not a privileged one.</p>
            <div className="mt-7 flex gap-3">
              <Button asChild className="bg-teal"><Link href="/developers/sandbox">Get a sandbox</Link></Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10"><Link href="/developers/docs">Read the docs</Link></Button>
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-card border border-white/10 bg-black/30 p-5 font-mono text-sm shadow-pop">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-danger" /><span className="h-3 w-3 rounded-full bg-warning" /><span className="h-3 w-3 rounded-full bg-success" />
              </div>
              <pre className="overflow-x-auto text-white/80"><code>{`GET /fhir/r4/Patient/UH240188
Authorization: Bearer <token>

200 OK
{
  "resourceType": "Patient",
  "id": "UH240188",
  "name": [{ "text": "Meera Sharma" }],
  "birthDate": "1979-04-12",
  "gender": "female"
}`}</code></pre>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading center title="Everything you need to integrate" className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-mist text-teal"><r.icon className="h-5 w-5" /></div>
                <h3 className="font-heading font-bold text-heading">{r.title}</h3>
                <p className="mt-1 text-sm text-muted">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="outline"><Link href="/developers/sandbox">SDK downloads <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>
      <CTABand title="Ready to build?" subtitle="Spin up a sandbox tenant with sample data and start calling the API in minutes." />
    </>
  );
}
