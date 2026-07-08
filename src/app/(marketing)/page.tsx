import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Reveal, LogoWall, Eyebrow } from "@/components/marketing/blocks";
import { HOME_STATS, LOGO_WALL, TESTIMONIALS, PRODUCT_DOMAINS } from "@/lib/content/marketing";
import {
  Sparkles, ShieldCheck, Zap, Network, ArrowRight, Star,
  Stethoscope, Building2, Wallet, Server, Activity, Brain,
} from "lucide-react";

const MOATS = [
  { icon: Brain, title: "AI-native", desc: "Ambient scribe, autonomous RCM, and predictive ops woven into every workflow — not bolted on." },
  { icon: Network, title: "Interoperable", desc: "FHIR-native by default. HL7, DICOM, and ABDM/TEFCA ready with guaranteed data-freedom." },
  { icon: Zap, title: "Fast to deploy", desc: "Go live in weeks, not years. Configure with no-code studios instead of consultants." },
  { icon: ShieldCheck, title: "Honestly priced", desc: "Transparent per-bed pricing. AI included. No opaque enterprise quotes." },
];

const PERSONAS = [
  { icon: Building2, role: "CEO", desc: "Grow revenue & margin", href: "/solutions/hospitals" },
  { icon: Stethoscope, role: "CMO", desc: "Win over clinicians", href: "/product/clinical" },
  { icon: Wallet, role: "CFO", desc: "Cut denials, capture charges", href: "/product/revenue-cycle" },
  { icon: Server, role: "CIO", desc: "Interoperability & security", href: "/interoperability" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5" /> The AI-native Hospital OS
            </Eyebrow>
            <h1 className="mt-5 font-heading text-[40px] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-[56px]">
              Run the entire hospital on <span className="text-gradient-teal">one platform</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Clinical, operational, and financial — unified, interoperable by default, and genuinely fast to deploy.
              Aether beats the incumbents on the one axis they're weakest: usability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/demo">
                  Book a Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">See it live</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted">
              <div className="flex -space-x-2">
                {[45, 12, 32, 5].map((n) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={n} src={`https://i.pravatar.cc/48?img=${n}`} alt="" className="h-8 w-8 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" /> Trusted by 400+ care teams
              </span>
            </div>
          </div>

          {/* Hero product visual */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="overflow-hidden rounded-card border bg-card shadow-pop">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1400&q=75"
                  alt="Aether Health OS clinical dashboard"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden animate-fade-in rounded-card border bg-card p-4 shadow-pop sm:block">
                <p className="text-xs font-semibold text-muted">Documentation time</p>
                <p className="font-heading text-2xl font-extrabold text-success">↓ 62%</p>
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-card border bg-card p-4 shadow-pop sm:block">
                <p className="text-xs font-semibold text-muted">Clean-claim rate</p>
                <p className="font-heading text-2xl font-extrabold text-teal">94%</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOGO WALL */}
      <Section className="!py-12">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-muted">
          Powering care teams across India, MENA & SEA
        </p>
        <LogoWall logos={LOGO_WALL} />
      </Section>

      {/* MOAT */}
      <Section muted>
        <SectionHeading
          center
          eyebrow="Why Aether"
          title="The moat, in four words"
          subtitle="Coherence at scale — one component library, one interaction grammar across 50+ modules."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOATS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <div className="h-full rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-mist text-teal">
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-heading">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PERSONA ROUTER */}
      <Section>
        <SectionHeading center title="I'm a…" subtitle="Jump straight to what matters for your role." className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map((p) => (
            <Link
              key={p.role}
              href={p.href}
              className="group flex items-center gap-4 rounded-card border bg-card p-5 shadow-soft transition hover:border-teal/40 hover:shadow-card"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                <p.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-heading font-bold text-heading">{p.role}</p>
                <p className="text-sm text-muted">{p.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-teal" />
            </Link>
          ))}
        </div>
      </Section>

      {/* PRODUCT TOUR TEASER */}
      <Section muted>
        <SectionHeading
          eyebrow="One platform, every workflow"
          title="50+ modules that feel like one product"
          subtitle="From registration to discharge, pharmacy to payroll, bedside to boardroom."
          className="mb-12"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DOMAINS.slice(0, 6).map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05}>
              <Link
                href={`/product/${d.slug}`}
                className="group block h-full rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal" />
                  <h3 className="font-heading font-bold text-heading">{d.name}</h3>
                </div>
                <p className="text-sm text-muted">{d.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
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

      {/* STATS */}
      <Section>
        <div className="grid gap-6 rounded-[28px] border bg-gradient-to-br from-card to-mist/30 p-10 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl font-extrabold text-gradient-teal sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section muted>
        <SectionHeading center title="Loved by the people who use it daily" className="mb-12" />
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

      <CTABand />
    </>
  );
}
