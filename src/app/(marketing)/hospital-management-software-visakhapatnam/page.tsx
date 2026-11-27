import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { cityPageBySlug } from "@/lib/content/local-landing";

const PAGE = cityPageBySlug("visakhapatnam");

export const metadata = localLandingMetadata(PAGE);

export default function HospitalManagementSoftwareVisakhapatnamPage() {
  return <LocalLandingPage page={PAGE} />;
}