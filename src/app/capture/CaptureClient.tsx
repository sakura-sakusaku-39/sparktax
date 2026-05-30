"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { MobileShell } from "@/components/MobileShell";
import { Camera, CheckCircle, ImagePlus, Sparkles, XIcon } from "@/components/icons";
import { EXPENSE_CATEGORIES, type ExpenseCategoryId } from "@/lib/categories";
import { todayInputValue } from "@/lib/format";

/**
 * Vite版 Capture.tsx の Next.js 版。
 * - 8カテゴリのグリッド
 * - 金額入力（中央フォーカス）
 * - 日付・店名・メモ
 * - 撮影コツのモーダル（初回オープン時に1回だけ）
 * - 「記録する」で完了モーダル
 */
export function CaptureClient() {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<ExpenseCategoryId | "">("");
  const [occurredAt, setOccurredAt] = useState(todayInputValue());
  const [vendor, setVendor] = useState("");
  const [memo, setMemo] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [success, setSuccess] = useState(false);

  // 初回のみ撮影コツダイアログを開く
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("sparktax:capture_tutorial_seen");
    if (!seen) {
      setShowTutorial(true);
      window.localStorage.setItem("sparktax:capture_tutorial_seen", "1");
    }
  }, []);

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) {
      alert("金額を入力してください");
      return;
    }
    if (!category) {
      alert("カテゴリを選んでください");
      return;
    }
    setSuccess(true);
  };

  const reset = () => {
    setAmount("");
    setCategory("");
    setVendor("");
    setMemo("");
    setOccurredAt(todayInputValue());
    setSuccess(false);
  };

  return (
    <MobileShell withBottomNav>
      <header className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-base font-bold">領収書を登録</h1>
        <button
          onClick={() => setShowTutorial(true)}
          className="text-xs text-[var(--color-primary)] underline underline-offset-4"
        >
          撮影のコツ
        </button>
      </header>

      <div className="px-5 space-y-5 pb-6">
        {/* 撮影ボタン */}
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] py-5 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center">
              <Camera className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <span className="text-xs font-semibold">レシートを撮る</span>
          </button>
          <button className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] py-5 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center">
              <ImagePlus className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <span className="text-xs font-semibold">画像から取込</span>
          </button>
        </div>

        {/* 金額 */}
        <div>
          <label className="text-xs text-[var(--color-muted-foreground)]">金額</label>
          <div className="flex items-baseline gap-2 border-b border-[var(--color-border)] pb-2 mt-1">
            <span className="text-2xl text-[var(--color-muted-foreground)]">¥</span>
            <input
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 text-3xl font-bold bg-transparent outline-none tabular-nums"
              placeholder="0"
            />
          </div>
        </div>

        {/* カテゴリ */}
        <div>
          <label className="text-xs text-[var(--color-muted-foreground)]">カテゴリ</label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {EXPENSE_CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 rounded-xl border py-3 transition-all ${
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]/40"
                      : "border-[var(--color-border)] bg-[var(--color-card)]"
                  }`}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                    style={{ background: `${cat.color}26` }}
                  >
                    <img src={cat.icon} alt={cat.label} width={20} height={20} style={{display:"inline-block"}} />
                  </span>
                  <span className="text-[10px] font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 日付・店名 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[var(--color-muted-foreground)]">日付</label>
            <input
              type="date"
              value={occurredAt}
              max={todayInputValue()}
              onChange={(e) => setOccurredAt(e.target.value)}
              className="mt-1 w-full h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--color-muted-foreground)]">店名・取引先</label>
            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="任意"
              maxLength={255}
              className="mt-1 w-full h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
            />
          </div>
        </div>

        {/* メモ */}
        <div>
          <label className="text-xs text-[var(--color-muted-foreground)]">メモ</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="メモを残せます"
            rows={2}
            maxLength={2000}
            className="mt-1 w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-12 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-semibold text-base active:scale-[0.98] transition-transform"
        >
          記録する
        </button>
      </div>

      {/* 撮影コツモーダル */}
      {showTutorial && (
        <ModalOverlay onClose={() => setShowTutorial(false)}>
          <div className="bg-white rounded-2xl px-6 py-6 w-[88%] max-w-[340px] shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                領収書撮影のコツ
              </h3>
              <button onClick={() => setShowTutorial(false)} aria-label="閉じる">
                <XIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                カシャッの前にピントをON
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                カドまで全部うつるように
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                影が入らない明るい場所で
              </li>
            </ul>
            <button
              onClick={() => setShowTutorial(false)}
              className="w-full h-11 rounded-full bg-[var(--color-primary)] text-white font-semibold mt-5"
            >
              次へ
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* 完了モーダル */}
      {success && (
        <ModalOverlay onClose={reset}>
          <div className="bg-white rounded-2xl px-6 py-6 w-[88%] max-w-[320px] shadow-2xl text-center">
            <h3 className="text-base font-bold">登録完了しました</h3>
            <div className="my-4 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[var(--color-primary)]" />
              </div>
            </div>
            <button
              onClick={reset}
              className="w-full h-11 rounded-full bg-[var(--color-primary)] text-white font-semibold"
            >
              続けて記録する
            </button>
          </div>
        </ModalOverlay>
      )}

      <BottomNav />
    </MobileShell>
  );
}

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
