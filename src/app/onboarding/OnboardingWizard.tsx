"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileShell } from "@/components/MobileShell";
import { Lock, Receipt, Sparkles } from "@/components/icons";
import { saveOnboarding } from "./actions";

type FilingType = "blue" | "white" | "undecided";
type WorkFrequency = "high" | "medium" | "low";

const FILING_OPTIONS: { v: FilingType; l: string }[] = [
  { v: "white", l: "白色申告" },
  { v: "blue", l: "青色申告" },
  { v: "undecided", l: "未定" },
];

const FREQ_OPTIONS: { v: WorkFrequency; l: string }[] = [
  { v: "high", l: "週5日以上" },
  { v: "medium", l: "週3〜4日" },
  { v: "low", l: "週1〜2日" },
];

export function OnboardingWizard({
  initialFiling,
  initialFreq,
}: {
  initialFiling: FilingType | null;
  initialFreq: WorkFrequency | null;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [filing, setFiling] = useState<FilingType | null>(initialFiling);
  const [freq, setFreq] = useState<WorkFrequency | null>(initialFreq);
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSkip = () => {
    router.push("/signup");
  };

  const handleFinish = () => {
    if (!filing || !freq) {
      setErrorMsg("Q01 / Q02 を選択してください");
      return;
    }
    setErrorMsg(null);
    startTransition(async () => {
      const result = await saveOnboarding({ filingType: filing, workFrequency: freq });
      if (result.ok) {
        router.push("/report");
      } else {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <MobileShell>
      <div className="flex-1 flex flex-col px-6 pt-10 pb-8">
        <div className="flex items-center justify-between">
          <BrandLogo size="md" />
          <button
            onClick={handleSkip}
            className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            スキップ
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center mt-6">
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <p className="text-sm text-[var(--color-primary)] font-medium tracking-wide">STEP 01</p>
                <h2 className="text-xl font-bold leading-relaxed mt-2">
                  税金で損せず<br />
                  頑張りが手元にのこるように。
                </h2>
              </div>
              <div className="aspect-[4/3] rounded-3xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-soft)] via-[var(--color-pink-soft)] to-purple-100">
                <div className="text-center text-[var(--color-muted-foreground)]">
                  <Sparkles className="w-16 h-16 mx-auto mb-2 text-[var(--color-primary)]" />
                  <p className="text-xs">[サンプル画像]</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                毎日のヘアセット代・ドレス代はもちろん、送り代・厚生費・お店の罰金、お客様へのプレゼント、ネイルやマツエクの一部まで。夜職で働く上で払っているお金は、たくさん経費にできます。
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <p className="text-sm text-[var(--color-primary)] font-medium tracking-wide">STEP 02</p>
                <h2 className="text-xl font-bold leading-relaxed mt-2">
                  とりあえず領収書を<br />
                  撮るだけでOK！
                </h2>
              </div>
              <div className="aspect-[4/3] rounded-3xl flex items-center justify-center bg-gradient-to-br from-orange-100 via-[var(--color-pink-soft)] to-[var(--color-primary-soft)]">
                <div className="text-center text-[var(--color-muted-foreground)]">
                  <Receipt className="w-16 h-16 mx-auto mb-2 text-[var(--color-primary)]" />
                  <p className="text-xs">[サンプル画像]</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                レシートの写真を撮っておくだけで、最悪の事態（経費0円の追徴課税地獄）を回避できる、おまもりアプリです。実際に確定申告の書類を作成するまで、本名や住所などの個人情報は一切入力不要です。
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[var(--color-primary)] font-medium tracking-wide">STEP 03</p>
                <h2 className="text-lg font-bold leading-relaxed mt-2">
                  あなたの働き方にシステムを<br />調整するため、以下にお答えください。
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold">Q01 確定申告の予定は？</p>
                <div className="grid grid-cols-3 gap-2">
                  {FILING_OPTIONS.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setFiling(o.v)}
                      className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                        filing === o.v
                          ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]/50 text-[var(--color-primary)]"
                          : "border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/40"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold">Q02 出勤ベースは平均どのくらいですか？</p>
                <div className="grid grid-cols-3 gap-2">
                  {FREQ_OPTIONS.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setFreq(o.v)}
                      className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                        freq === o.v
                          ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]/50 text-[var(--color-primary)]"
                          : "border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/40"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--color-muted)]/70 rounded-xl p-4 flex gap-3 items-start">
                <Lock className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div className="text-xs leading-relaxed text-[var(--color-muted-foreground)] flex-1">
                  LINEアカウントを削除する可能性のある方は、マイページにて必ずGoogleアカウントかAppleアカウントも連携させてください。
                  <span className="text-[var(--color-destructive)]">※領収書データの紛失防止のため</span>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span>確認しました</span>
              </label>
              {errorMsg && (
                <p className="text-xs text-[var(--color-destructive)]">{errorMsg}</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-[var(--color-primary)]" : "w-1.5 bg-[var(--color-border)]"
                }`}
              />
            ))}
          </div>
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="w-full h-12 rounded-full text-base font-semibold bg-[var(--color-primary)] text-[var(--color-primary-foreground)] active:scale-[0.98] transition-transform"
            >
              次へ
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!agreed || isPending}
              className="w-full h-12 rounded-full text-base font-semibold bg-[var(--color-primary)] text-[var(--color-primary-foreground)] disabled:opacity-50 active:scale-[0.98] transition-transform"
            >
              {isPending ? "保存中..." : "はじめる！"}
            </button>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
