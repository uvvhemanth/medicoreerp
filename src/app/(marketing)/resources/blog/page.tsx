import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/marketing";
import { BLOG_ARTICLES, articleReadMins } from "@/lib/content/blog-articles";
import { Section, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { absoluteUrl, breadcrumbJsonLd, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Hospital Management Blog: EMR, Billing, ABDM & AI Guides",
  description:
    "Practical guides for Indian hospitals and clinics on EMR adoption, OPD scheduling, billing and GST, claim denials, ABDM compliance and AI documentation.",
  alternates: { canonical: "/resources/blog" },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Hospital Management Blog | MedicoreERP",
    description:
      "Practical guides for Indian hospitals and clinics on EMR, billing, ABDM, claims, interoperability and AI.",
    url: "/resources/blog",
    type: "website",
  },
};

const posts = BLOG_POSTS.map((p) => {
  const article = BLOG_ARTICLES[p.slug];
  return { ...p, readMins: article ? articleReadMins(article) : p.readMins };
});

export default function BlogIndex() {
  const [featured, ...rest] = posts;
  return (
    <Section>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Blog", path: "/resources/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "MedicoreERP Blog",
            url: absoluteUrl("/resources/blog"),
            inLanguage: "en-IN",
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/resources/blog/${p.slug}`),
              datePublished: p.date,
              dateModified: BLOG_ARTICLES[p.slug]?.updated ?? p.date,
            })),
          },
        ]}
      />
      <p className="text-xs font-bold uppercase tracking-wide text-teal">Blog</p>
      <h1 className="mt-2 mb-10 font-heading text-4xl font-extrabold leading-tight text-heading">Hospital management guides from the MedicoreERP team</h1>
      <p className="-mt-6 mb-10 max-w-3xl text-muted">
        Practical, India-focused guides on running a modern hospital or clinic — from EMR adoption and OPD scheduling to billing, insurance claims, ABDM compliance and AI.
      </p>
      <Reveal>
        <Link href={`/resources/blog/${featured.slug}`} className="group grid gap-6 overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card lg:grid-cols-2">
          <Image src={featured.image} alt={featured.title} width={1200} height={750} priority sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[16/10] h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-7">
            <span className="text-xs font-bold uppercase tracking-wide text-teal">{featured.category}</span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-heading">{featured.title}</h2>
            <p className="mt-2 text-muted">{featured.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted">
              <span>{featured.author}</span> · <span>{formatDate(featured.date)}</span> · <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readMins} min</span>
            </div>
          </div>
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link href={`/resources/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card">
              <Image src={p.image} alt={p.title} width={800} height={450} sizes="(min-width: 1024px) 400px, 100vw" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-teal">{p.category}</span>
                <h3 className="mt-1 font-heading font-bold text-heading">{p.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted line-clamp-2">{p.excerpt}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <span>{formatDate(p.date)}</span> · <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readMins} min</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
