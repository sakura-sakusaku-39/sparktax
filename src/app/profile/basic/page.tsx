"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";

/**
 * 基本情報の確認・編集ページ。
 * Vite版では Profile.tsx 内のダイアログだったが、Next.js では遷移先ページとして独立。
 *
 * - 表示名・メールアドレスの編集
 * - 保存はモック（実際の永続化は Server Action 化が必要）
 */
export default function ProfileBasicPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onSave = async () => {
    setIsSaving(true);
    // 実際の Server Action に差し替えるポイント
    await new Promise((r) => setTimeout(r, 600));
    setSavedAt(new Date());
    setIsSaving(false);
  };

  return (
    <PageShell title="基本情報の確認・編集">
      <p className="text-[var(--color-muted-foreground)]">
        表示名とメールアドレスを編集できます。
      </p>

      <div className="space-y-3">
        <Field label="表示名">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={120}
            placeholder="お名前 / ニックネーム"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </Field>
        <Field label="メールアドレス">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={320}
            placeholder="example@sparktax.app"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </Field>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-[var(--color-muted-foreground)]">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
