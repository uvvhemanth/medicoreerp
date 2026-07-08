import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/marketing";
import { CTABand } from "@/components/marketing/blocks";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <article className="container-page max-w-3xl py-12">
        <Link href="/resources/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <span className="mt-6 block text-xs font-bold uppercase tracking-wide text-teal">{p.category}</span>
        <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight text-heading">{p.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <span>{p.author}</span> · <span>{formatDate(p.date)}</span> · <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {p.readMins} min read</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} className="mt-8 aspect-[16/9] w-full rounded-card border object-cover" />
        <div className="prose mt-8 space-y-5 text-lg leading-relaxed text-body">
          <p className="text-xl font-medium text-heading">{p.excerpt}</p>
          <p>Healthcare technology is at an inflection point. For decades, hospital information systems optimized for billing and compliance at the expense of the people who use them all day — clinicians, nurses, and front-office staff.</p>
          <p>Aether takes the opposite view: usability is the moat. When a system is genuinely fast and pleasant to use, adoption follows, data quality improves, and every downstream metric — from documentation time to denial rates — moves in the right direction.</p>
          <h2 className="font-heading text-2xl font-bold text-heading">What this means in practice</h2>
          <p>Every screen is a variation on six reusable archetypes. Learn one worklist and you know them all. Every primary action has a keyboard shortcut. Every dangerous action is guarded and attributed. Every state — loading, empty, error, offline — is designed, not an afterthought.</p>
          <p>That coherence is what lets a small team ship 50 modules that feel like one product, and what makes clinicians choose it over the incumbents.</p>
        </div>
      </article>
      <CTABand />
    </>
  );
}
