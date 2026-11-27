import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { ABDM_HMS } from "@/lib/content/local-landing";

export const metadata = localLandingMetadata(ABDM_HMS);

export default function AbdmHospitalManagementSoftwarePage() {
  return <LocalLandingPage page={ABDM_HMS} />;
}
