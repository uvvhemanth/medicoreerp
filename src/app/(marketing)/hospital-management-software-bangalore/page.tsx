import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { cityPageBySlug } from "@/lib/content/local-landing";

const PAGE = cityPageBySlug("bangalore");

export const metadata = localLandingMetadata(PAGE);

export default function HospitalManagementSoftwareBangalorePage() {
  return <LocalLandingPage page={PAGE} />;
}