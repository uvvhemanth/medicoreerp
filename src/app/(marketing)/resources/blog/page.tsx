import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/marketing";
import { Section, SectionHeading, Reveal } from "@/components/marketing/blocks";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

export const metadata: Metadata = { title: "Blog", description: "Ideas on AI, revenue cycle, and interoperability in healthcare." };

export default function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <Section>
      <SectionHeading eyebrow="Blog" title="Ideas from the MedicoreERP team" className="mb-10" />
      <Reveal>
        <Link href={`/resources/blog/${featured.slug}`} className="group grid gap-6 overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.image} alt={featured.title} className="aspect-[16/10] w-full object-cover" />
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.title} className="aspect-[16/9] w-full object-cover" loading="lazy" />
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
