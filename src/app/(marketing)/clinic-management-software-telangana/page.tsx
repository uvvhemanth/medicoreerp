import { LocalLandingPage, localLandingMetadata } from "@/components/marketing/local-landing";
import { TELANGANA_CLINICS } from "@/lib/content/local-landing";

export const metadata = localLandingMetadata(TELANGANA_CLINICS);

export default function ClinicManagementSoftwareTelanganaPage() {
  return <LocalLandingPage page={TELANGANA_CLINICS} />;
}
