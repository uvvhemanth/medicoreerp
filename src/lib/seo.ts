import { SITE_NAME, SITE_URL } from "@/lib/content/marketing";

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Site-wide schema graph for the document head. */
export function siteGraphJsonLd() {
  const origin = `${SITE_URL}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}#organization`,
        name: SITE_NAME,
        url: origin,
        description:
          "MedicoreERP provides integrated hospital management and hospital information system software for hospitals, clinics, and healthcare organizations.",
        email: "info@medicoreerp.com",
        telephone: "+91 99664 11913",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 99664 11913",
          email: "info@medicoreerp.com",
          contactType: "sales",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}#website`,
        url: origin,
        name: SITE_NAME,
        publisher: { "@id": `${origin}#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${origin}#webpage`,
        url: origin,
        name: "Hospital Management System Software | MedicoreERP",
        description:
          "MedicoreERP provides hospital management software to help healthcare organizations manage patient registration, appointments, OPD, IPD, electronic medical records, laboratory, radiology, pharmacy, billing, insurance, inventory, and hospital operations.",
        isPartOf: { "@id": `${origin}#website` },
        about: { "@id": `${origin}#software` },
        publisher: { "@id": `${origin}#organization` },
        inLanguage: "en-IN",
        mainEntity: { "@id": `${origin}#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${origin}#software`,
        name: SITE_NAME,
        url: origin,
        description:
          "An integrated hospital management system and hospital information system designed to support clinical, administrative, diagnostic, pharmacy, billing, and financial workflows.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Hospital Management System",
        operatingSystem: "Web-based",
        publisher: { "@id": `${origin}#organization` },
        featureList: [
          "Patient registration and management",
          "Appointment scheduling and patient queues",
          "Electronic Medical Records (EMR)",
          "Outpatient Department (OPD) management",
          "Inpatient Department (IPD) management",
          "Clinical documentation and workflows",
          "Laboratory Information System (LIS)",
          "Radiology and medical imaging workflows",
          "Pharmacy and prescription management",
          "Hospital billing and insurance claims",
          "Ward and bed management",
          "Nursing and patient care management",
          "Inventory and supply chain management",
          "Patient communication and reminders",
          "Hospital dashboards and analytics",
          "Healthcare system integrations",
        ],
        inLanguage: "en-IN",
      },
    ],
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
