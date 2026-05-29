import { OnboardingWizard } from "./OnboardingWizard";
import { getMyOnboarding } from "./actions";
export const dynamic = "force-dynamic";
export default async function OnboardingPage() {
  let initialFiling = null;
  let initialFreq = null;
  try {
    const saved = await getMyOnboarding();
    if (saved) {
      initialFiling = saved.filingType as "blue" | "white" | "undecided" | null;
      initialFreq = saved.workFrequency as "high" | "medium" | "low" | null;
    }
  } catch {}
  return (
    <OnboardingWizard
      initialFiling={initialFiling}
      initialFreq={initialFreq}
    />
  );
}
