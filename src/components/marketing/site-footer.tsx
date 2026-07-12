import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { COMPLIANCE_BADGES } from "@/lib/content/marketing";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      ["HIS Dashboard", "/dashboard"],
      ["Electronic Medical Records", "/product/emr"],
      ["Appointments", "/product/appointments"],
      ["Billing & Invoices", "/product/billing-invoices"],
      ["Patient Reminders", "/product/patient-reminders"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Clinics", "/solutions/clinics"],
      ["Hospitals", "/solutions/hospitals"],
      ["Diagnostics", "/solutions/diagnostics"],
      ["Enterprise", "/solutions/enterprise"],
      ["Government", "/solutions/government"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/resources/blog"],
      ["Guides", "/resources/guides"],
      ["Glossary", "/resources/glossary"],
      ["Webinars", "/resources/webinars"],
      ["Changelog", "/resources/changelog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/company/about"],
      ["Careers", "/company/careers"],
      ["Press", "/company/press"],
      ["Partners", "/company/partners"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Trust",
    links: [
      ["Security", "/security"],
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
            <p className="max-w-xs text-sm text-muted">
              The AI-native Hospital Operating System. Run every clinical, operational, and financial workflow on one platform.
            </p>
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
          <p>© 2026 MedicoreERP. A demo build — no real patient data. All content is synthetic.</p>
          <div className="flex items-center gap-4">
            <span>🌐 English (India)</span>
            <Link href="/legal/cookies" className="hover:text-teal">Cookie settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
