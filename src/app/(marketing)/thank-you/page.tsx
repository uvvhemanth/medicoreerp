import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/marketing/blocks";
import { CalendarCheck, CheckCircle2 } from "lucide-react";

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
    title: "Thank you — your demo request was sent",
    body: "We received your demo booking. Our team will confirm the next step by email.",
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
    <Section>
      <div className="mx-auto flex max-w-lg flex-col items-center rounded-card border-2 border-teal/25 bg-teal/[0.04] p-10 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-heading sm:text-3xl">{copy.title}</h1>
        <p className="mt-3 max-w-sm text-muted">{copy.body}</p>
        <div className="mt-6 flex items-center gap-2 rounded-lg bg-card px-4 py-3 text-sm">
          <CalendarCheck className="h-5 w-5 text-teal" />
          <span className="text-body">Our team will follow up at info@medicoreerp.com</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={from === "demo" ? "/contact" : "/demo"}>
              {from === "demo" ? "Contact us" : "Book a demo"}
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
