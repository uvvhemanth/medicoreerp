import type { MetadataRoute } from "next";
import {
  PRODUCT_DOMAINS,
  SOLUTIONS,
  AI_CAPABILITIES,
  COMPETITORS,
  CASE_STUDIES,
  BLOG_POSTS,
  GUIDES,
  WEBINARS,
  GLOSSARY,
  STANDARDS,
  SITE_URL,
} from "@/lib/content/marketing";
import { JOBS } from "@/lib/content/company";

type Entry = {
  path: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Entry[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/product", priority: 0.9 },
    { path: "/dashboard", priority: 0.95 },
    { path: "/solutions", priority: 0.9 },
    { path: "/ai", priority: 0.9 },
    { path: "/interoperability", priority: 0.8 },
    { path: "/integrations/third-party-api", priority: 0.85 },
    { path: "/integrations/whatsapp", priority: 0.85 },
    { path: "/security", priority: 0.8 },
    { path: "/security/compliance", priority: 0.7 },
    { path: "/security/status", priority: 0.6 },
    { path: "/customers", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/resources/blog", priority: 0.8 },
    { path: "/resources/guides", priority: 0.8 },
    { path: "/resources/webinars", priority: 0.7 },
    { path: "/resources/glossary", priority: 0.8 },
    { path: "/resources/changelog", priority: 0.6 },
    { path: "/developers", priority: 0.8 },
    { path: "/developers/docs", priority: 0.7 },
    { path: "/developers/fhir", priority: 0.7 },
    { path: "/developers/marketplace", priority: 0.7 },
    { path: "/developers/sandbox", priority: 0.7 },
    { path: "/company/about", priority: 0.6 },
    { path: "/company/careers", priority: 0.6 },
    { path: "/company/press", priority: 0.5 },
    { path: "/company/partners", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/demo", priority: 1, changeFrequency: "weekly" },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/dpa", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/baa", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" },
  ];

  const dynamic: Entry[] = [
    ...PRODUCT_DOMAINS.map((d) => ({ path: `/product/${d.slug}`, priority: 0.85 })),
    ...SOLUTIONS.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.85 })),
    ...AI_CAPABILITIES.map((c) => ({ path: `/ai/${c.slug}`, priority: 0.85 })),
    ...STANDARDS.map((s) => ({ path: `/interoperability/${s.slug}`, priority: 0.75 })),
    ...COMPETITORS.map((c) => ({ path: `/compare/${c.slug}`, priority: 0.9 })),
    ...CASE_STUDIES.map((c) => ({ path: `/customers/${c.slug}`, priority: 0.75 })),
    ...BLOG_POSTS.map((p) => ({ path: `/resources/blog/${p.slug}`, priority: 0.7 })),
    ...GUIDES.map((g) => ({ path: `/resources/guides/${g.slug}`, priority: 0.75 })),
    ...WEBINARS.map((w) => ({ path: `/resources/webinars/${w.slug}`, priority: 0.65 })),
    ...GLOSSARY.map((t) => ({ path: `/resources/glossary/${t.slug}`, priority: 0.7 })),
    ...JOBS.map((j) => ({ path: `/company/careers/${j.slug}`, priority: 0.5 })),
  ];

  const lastModified = new Date("2026-07-12");

  return [...staticRoutes, ...dynamic].map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency ?? "weekly",
    priority: entry.priority ?? 0.7,
  }));
}
