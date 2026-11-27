import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { cityPageBySlug } from "@/lib/content/local-landing";

const PAGE = cityPageBySlug("pune");

export const metadata = localLandingMetadata(PAGE);

export default function HospitalManagementSoftwarePunePage() {
  return <LocalLandingPage page={PAGE} />;
}