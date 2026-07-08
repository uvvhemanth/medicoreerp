import type { Metadata } from "next";
import { RoiCalculator } from "@/components/marketing/roi-calculator";
import { Section, SectionHeading } from "@/components/marketing/blocks";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Estimate your payback with Aether Health OS in 60 seconds.",
};

export default function RoiPage() {
  return (
    <Section>
      <SectionHeading center eyebrow="ROI Calculator" title="What's Aether worth to you?" subtitle="Adjust the inputs — the estimate updates live. No email required to see the result." className="mb-12" />
      <RoiCalculator />
    </Section>
  );
}
