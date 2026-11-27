import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { STANDARD_BADGES } from "@/lib/content/marketing";
import { Linkedin, Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { OFFICE_ADDRESS, OFFICE_MAP_URL, SOCIAL_PROFILES } from "@/lib/seo";

const SOCIAL_ICONS = { LinkedIn: Linkedin, Instagram, Facebook, YouTube: Youtube, X: Twitter } as const;

const columns = [
  {
    title: "Product",
    links: [
      ["HIS Dashboard", "/product/his-dashboard"],
      ["Electronic Medical Records", "/product/electronic-medical-records"],
      ["Appointments", "/product/appointments"],
      ["Billing & Invoices", "/product/billing-invoices"],
      ["Patient Reminders", "/product/patient-reminders"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Hospital Management Software", "/solutions/hospital-management-software"],
      ["Clinic Management Software", "/solutions/clinic-management-software"],
      ["Pharmacy & Medical Store Software", "/solutions/pharmacy-management-software"],
      ["Diagnostic Lab Software (LIS)", "/solutions/diagnostic-lab-management-software"],
      ["Enterprise", "/solutions/enterprise-healthcare-erp"],
      ["Government", "/solutions/government-payer-management"],
      ["Clinic Software in Telangana", "/clinic-management-software-telangana"],
      ["ABDM-Ready HMS", "/abdm-hospital-management-software"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/resources/blog"],
      ["Use Cases", "/use-cases"],
      ["HMS Price Guide", "/resources/blog/hospital-management-software-price-india"],
      ["How to Choose an HMS", "/resources/blog/how-to-choose-hospital-management-software"],
      ["HMS vs HIS vs EMR", "/resources/blog/hms-vs-his-vs-emr"],
    ],
  },
  {
    title: "Locations",
    links: [
      ["Hyderabad", "/hospital-management-software-hyderabad"],
      ["Warangal", "/hospital-management-software-warangal"],
      ["Vijayawada", "/hospital-management-software-vijayawada"],
      ["Visakhapatnam", "/hospital-management-software-visakhapatnam"],
      ["Bangalore", "/hospital-management-software-bangalore"],
      ["Chennai", "/hospital-management-software-chennai"],
      ["Pune", "/hospital-management-software-pune"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/company/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Trust",
    links: [
      ["Security", "/security"],
      ["Encryption", "/security/encryption"],
      ["Access Control", "/security/access-control"],
      ["Audit Trails", "/security/audit-trails"],
      ["Data Residency", "/security/data-residency"],
      ["Compliance", "/security/compliance"],
      ["Status", "/security/status"],
      ["Privacy", "/legal/privacy"],
      ["Terms", "/legal/terms"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div className="space-y-4">
            <Logo />
            <div className="max-w-sm space-y-2">
              <p className="text-sm leading-relaxed tracking-[0.01em] text-muted">
                Integrated Hospital Management System and HIS software for hospitals, clinics and healthcare organizations in Hyderabad and across India.
              </p>
              <p className="text-sm leading-relaxed tracking-[0.01em] text-muted">
                Manage clinical, administrative and financial workflows through one connected healthcare platform.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@medicoreerp.com" className="flex items-center gap-2 font-semibold text-heading hover:text-teal">
                <Mail className="h-4 w-4 text-teal" /> info@medicoreerp.com
              </a>
              <a href="tel:+919966411913" className="flex items-center gap-2 font-semibold text-heading hover:text-teal">
                <Phone className="h-4 w-4 text-teal" /> +91 99664 11913
              </a>
              <address className="not-italic">
                <a
                  href={OFFICE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted hover:text-teal"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {OFFICE_ADDRESS}
                </a>
              </address>
            </div>
            <div className="flex gap-2">
              {SOCIAL_PROFILES.map(({ network, url }) => {
                const Icon = SOCIAL_ICONS[network];
                return (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    data-track={`footer-${network.toLowerCase()}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border text-muted hover:text-teal"
                    aria-label={`MedicoreERP on ${network}`}
                    title={`MedicoreERP on ${network}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-heading">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-muted hover:text-teal">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2 border-t pt-6">
          {STANDARD_BADGES.map((b) => (
            <span key={b} className="rounded-pill border px-3 py-1 text-xs font-semibold text-muted">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-muted sm:flex-row sm:items-center">
          <p>© 2026 MedicoreERP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🌐 English (India)</span>
            <Link href="/legal/cookies" className="hover:text-teal">Cookie settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
