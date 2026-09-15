import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { COMPLIANCE_BADGES } from "@/lib/content/marketing";
import { Github, Linkedin, Twitter, Globe, Mail, Phone } from "lucide-react";

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
      ["Clinics", "/solutions/clinic-management-software"],
      ["Hospitals", "/solutions/hospital-management-software"],
      ["Diagnostics", "/solutions/diagnostic-lab-management-software"],
      ["Pharmacy", "/solutions/pharmacy-management-software"],
      ["Enterprise", "/solutions/enterprise-healthcare-erp"],
      ["Government", "/solutions/government-payer-management"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/resources/blog"],
      ["About Us", "/company/about"],
      ["Contact", "/contact"],
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
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
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
            </div>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Github, Globe].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border text-muted hover:text-teal" aria-label="social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
          {COMPLIANCE_BADGES.map((b) => (
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
