import type { Metadata } from "next";
import { FormThankYouCard } from "@/components/marketing/form-thank-you-card";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We received your message. The MedicoreERP team will contact you shortly.",
  robots: { index: false, follow: false },
};

export default function ContactThankYouPage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-mist/50 px-4 py-16 sm:py-24 dark:bg-white/[0.02]">
      <FormThankYouCard
        title="Thank you for your message"
        body="We received your request. Our team will get back to you within one business day."
        primaryHref="/"
        primaryLabel="Back to home"
        secondaryHref="/demo"
        secondaryLabel="Book a demo"
      />
    </section>
  );
}
