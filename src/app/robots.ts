import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/marketing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/resources/guides",
          "/resources/webinars",
          "/resources/glossary",
          "/resources/changelog",
          "/customers",
          "/compare",
          "/developers",
          "/company/careers",
          "/company/partners",
          "/company/press",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
