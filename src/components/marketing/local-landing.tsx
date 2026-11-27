import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal, FAQ } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, faqJsonLd, DEFAULT_OG_IMAGES, OFFICE_ADDRESS, OFFICE_MAP_URL } from "@/lib/seo";
import { WHATSAPP_URL } from "@/lib/content/contact";
import type { LocalLanding } from "@/lib/content/local-landing";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";

const RELATED = [
  { label: "Hospital Management Software in India", href: "/solutions/hospital-management-software" },
  { label: "Hospital Management Software in Hyderabad", href: "/hospital-management-software-hyderabad" },
  { label: "Clinic Management Software in Telangana", href: "/clinic-management-software-telangana" },
  { label: "ABDM-Ready Hospital Management Software", href: "/abdm-hospital-management-software" },
];

export function localLandingMetadata(page: LocalLanding): Metadata {
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: { canonical: page.seo.canonical },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: page.seo.title,
      description: page.seo.description,
      url: page.seo.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  };
}

export function LocalLandingPage({ page }: { page: LocalLanding }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.breadcrumb, path: page.seo.canonical },
          ]),
          faqJsonLd(page.faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 lg:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="text-heading-display mt-5">{page.heroTitle}</h1>
              <p className="mt-3 text-xl font-semibold text-teal">{page.heroSubtitle}</p>
              <div className="mt-4 space-y-3">
                {page.intro.map((p) => (
                  <p key={p} className="text-subtitle">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/demo" data-track="local-landing-demo">
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track="local-landing-whatsapp">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section muted>
        <SectionHeading center eyebrow="Why MedicoreERP" title="Why choose MedicoreERP" className="mb-12" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.reasons.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
                <CheckCircle2 className="mb-3 h-6 w-6 text-teal" />
                <h2 className="font-heading text-lg font-bold text-heading">{item.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Coverage" title={page.areas.title} subtitle={page.areas.subtitle} className="mb-10" />
        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
          {page.areas.items.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5 rounded-pill border bg-card px-3 py-1.5 text-sm font-semibold text-body">
              <MapPin className="h-3.5 w-3.5 text-teal" /> {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section muted>
        <SectionHeading center eyebrow="Modules" title="What you can run on MedicoreERP" className="mb-12" />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {page.modules.map((mod) => (
            <div key={mod.title}>
              <h3 className="font-heading text-base font-bold text-heading">{mod.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{mod.desc}</p>
              <Link href={mod.href} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-clinical hover:underline">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 rounded-card border bg-card p-7 shadow-soft md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold text-heading">Visit or call the MedicoreERP team</h2>
            <p className="mt-2 text-muted">Our office is in Madhapur, Hyderabad. Call, message on WhatsApp or drop in for a demo.</p>
          </div>
          <div className="space-y-3 text-sm">
            <a href={OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-body hover:text-teal">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {OFFICE_ADDRESS}
            </a>
            <a href="tel:+919966411913" data-track="local-landing-call" className="flex items-center gap-2 font-semibold text-heading hover:text-teal">
              <Phone className="h-4 w-4 text-teal" /> +91 99664 11913
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-heading hover:text-teal">
              <MessageCircle className="h-4 w-4 text-teal" /> WhatsApp us
            </a>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading center eyebrow="FAQs" title="Frequently asked questions" className="mb-12" />
        <FAQ items={page.faqs} />
        <nav aria-label="Related pages" className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {RELATED.filter((r) => r.href !== page.seo.canonical).map((r) => (
            <Link key={r.href} href={r.href} className="rounded-pill border bg-card px-4 py-2 text-sm font-semibold text-clinical hover:underline">
              {r.label}
            </Link>
          ))}
        </nav>
      </Section>

      <CTABand title={page.cta.title} subtitle={page.cta.subtitle} />
    </>
  );
}
