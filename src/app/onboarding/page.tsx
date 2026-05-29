import { OnboardingWizard } from "./OnboardingWizard";
import { getMyOnboarding } from "./actions";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const saved = await getMyOnboarding();
  return (
    <OnboardingWizard
      initialFiling={(saved?.filingType as "blue" | "white" | "undecided" | undefined) ?? null}
      initialFreq={(saved?.workFrequency as "high" | "medium" | "low" | undefined) ?? null}
    />
  );
}
