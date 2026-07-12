import { SITE_NAME, SITE_URL } from "@/lib/content/marketing";

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.ico"),
    description:
      "AI-native hospital operating system for clinical, operational, and financial workflows.",
    sameAs: [],
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Run the entire hospital on one AI-native platform — clinical, operational, and financial.",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "8000",
      description: "Clinic edition starting price per month",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    author: { "@type": "Person", name: input.author },
    image: input.image,
    mainEntityOfPage: absoluteUrl(input.path),
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function jobPostingJsonLd(input: {
  title: string;
  description: string;
  location: string;
  path: string;
  employmentType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    hiringOrganization: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: input.location },
    },
    employmentType: input.employmentType.toUpperCase().replace("-", "_"),
    url: absoluteUrl(input.path),
  };
}

export function definedTermJsonLd(input: { term: string; definition: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: input.term,
    description: input.definition,
    url: absoluteUrl(input.path),
    inDefinedTermSet: absoluteUrl("/resources/glossary"),
  };
}

/** Serialize JSON-LD for a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data);
}
