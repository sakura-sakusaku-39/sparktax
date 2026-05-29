"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";

/**
 * お問い合わせページ。
 * Vite 版は trpc.support.contact.useMutation だったが、
 * Next.js 移植では送信先 API が未接続なのでクライアント完結のモック実装。
 * 実際は Server Action か /api/contact エンドポイントに POST する形にできる。
 */
export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!body.trim()) {
      setError("お問い合わせ内容を入力してください");
      return;
    }
    setError(null);
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    setBusy(false);
    setDone(true);
    setBody("");
  };

  return (
    <PageShell title="お問い合わせ">
      <p className="text-[var(--color-muted-foreground)]">
        ご質問・ご要望をお送りください。3営業日を目安にお返事いたします。
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-[var(--color-muted-foreground)]">
            返信先メール（任意）
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={320}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--color-muted-foreground)]">
            お問い合わせ内容
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            maxLength={4000}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] resize-y"
          />
        </div>
        {error && <p className="text-xs text-[var(--color-destructive)]">{error}</p>}
        <button
          onClick={onSubmit}
          disabled={busy}
          className="w-full rounded-full bg-[var(--color-primary)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "送信中..." : "送信する"}
        </button>
        {done && (
          <p className="text-xs text-[var(--color-primary)]">
            送信しました。お返事までしばらくお待ちください。
          </p>
        )}
      </div>
    </PageShell>
  );
}
