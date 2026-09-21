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
    <div className="flex items-start gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal/10 text-teal sm:h-10 sm:w-10">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-muted sm:text-xs">{label}</p>
        <p className="mt-0.5 break-words font-heading text-sm font-bold text-heading sm:text-base">{value}</p>
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
    <div className="relative min-h-dvh bg-[#F7FBFC] text-heading">
      <div className="pointer-events-none absolute -left-24 -top-28 h-56 w-56 rounded-full bg-teal/15 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-clinical/10 blur-3xl sm:h-56 sm:w-56" />
      <HospitalArt className="pointer-events-none absolute bottom-16 right-2 hidden w-[180px] opacity-90 lg:bottom-20 lg:right-8 lg:block lg:w-[240px] xl:right-16" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-6 sm:px-8 sm:py-8 lg:py-10">
        <header className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[1fr_auto_1fr]">
          <div className="hidden sm:block" />
          <div className="flex flex-col items-center">
            <Logo />
            <p className="mt-1 text-center text-[10px] font-semibold tracking-[0.18em] text-teal sm:text-[11px]">
              SMART HEALTHCARE MANAGEMENT
            </p>
          </div>
          <p className={`${caveat.className} text-center text-lg leading-tight text-teal sm:text-right sm:text-xl`}>
            Better Care
            <br />
            Smarter Systems
          </p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center py-8 sm:py-10">
          <div className="relative grid h-16 w-16 place-items-center sm:h-[88px] sm:w-[88px]">
            <span className="absolute left-1 top-2 h-2 w-2 rounded-full bg-teal/70 sm:h-2.5 sm:w-2.5" />
            <span className="absolute right-0 top-5 h-1.5 w-1.5 rounded-full bg-clinical/80 sm:h-2 sm:w-2" />
            <span className="absolute -right-1 bottom-5 h-2 w-2 rounded-full bg-success/80 sm:h-2.5 sm:w-2.5" />
            <span className="absolute left-0 bottom-3 h-1.5 w-1.5 rounded-full bg-warning/80 sm:h-2 sm:w-2" />
            <div className="grid h-14 w-14 place-items-center rounded-full bg-success text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] sm:h-[72px] sm:w-[72px]">
              <svg viewBox="0 0 24 24" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12.5 9.5 17 19 7.5" />
              </svg>
            </div>
          </div>

          <h1 className="mt-5 text-center font-heading text-[28px] font-extrabold tracking-tight text-heading sm:mt-6 sm:text-4xl">
            Demo Request Received!
          </h1>
          <p className="mt-3 max-w-lg px-2 text-center text-sm leading-relaxed text-muted sm:text-base">
            Thank you for your interest in MedicoreERP.
            <br className="hidden sm:block" />
            {" "}We have received your request and our team will confirm your selected time by email.
          </p>

          <div className="mt-6 w-full max-w-lg divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-card sm:mt-8 sm:rounded-3xl">
            <DetailRow icon={CalendarDays} label="Scheduled Date & Time" value={scheduled} />
            <DetailRow icon={Video} label="Meeting Details" value="Meeting details will follow after confirmation" />
            <DetailRow icon={FileText} label="Reference ID" value={reference} />
          </div>

          <p className={`${caveat.className} mt-6 text-center text-2xl leading-tight text-teal sm:mt-8 lg:self-start lg:pl-4`}>
            Thank you
            <br />
            for choosing
            <br />
            MedicoreERP!
          </p>

          <HospitalArt className="mt-2 w-40 lg:hidden" />

          <p className="mt-4 max-w-md px-2 text-center text-sm text-muted">
            We&apos;re excited to show you how MedicoreERP can simplify and manage your healthcare operations.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-pill bg-teal px-6 text-sm font-bold text-white shadow-soft transition hover:bg-teal-dark sm:mt-6 sm:h-12 sm:px-7 sm:text-[15px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
        </div>

        <footer className="flex flex-col items-center gap-2 border-t border-black/[0.06] pt-4 text-xs text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2 sm:pt-6 sm:text-sm">
          <a href="mailto:info@medicoreerp.com" className="inline-flex items-center gap-2 hover:text-teal">
            <Mail className="h-4 w-4 shrink-0 text-teal" /> info@medicoreerp.com
          </a>
          <span className="hidden text-black/20 sm:inline">|</span>
          <a href="https://medicoreerp.com" className="inline-flex items-center gap-2 hover:text-teal">
            <Globe className="h-4 w-4 shrink-0 text-teal" /> www.medicoreerp.com
          </a>
          <span className="hidden text-black/20 sm:inline">|</span>
          <a href="tel:+919966411913" className="inline-flex items-center gap-2 hover:text-teal">
            <Phone className="h-4 w-4 shrink-0 text-teal" /> +91 99664 11913
          </a>
        </footer>
      </div>
    </div>
  );
}
