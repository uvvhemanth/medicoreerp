import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { cityPageBySlug } from "@/lib/content/local-landing";

const PAGE = cityPageBySlug("vijayawada");

export const metadata = localLandingMetadata(PAGE);

export default function HospitalManagementSoftwareVijayawadaPage() {
  return <LocalLandingPage page={PAGE} />;
}