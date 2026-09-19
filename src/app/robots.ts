import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/marketing";

const ALLOW_ALL = { allow: "/" } as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...ALLOW_ALL },
      { userAgent: "Googlebot", ...ALLOW_ALL },
      { userAgent: "Google-Extended", ...ALLOW_ALL },
      { userAgent: "OAI-SearchBot", ...ALLOW_ALL },
      { userAgent: "GPTBot", ...ALLOW_ALL },
      { userAgent: "ChatGPT-User", ...ALLOW_ALL },
      { userAgent: "PerplexityBot", ...ALLOW_ALL },
      { userAgent: "ClaudeBot", ...ALLOW_ALL },
      { userAgent: "DeepSeekBot", ...ALLOW_ALL },
      { userAgent: "Bingbot", ...ALLOW_ALL },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
