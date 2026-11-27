import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/marketing";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { ArrowRight } from "lucide-react";

export function RelatedGuides({ slugs, muted }: { slugs: string[]; muted?: boolean }) {
  const posts = slugs.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  if (!posts.length) return null;
  return (
    <Section muted={muted}>
      <SectionHeading center eyebrow="Guides" title="Helpful guides before you decide" className="mb-10" />
      <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/resources/blog/${p.slug}`}
              className="flex h-full flex-col justify-between gap-3 rounded-card border bg-card p-5 shadow-soft hover:border-teal/40"
            >
              <span>
                <span className="text-xs font-bold uppercase tracking-wide text-teal">{p.category}</span>
                <span className="mt-1 block font-heading font-bold text-heading">{p.title}</span>
                <span className="mt-1 block text-sm text-muted">{p.excerpt}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-clinical">
                Read the guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
