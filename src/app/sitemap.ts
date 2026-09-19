import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/marketing";

const DEFAULT_LASTMOD = new Date("2026-09-19T16:04:15+01:00");
const BLOG_LASTMOD = new Date("2026-09-19T16:04:22+01:00");

type Entry = {
  path: string;
  priority: number;
  lastModified?: Date;
};

const ENTRIES: Entry[] = [
  { path: "/", priority: 1.0 },
  { path: "/product/appointments", priority: 0.8 },
  { path: "/product/patient-access", priority: 0.8 },
  { path: "/product/electronic-medical-records", priority: 0.8 },
  { path: "/product/clinical-emr-opd-ipd", priority: 0.8 },
  { path: "/product/revenue-cycle", priority: 0.8 },
  { path: "/product/laboratory", priority: 0.8 },
  { path: "/product/radiology", priority: 0.8 },
  { path: "/product/supply-chain", priority: 0.8 },
  { path: "/product/analytics", priority: 0.8 },
  { path: "/product/platform", priority: 0.8 },
  { path: "/product/pharmacy", priority: 0.8 },
  { path: "/product/billing-invoices", priority: 0.8 },
  { path: "/product/patient-reminders", priority: 0.8 },
  { path: "/product/his-dashboard", priority: 0.8 },
  { path: "/integrations/third-party-api", priority: 0.8 },
  { path: "/integrations/whatsapp", priority: 0.8 },
  { path: "/demo", priority: 1.0 },
  { path: "/solutions/clinic-management-software", priority: 0.8 },
  { path: "/solutions/hospital-management-software", priority: 0.8 },
  { path: "/solutions/diagnostic-lab-management-software", priority: 0.8 },
  { path: "/solutions/pharmacy-management-software", priority: 0.8 },
  { path: "/solutions/enterprise-healthcare-erp", priority: 0.8 },
  { path: "/solutions/government-payer-management", priority: 0.8 },
  { path: "/resources/blog", priority: 0.8 },
  { path: "/company/about", priority: 0.8 },
  { path: "/contact", priority: 1.0 },
  { path: "/security", priority: 1.0 },
  { path: "/security/encryption", priority: 0.8 },
  { path: "/security/access-control", priority: 0.8 },
  { path: "/security/audit-trails", priority: 0.8 },
  { path: "/security/data-residency", priority: 0.8 },
  { path: "/security/compliance", priority: 0.8 },
  { path: "/security/status", priority: 0.8 },
  { path: "/legal/privacy", priority: 0.8 },
  { path: "/legal/terms", priority: 0.8 },
  { path: "/legal/cookies", priority: 0.8 },
  { path: "/product", priority: 1.0 },
  { path: "/product/workforce-hrm", priority: 0.8 },
  { path: "/solutions", priority: 1.0 },
  { path: "/ai", priority: 1.0 },
  { path: "/ai/ambient-scribe", priority: 0.8 },
  { path: "/ai/clinical-copilot", priority: 0.8 },
  { path: "/ai/autonomous-rcm", priority: 0.8 },
  { path: "/ai/predictive-operations", priority: 0.8 },
  { path: "/ai/nl-analytics", priority: 0.8 },
  { path: "/interoperability", priority: 1.0 },
  { path: "/interoperability/fhir", priority: 0.8 },
  { path: "/interoperability/hl7", priority: 0.8 },
  { path: "/interoperability/dicom", priority: 0.8 },
  { path: "/interoperability/abdm", priority: 0.8 },
  { path: "/interoperability/migration", priority: 0.8 },
  { path: "/resources", priority: 1.0 },
  { path: "/resources/blog/electronic-medical-records-guide", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/hospital-appointment-scheduling", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/patient-billing-and-invoices", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/patient-appointment-reminders", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/ambient-ai-clinical-documentation", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/reducing-claim-denials-with-ai", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/fhir-first-interoperability", priority: 0.6, lastModified: BLOG_LASTMOD },
  { path: "/resources/blog/abdm-ready-hospital", priority: 0.6, lastModified: BLOG_LASTMOD },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ENTRIES.map((entry) => ({
    url: entry.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${entry.path}`,
    lastModified: entry.lastModified ?? DEFAULT_LASTMOD,
    priority: entry.priority,
  }));
}
