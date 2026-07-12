import { redirect } from "next/navigation";

/** ROI / pricing calculator temporarily removed — send visitors to demo. */
export default function RoiCalculatorPage() {
  redirect("/demo");
}
