import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ArrowLeft, CalendarDays, Globe, Mail, Phone, FileText, Video } from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: { absolute: "Demo Request Received | MedicoreERP" },
  description: "Thank you for your interest in MedicoreERP. Our team will confirm your selected demo time by email.",
  robots: { index: false, follow: false },
};

function HospitalArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 200" className={className} aria-hidden>
      <ellipse cx="140" cy="188" rx="110" ry="10" fill="#0D9488" opacity="0.12" />
      <rect x="48" y="78" width="184" height="110" rx="8" fill="#99F6E4" />
      <rect x="88" y="42" width="104" height="146" rx="6" fill="#5EEAD4" />
      <rect x="118" y="18" width="44" height="28" rx="4" fill="#14B8A6" />
      <path d="M140 8v40M120 28h40" stroke="#0F766E" strokeWidth="6" strokeLinecap="round" />
      <rect x="64" y="96" width="28" height="28" rx="3" fill="#CCFBF1" />
      <rect x="100" y="96" width="28" height="28" rx="3" fill="#CCFBF1" />
      <rect x="152" y="96" width="28" height="28" rx="3" fill="#CCFBF1" />
      <rect x="188" y="96" width="28" height="28" rx="3" fill="#CCFBF1" />
      <rect x="64" y="136" width="28" height="28" rx="3" fill="#CCFBF1" />
      <rect x="188" y="136" width="28" height="28" rx="3" fill="#CCFBF1" />
      <rect x="122" y="132" width="36" height="56" rx="4" fill="#0F766E" />
      <circle cx="36" cy="168" r="18" fill="#5EEAD4" />
      <circle cx="36" cy="152" r="10" fill="#14B8A6" />
      <circle cx="248" cy="164" r="16" fill="#5EEAD4" />
      <circle cx="248" cy="150" r="9" fill="#14B8A6" />
    </svg>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-muted">{label}</p>
        <p className="break-words font-heading text-sm font-bold leading-snug text-heading">{value}</p>
      </div>
    </div>
  );
}

export default async function DemoThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ when?: string; ref?: string }>;
}) {
  const { when, ref } = await searchParams;
  const scheduled = when || "We will confirm your preferred slot by email";
  const reference = ref || "Pending";

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#F7FBFC] text-heading">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-4 sm:px-6 sm:py-5">
        <header className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col items-center sm:items-start">
            <Logo />
            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.16em] text-teal">
              SMART HEALTHCARE MANAGEMENT
            </p>
          </div>
          <p className={`${caveat.className} shrink-0 pt-1 text-right text-base leading-tight text-teal sm:text-lg`}>
            Better Care
            <br />
            Smarter Systems
          </p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center py-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-success text-white shadow-[0_8px_24px_rgba(16,185,129,0.3)] sm:h-14 sm:w-14">
            <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12.5 9.5 17 19 7.5" />
            </svg>
          </div>

          <h1 className="mt-3 text-center font-heading text-[22px] font-extrabold tracking-tight text-heading sm:text-[28px]">
            Demo Request Received!
          </h1>
          <p className="mt-1.5 max-w-md text-center text-xs leading-relaxed text-muted sm:text-sm">
            Thank you for your interest in MedicoreERP. We have received your request and our team will confirm your selected time by email.
          </p>

          <div className="mt-4 w-full divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-soft">
            <DetailRow icon={CalendarDays} label="Scheduled Date & Time" value={scheduled} />
            <DetailRow icon={Video} label="Meeting Details" value="Meeting details will follow after confirmation" />
            <DetailRow icon={FileText} label="Reference ID" value={reference} />
          </div>

          <div className="mt-4 grid w-full grid-cols-[1fr_auto] items-center gap-3">
            <p className={`${caveat.className} text-left text-xl leading-tight text-teal sm:text-2xl`}>
              Thank you
              <br />
              for choosing
              <br />
              MedicoreERP!
            </p>
            <HospitalArt className="h-[72px] w-[100px] sm:h-[88px] sm:w-[124px]" />
          </div>

          <p className="mt-3 text-center text-xs leading-relaxed text-muted sm:text-sm">
            We&apos;re excited to show you how MedicoreERP can simplify and manage your healthcare operations.
          </p>

          <Link
            href="/"
            className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-pill bg-teal px-6 text-sm font-bold text-white shadow-soft transition hover:bg-teal-dark sm:h-11 sm:px-7"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-black/[0.06] pt-3 text-[11px] text-muted sm:text-xs">
          <a href="mailto:info@medicoreerp.com" className="inline-flex items-center gap-1.5 hover:text-teal">
            <Mail className="h-3.5 w-3.5 text-teal" /> info@medicoreerp.com
          </a>
          <span className="text-black/20">|</span>
          <a href="https://medicoreerp.com" className="inline-flex items-center gap-1.5 hover:text-teal">
            <Globe className="h-3.5 w-3.5 text-teal" /> www.medicoreerp.com
          </a>
          <span className="text-black/20">|</span>
          <a href="tel:+919966411913" className="inline-flex items-center gap-1.5 hover:text-teal">
            <Phone className="h-3.5 w-3.5 text-teal" /> +91 99664 11913
          </a>
        </footer>
      </div>
    </div>
  );
}
