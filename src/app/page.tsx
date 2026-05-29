import { redirect } from "next/navigation";
import { getMyOnboarding } from "./onboarding/actions";

export const dynamic = "force-dynamic";

/**
 * トップアクセス: オンボーディング完了済みなら /report、未完了なら /onboarding。
 * Cookie 未発行（初回訪問）も /onboarding へ。
 */
export default async function HomePage() {
  const saved = await getMyOnboarding();
  if (saved) {
    redirect("/report");
  } else {
    redirect("/onboarding");
  }
}
