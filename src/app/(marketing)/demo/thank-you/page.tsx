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

function HospitalArt() {
  return (
    <svg viewBox="0 0 280 200" className="h-auto w-full max-w-[280px]" aria-hidden>
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

export default async function DemoThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ when?: string; ref?: string }>;
}) {
  const { when, ref } = await searchParams;
  const scheduled = when || "We will confirm your preferred slot by email";
  const reference = ref || "Pending";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FBFC] text-heading">
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-teal/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-clinical/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-teal/[0.08] to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center px-5 py-10 sm:py-14">
        <Logo className="scale-110" />
        <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-teal">SMART HEALTHCARE MANAGEMENT</p>
        <p className={`${caveat.className} absolute right-6 top-10 hidden text-xl text-teal sm:block`}>
          Better Care<br />Smarter Systems
        </p>

        <div className="relative mt-10 grid h-[88px] w-[88px] place-items-center">
          <span className="absolute left-1 top-2 h-2.5 w-2.5 rounded-full bg-teal/70" />
          <span className="absolute right-0 top-6 h-2 w-2 rounded-full bg-clinical/80" />
          <span className="absolute -right-1 bottom-6 h-2.5 w-2.5 rounded-full bg-success/80" />
          <span className="absolute left-0 bottom-4 h-2 w-2 rounded-full bg-warning/80" />
          <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-success text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)]">
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12.5 9.5 17 19 7.5" />
            </svg>
          </div>
        </div>

        <h1 className="mt-6 text-center font-heading text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
          Demo Request Received!
        </h1>
        <p className="mt-3 max-w-lg text-center text-[15px] leading-relaxed text-muted sm:text-base">
          Thank you for your interest in MedicoreERP.
          <br />
          We have received your request and our team will confirm your selected time by email.
        </p>

        <div className="mt-8 w-full max-w-lg divide-y divide-black/[0.06] overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-card">
          <div className="flex items-start gap-4 px-5 py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
              <CalendarDays className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">Scheduled Date & Time</p>
              <p className="mt-0.5 font-heading text-base font-bold text-heading">{scheduled}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 px-5 py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
              <Video className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">Meeting Details</p>
              <p className="mt-0.5 font-heading text-base font-bold text-heading">Meeting details will follow after confirmation</p>
            </div>
          </div>
          <div className="flex items-start gap-4 px-5 py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">Reference ID</p>
              <p className="mt-0.5 font-heading text-base font-bold text-heading">{reference}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid w-full max-w-lg grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto]">
          <p className={`${caveat.className} text-center text-2xl text-teal sm:text-left`}>
            Thank you<br />for choosing<br />MedicoreERP!
          </p>
          <div className="mx-auto hidden sm:block">
            <HospitalArt />
          </div>
        </div>

        <p className="mt-4 max-w-md text-center text-sm text-muted">
          We&apos;re excited to show you how MedicoreERP can simplify and manage your healthcare operations.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-pill bg-teal px-7 text-[15px] font-bold text-white shadow-soft transition hover:bg-teal-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </Link>

        <div className="mt-auto flex w-full max-w-2xl flex-col items-center gap-3 border-t border-black/[0.06] pt-6 text-sm text-muted sm:flex-row sm:justify-center sm:gap-6">
          <a href="mailto:info@medicoreerp.com" className="inline-flex items-center gap-2 hover:text-teal">
            <Mail className="h-4 w-4 text-teal" /> info@medicoreerp.com
          </a>
          <span className="hidden sm:inline text-black/20">|</span>
          <a href="https://medicoreerp.com" className="inline-flex items-center gap-2 hover:text-teal">
            <Globe className="h-4 w-4 text-teal" /> www.medicoreerp.com
          </a>
          <span className="hidden sm:inline text-black/20">|</span>
          <a href="tel:+919966411913" className="inline-flex items-center gap-2 hover:text-teal">
            <Phone className="h-4 w-4 text-teal" /> +91 99664 11913
          </a>
        </div>
      </div>
    </div>
  );
}
