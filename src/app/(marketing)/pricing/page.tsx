import { redirect } from "next/navigation";

/** Pricing is temporarily removed — send visitors to demo. */
export default function PricingPage() {
  redirect("/demo");
}
