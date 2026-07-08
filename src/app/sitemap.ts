import type { MetadataRoute } from "next";
import { PRODUCT_DOMAINS, SOLUTIONS, AI_CAPABILITIES, COMPETITORS, CASE_STUDIES, BLOG_POSTS } from "@/lib/content/marketing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aether.health";
  const staticRoutes = [
    "", "/product", "/solutions", "/ai", "/interoperability", "/security",
    "/security/compliance", "/security/status", "/pricing", "/pricing/roi-calculator",
    "/customers", "/resources", "/resources/blog", "/developers", "/developers/docs",
    "/company/about", "/company/careers", "/company/press", "/company/partners",
    "/contact", "/demo",
  ];
  const dynamic = [
    ...PRODUCT_DOMAINS.map((d) => `/product/${d.slug}`),
    ...SOLUTIONS.map((s) => `/solutions/${s.slug}`),
    ...AI_CAPABILITIES.map((c) => `/ai/${c.slug}`),
    ...COMPETITORS.map((c) => `/compare/${c.slug}`),
    ...CASE_STUDIES.map((c) => `/customers/${c.slug}`),
    ...BLOG_POSTS.map((p) => `/resources/blog/${p.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-07-08"),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
