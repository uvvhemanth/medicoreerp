import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { HYDERABAD_HMS } from "@/lib/content/local-landing";

export const metadata = localLandingMetadata(HYDERABAD_HMS);

export default function HospitalManagementSoftwareHyderabadPage() {
  return <LocalLandingPage page={HYDERABAD_HMS} />;
}
