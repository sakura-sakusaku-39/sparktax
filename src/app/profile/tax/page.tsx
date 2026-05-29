"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { formatYen } from "@/lib/format";
import { clsx } from "@/lib/clsx";

type FilingMode = "white" | "blue";

/**
 * 税金シミュレーション（簡易版）ページ。
 *
 * Vite版の TaxSimulation.tsx は tRPC + PDF 出力 + 月別収入編集など、
 * バックエンドありきの大型機能だったため、Next.js 移植版では
 * 「画面の構造とデザインを残しつつ、計算はクライアントで自己完結」する
 * 簡易バージョンとして再実装している。本格化したい場合は、月別収入の
 * 永続化を Server Action にし、PDF 出力エンドポイントを別途追加すれば良い。
 *
 * 計算式（簡易・参考）:
 * - 経費合計: 仮値（25万円）
 * - 所得 = 売上合計 - 経費 - 控除 (青色: 65万 / 白色: 0)
 * - 所得税 = 所得 × 5%（最低税率を仮定。控除後マイナスは0）
 * - 住民税 = 所得 × 10% + 5,000 円（均等割）
 * - 復興特別所得税 = 所得税 × 2.1%
 *
 * 値はあくまでアプリのデザイン確認用のサンプルです。
 */
export default function TaxSimPage() {
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(
    () => [currentYear - 1, currentYear, currentYear + 1],
    [currentYear]
  );

  const [year, setYear] = useState<number>(currentYear);
  const [filing, setFiling] = useState<FilingMode>("white");
  const [monthly, setMonthly] = useState<number[]>(() =>
    Array.from({ length: 12 }, (_, i) => SAMPLE_MONTHLY[i] ?? 0)
  );

  const totalIncome = monthly.reduce((s, n) => s + n, 0);
  const totalExpense = 250_000; // 仮の経費総額
  const baseDeduction = filing === "blue" ? 650_000 : 0;
  const taxableIncome = Math.max(totalIncome - totalExpense - baseDeduction, 0);
  const incomeTax = Math.floor(taxableIncome * 0.05);
  const reconstructionTax = Math.floor(incomeTax * 0.021);
  const residentTax = Math.floor(taxableIncome * 0.1) + 5_000;
  const totalTax = incomeTax + reconstructionTax + residentTax;

  const maxMonthly = Math.max(1, ...monthly);

  return (
    <PageShell title="税金シミュレーション">
      <p className="text-xs text-[var(--color-muted-foreground)]">
        ※ 概算です。確定額ではありません。住民税は所得割10%+均等割5,000円、復興特別所得税は2.1%で簡易計算しています。
      </p>

      {/* 年・申告区分 */}
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}年
            </option>
          ))}
        </select>

        <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden text-sm">
          {(["white", "blue"] as FilingMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setFiling(m)}
              className={clsx(
                "px-3 py-2 transition-colors",
                filing === m
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-card)] text-[var(--color-foreground)]"
              )}
            >
              {m === "white" ? "白色" : "青色"}
            </button>
          ))}
        </div>
      </div>

      {/* サマリー */}
      <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 space-y-2">
        <p className="text-xs text-[var(--color-muted-foreground)]">{year}年の概算合計</p>
        <p className="text-2xl font-bold tabular-nums">{formatYen(totalTax)}</p>
        <p className="text-[11px] text-[var(--color-muted-foreground)]">
          売上 {formatYen(totalIncome)} ／ 控除後所得 {formatYen(taxableIncome)}
        </p>
      </section>

      {/* 内訳 */}
      <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 space-y-2">
        <p className="text-sm font-bold mb-1">内訳</p>
        <BreakdownRow label="所得税" value={incomeTax} />
        <BreakdownRow label="復興特別所得税 (2.1%)" value={reconstructionTax} />
        <BreakdownRow label="住民税 (10% + 5,000円)" value={residentTax} />
        <div className="border-t border-[var(--color-border)] pt-2 mt-2 flex justify-between text-sm font-bold">
          <span>合計</span>
          <span className="tabular-nums">{formatYen(totalTax)}</span>
        </div>
      </section>

      {/* 月別バー */}
      <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4">
        <p className="text-sm font-bold mb-3">月別売上（タップで編集）</p>
        <div className="h-32 flex items-end justify-between gap-1">
          {monthly.map((amount, i) => {
            const height = Math.round((amount / maxMonthly) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-28 flex flex-col-reverse">
                  <div
                    className="w-full rounded-t-md bg-[var(--color-primary)]/80"
                    style={{ height: `${height}%`, minHeight: amount > 0 ? 4 : 0 }}
                  />
                </div>
                <span className="text-[10px] text-[var(--color-muted-foreground)]">
                  {i + 1}月
                </span>
              </div>
            );
          })}
        </div>
        <ul className="mt-4 divide-y divide-[var(--color-border)]">
          {monthly.map((amount, i) => (
            <li key={i} className="flex items-center justify-between py-2">
              <span className="text-xs text-[var(--color-muted-foreground)] w-12">
                {i + 1}月
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={amount === 0 ? "" : amount}
                onChange={(e) => {
                  const next = [...monthly];
                  next[i] = sanitize(e.target.value);
                  setMonthly(next);
                }}
                placeholder="0"
                className="flex-1 text-right rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1 text-sm tabular-nums"
              />
              <span className="ml-1 text-xs text-[var(--color-muted-foreground)]">円</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-[var(--color-muted-foreground)]">
        ※ 経費合計はサンプル値（25万円）で計算しています。実値と連動するには `/capture` で登録した経費の合計を集計してください。
      </p>
    </PageShell>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[var(--color-muted-foreground)]">{label}</span>
      <span className="tabular-nums">{formatYen(value)}</span>
    </div>
  );
}

function sanitize(v: string): number {
  const n = Number(v.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const SAMPLE_MONTHLY = [
  280_000, 320_000, 350_000, 410_000, 380_000, 450_000,
  520_000, 480_000, 460_000, 500_000, 540_000, 600_000,
];
