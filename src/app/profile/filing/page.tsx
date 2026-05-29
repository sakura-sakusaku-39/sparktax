"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { clsx } from "@/lib/clsx";

type FilingType = "white" | "blue" | "undecided";
type WorkFreq = "high" | "medium" | "low";

/**
 * 申告情報の管理ページ。
 * Vite版 StaticPages.tsx の `FilingInfoPage` 相当。
 * 現状はクライアント状態のみ保持。実永続化は Server Action 化で。
 */
export default function FilingInfoPage() {
  const [filing, setFiling] = useState<FilingType>("undecided");
  const [freq, setFreq] = useState<WorkFreq | undefined>(undefined);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSavedAt(new Date());
    setIsSaving(false);
  };

  return (
    <PageShell title="申告情報の管理">
      <p className="text-[var(--color-muted-foreground)]">
        確定申告の予定や働き方を変更できます。
      </p>

      <SectionTitle>申告予定</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            { v: "white", l: "白色申告" },
            { v: "blue", l: "青色申告" },
            { v: "undecided", l: "未定" },
          ] as { v: FilingType; l: string }[]
        ).map((o) => (
          <ChoiceButton
            key={o.v}
            active={filing === o.v}
            onClick={() => setFiling(o.v)}
          >
            {o.l}
          </ChoiceButton>
        ))}
      </div>

      <SectionTitle>出勤頻度</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            { v: "high", l: "週5日以上" },
            { v: "medium", l: "週3〜4日" },
            { v: "low", l: "週1〜2日" },
          ] as { v: WorkFreq; l: string }[]
        ).map((o) => (
          <ChoiceButton
            key={o.v}
            active={freq === o.v}
            onClick={() => setFreq(o.v)}
          >
            {o.l}
          </ChoiceButton>
        ))}
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full rounded-full bg-[var(--color-primary)] py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {isSaving ? "保存中..." : "保存する"}
      </button>

      {savedAt && (
        <p className="text-xs text-[var(--color-primary)]">
          {savedAt.toLocaleTimeString("ja-JP")} に保存しました
        </p>
      )}
    </PageShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold mb-2 mt-2">{children}</p>;
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-3 rounded-xl border text-sm font-medium transition-colors",
        active
          ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]/40 text-[var(--color-primary)]"
          : "border-[var(--color-border)]"
      )}
    >
      {children}
    </button>
  );
}
