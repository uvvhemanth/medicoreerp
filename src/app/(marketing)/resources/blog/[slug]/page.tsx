import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/marketing";
import { BLOG_ARTICLES, BLOG_AUTHOR, articleReadMins, articleWordCount } from "@/lib/content/blog-articles";
import { CTABand } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

function anchorId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  const article = BLOG_ARTICLES[p.slug];
  const path = `/resources/blog/${p.slug}`;
  return {
    title: p.seoTitle ?? p.title,
    description: p.excerpt,
    keywords: article?.keywords,
    authors: [{ name: p.author, url: "/company/about" }],
    alternates: { canonical: path },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url: path,
      type: "article",
      publishedTime: p.date,
      modifiedTime: article?.updated ?? p.date,
      authors: [p.author],
      section: p.category,
      tags: article?.keywords,
      images: [{ url: p.image, width: 1200, height: 675, alt: p.title }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.excerpt, images: [p.image] },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  const article = p ? BLOG_ARTICLES[p.slug] : undefined;
  if (!p || !article) notFound();

  const path = `/resources/blog/${p.slug}`;
  const readMins = articleReadMins(article);
  const relatedPosts = BLOG_POSTS.filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Blog", path: "/resources/blog" },
            { name: p.title, path },
          ]),
          articleJsonLd({
            title: p.title,
            description: p.excerpt,
            path,
            date: p.date,
            dateModified: article.updated,
            author: p.author,
            image: p.image,
            keywords: article.keywords,
            wordCount: articleWordCount(article),
            section: p.category,
          }),
          faqJsonLd(article.faqs),
        ]}
      />
      <article className="container-page max-w-3xl py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-teal">Home</Link> /{" "}
          <Link href="/resources" className="hover:text-teal">Resources</Link> /{" "}
          <Link href="/resources/blog" className="hover:text-teal">Blog</Link>
        </nav>
        <Link href="/resources/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <span className="mt-6 block text-xs font-bold uppercase tracking-wide text-teal">{p.category}</span>
        <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight text-heading">{p.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>By {p.author}</span> ·{" "}
          <span>
            Published <time dateTime={p.date}>{formatDate(p.date)}</time>
          </span>
          {article.updated !== p.date && (
            <>
              ·{" "}
              <span>
                Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
              </span>
            </>
          )}{" "}
          · <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {readMins} min read</span>
        </div>

        <Image
          src={p.image}
          alt={p.title}
          width={1200}
          height={675}
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="mt-8 aspect-[16/9] w-full rounded-card border object-cover"
        />

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-body">
          <p className="text-xl font-medium text-heading">{p.excerpt}</p>
          {article.intro.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        <nav aria-label="In this article" className="mt-8 rounded-card border bg-mist/40 p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-heading">In this article</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
            {article.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${anchorId(s.heading)}`} className="text-teal hover:underline">{s.heading}</a>
              </li>
            ))}
            <li><a href="#faq" className="text-teal hover:underline">Frequently asked questions</a></li>
          </ol>
        </nav>

        <div className="mt-8 space-y-10 text-lg leading-relaxed text-body">
          {article.sections.map((s) => (
            <section key={s.heading} id={anchorId(s.heading)} className="scroll-mt-24 space-y-4">
              <h2 className="font-heading text-2xl font-bold text-heading">{s.heading}</h2>
              {s.paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              {s.bullets && (
                <ul className="list-disc space-y-2 pl-6">
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="mt-10 rounded-card border border-teal/30 bg-teal/[0.05] p-6">
          <p className="font-heading text-lg font-bold text-heading">Key takeaways</p>
          <ul className="mt-3 space-y-2">
            {article.takeaways.map((t) => (
              <li key={t} className="flex gap-2 text-body">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal" /> <span>{t}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section id="faq" className="mt-12 scroll-mt-24">
          <h2 className="font-heading text-2xl font-bold text-heading">Frequently asked questions</h2>
          <div className="mt-5 space-y-3">
            {article.faqs.map((f) => (
              <details key={f.q} className="group rounded-card border bg-card p-5 shadow-soft">
                <summary className="cursor-pointer list-none font-semibold text-heading">{f.q}</summary>
                <p className="mt-3 text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-xl font-bold text-heading">Explore related MedicoreERP solutions</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {article.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="flex h-full items-center justify-between gap-2 rounded-card border bg-card p-4 text-sm font-semibold text-heading shadow-soft hover:border-teal/40 hover:text-teal"
                >
                  {r.label} <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 rounded-card border bg-card p-6 shadow-soft">
          <p className="text-sm font-bold text-heading">About the author</p>
          <p className="mt-1 font-semibold text-teal">{p.author}</p>
          <p className="mt-2 text-sm text-muted">{BLOG_AUTHOR.bio}</p>
        </div>

        <section className="mt-12">
          <h2 className="font-heading text-xl font-bold text-heading">Keep reading</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((r) => (
              <li key={r.slug}>
                <Link href={`/resources/blog/${r.slug}`} className="group block h-full overflow-hidden rounded-card border bg-card shadow-soft hover:shadow-card">
                  <Image src={r.image} alt={r.title} width={600} height={338} sizes="(min-width: 640px) 240px, 100vw" className="aspect-[16/9] w-full object-cover" />
                  <span className="block p-4 text-sm font-semibold text-heading group-hover:text-teal">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <CTABand />
    </>
  );
}
