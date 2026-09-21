import type { Metadata } from "next";
import { FormThankYouCard } from "@/components/marketing/form-thank-you-card";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We received your request. The MedicoreERP team will contact you shortly.",
  robots: { index: false, follow: false },
};

const COPY: Record<string, { title: string; body: string }> = {
  contact: {
    title: "Thank you for your message",
    body: "We received your request. Our team will get back to you within one business day.",
  },
  demo: {
    title: "Demo request received",
    body: "We sent your request to info@medicoreerp.com. Our team will confirm your selected time by email.",
  },
  sandbox: {
    title: "Thank you — sandbox request received",
    body: "Our team will contact you with the next steps for your sandbox tenant.",
  },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const copy = COPY[from ?? ""] ?? {
    title: "Thank you",
    body: "We received your request. Our team will contact you shortly.",
  };

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-mist/50 px-4 py-16 sm:py-24 dark:bg-white/[0.02]">
      <FormThankYouCard
        title={copy.title}
        body={copy.body}
        primaryHref="/"
        primaryLabel="Back to home"
        secondaryHref={from === "demo" ? "/contact" : "/demo"}
        secondaryLabel={from === "demo" ? "Contact us" : "Book a demo"}
      />
    </section>
  );
}
