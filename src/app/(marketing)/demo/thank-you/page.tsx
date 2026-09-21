import type { Metadata } from "next";
import { FormThankYouCard } from "@/components/marketing/form-thank-you-card";

export const metadata: Metadata = {
  title: "Demo request received",
  description: "Your MedicoreERP demo request was sent. Our team will confirm your selected time by email.",
  robots: { index: false, follow: false },
};

export default async function DemoThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ when?: string; ref?: string }>;
}) {
  const { when, ref } = await searchParams;

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-mist/50 px-4 py-16 sm:py-24 dark:bg-white/[0.02]">
      <FormThankYouCard
        title="Demo request received"
        body="We sent your request to info@medicoreerp.com. Our team will confirm your selected time by email."
        when={when}
        leadId={ref}
        primaryHref="/"
        primaryLabel="Back to home"
        secondaryHref="/demo"
        secondaryLabel="Book another demo"
      />
    </section>
  );
}
