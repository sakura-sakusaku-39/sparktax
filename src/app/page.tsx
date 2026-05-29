import { redirect } from "next/navigation";
import { getMyOnboarding } from "./onboarding/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const saved = await getMyOnboarding();
    if (saved) {
      redirect("/report");
    } else {
      redirect("/onboarding");
    }
  } catch {
    redirect("/onboarding");
  }
}
