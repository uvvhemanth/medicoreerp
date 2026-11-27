import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { cityPageBySlug } from "@/lib/content/local-landing";

const PAGE = cityPageBySlug("chennai");

export const metadata = localLandingMetadata(PAGE);

export default function HospitalManagementSoftwareChennaiPage() {
  return <LocalLandingPage page={PAGE} />;
}