import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app/", "/portal/", "/login", "/register"],
    },
    sitemap: "https://aether.health/sitemap.xml",
  };
}
