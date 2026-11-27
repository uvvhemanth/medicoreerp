import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { cityPageBySlug } from "@/lib/content/local-landing";

const PAGE = cityPageBySlug("warangal");

export const metadata = localLandingMetadata(PAGE);

export default function HospitalManagementSoftwareWarangalPage() {
  return <LocalLandingPage page={PAGE} />;
}