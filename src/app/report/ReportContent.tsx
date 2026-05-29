"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EXPENSE_CATEGORIES, type ExpenseCategoryId } from "@/lib/categories";
import { formatYen } from "@/lib/format";

/**
 * Vite版 Report.tsx を再現したクライアント側ビュー。
 * 当面は localStorage から読むサンプル経費を集計して表示する。
 * 実際の経費登録は /capture から行うと、ここに反映される。
 */

type SampleExpense = {
  id: string;
  amount: number;
  category: ExpenseCategoryId;
  occurredAt: string; // YYYY-MM-DD
};

const SEED: SampleExpense[] = [
  { id: "s1", amount: 12000, category: "beauty_a", occurredAt: monthsAgoIso(0, 5) },
  { id: "s2", amount: 8000, category: "beauty_b", occurredAt: monthsAgoIso(0, 12) },
  { id: "s3", amount: 22000, category: "costume", occurredAt: monthsAgoIso(0, 18) },
  { id: "s4", amount: 3500, category: "transport", occurredAt: monthsAgoIso(0, 22) },
  { id: "s5", amount: 6000, category: "gift", occurredAt: monthsAgoIso(1, 4) },
  { id: "s6", amount: 4800, category: "communication", occurredAt: monthsAgoIso(1, 9) },
  { id: "s7", amount: 2700, category: "supplies", occurredAt: monthsAgoIso(1, 18) },
  { id: "s8", amount: 9100, category: "transport", occurredAt: monthsAgoIso(2, 3) },
  { id: "s9", amount: 14500, category: "beauty_a", occurredAt: monthsAgoIso(2, 14) },
  { id: "s10", amount: 5500, category: "beauty_b", occurredAt: monthsAgoIso(3, 6) },
];

function monthsAgoIso(monthsAgo: number, day: number): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - monthsAgo);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  return `${y}-${m}-${`${day}`.padStart(2, "0")}`;
}

export function ReportContent() {
  const [period, setPeriod] = useState<"month" | "ytd">("month");

  const data = SEED;

  const { total, perCategory, monthly } = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now.getFullYear(), now.getMonth(), 1);
    const target = period === "month" ? data.filter((d) => new Date(d.occurredAt) >= cutoff) : data;

    let total = 0;
    const perCat = new Map<ExpenseCategoryId, number>();
    for (const e of target) {
      total += e.amount;
      perCat.set(e.category, (perCat.get(e.category) ?? 0) + e.amount);
    }

    // 直近6ヶ月の月別合計
    const monthly: { label: string; amount: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = d.getTime();
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
      const sum = data
        .filter((e) => {
          const t = new Date(e.occurredAt).getTime();
          return t >= start && t < end;
        })
        .reduce((acc, e) => acc + e.amount, 0);
      monthly.push({ label: `${d.getMonth() + 1}月`, amount: sum });
    }

    return { total, perCategory: perCat, monthly };
  }, [data, period]);

  const maxMonthly = Math.max(1, ...monthly.map((m) => m.amount));

  return (
    <div className="px-5 mt-5 space-y-6 pb-6">
      {/* 集計トグル */}
      <div className="inline-flex bg-[var(--color-muted)] rounded-full p-1 text-xs font-medium">
        {(["month", "ytd"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-full transition-colors ${
              period === p
                ? "bg-white text-[var(--color-foreground)] shadow-sm"
                : "text-[var(--color-muted-foreground)]"
            }`}
          >
            {p === "month" ? "今月" : "今年"}
          </button>
        ))}
      </div>

      {/* ドーナツチャート */}
      <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
        <p className="text-xs text-[var(--color-muted-foreground)]">
          {period === "month" ? "今月の経費合計" : "今年の経費合計"}
        </p>
        <p className="text-2xl font-bold mt-1">{formatYen(total)}</p>
        <div className="mt-4 flex justify-center">
          <Donut total={total} perCategory={perCategory} />
        </div>
      </section>

      {/* カテゴリ別内訳 */}
      <section>
        <p className="text-sm font-bold mb-3">カテゴリ別内訳</p>
        <ul className="space-y-2">
          {EXPENSE_CATEGORIES.map((cat) => {
            const value = perCategory.get(cat.id) ?? 0;
            const percent = total > 0 ? Math.round((value / total) * 100) : 0;
            return (
              <li
                key={cat.id}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                  style={{ background: `${cat.color}26` }}
                >
                  {cat.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{cat.label}</p>
                  <div className="h-1 mt-1 rounded-full bg-[var(--color-muted)] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        background: cat.color,
                      }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums">{formatYen(value)}</p>
                  <p className="text-[10px] text-[var(--color-muted-foreground)]">{percent}%</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 月別推移バー */}
      <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
        <p className="text-sm font-bold">直近6ヶ月の推移</p>
        <div className="mt-5 h-36 flex items-end justify-between gap-2">
          {monthly.map((m) => {
            const height = Math.round((m.amount / maxMonthly) * 100);
            return (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col-reverse h-32">
                  <div
                    className="w-full rounded-t-md bg-[var(--color-primary)]/80"
                    style={{ height: `${height}%`, minHeight: m.amount > 0 ? 4 : 0 }}
                  />
                </div>
                <span className="text-[10px] text-[var(--color-muted-foreground)]">{m.label}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/**
 * SVG で描く簡易ドーナツチャート（アニメーション付き）。
 *
 * - マウント時に `progress` を 0 → 1 へイージング (cubic-bezier ease-out)。
 * - その値で全セグメントの長さをスケールするので、左 (12時) から時計回りに
 *   弧が「描き足されていく」描画になる。
 * - 中央の合計値も同じ progress で滑らかにカウントアップ。
 * - ホバーされたセグメントだけ太さを + 4px して、軽くハイライトする。
 * - `prefers-reduced-motion: reduce` の環境では即座に 1 にしてアニメを抑制。
 */
function Donut({
  total,
  perCategory,
}: {
  total: number;
  perCategory: Map<ExpenseCategoryId, number>;
}) {
  const size = 180;
  const stroke = 26;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  // total が変わったらアニメをリセットして再生する（YTD/今月切替時）
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<ExpenseCategoryId | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const duration = 900;
    const start = performance.now();
    // ease-out: cubic-bezier(0.23, 1, 0.32, 1) を簡易近似
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(easeOut(t));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    setProgress(0);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [total]);

  if (total <= 0) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.35em"
          className="fill-[var(--color-muted-foreground)]"
          style={{ fontSize: 12 }}
        >
          まだデータがありません
        </text>
      </svg>
    );
  }

  let offset = 0;
  const segments = EXPENSE_CATEGORIES.map((cat) => {
    const v = perCategory.get(cat.id) ?? 0;
    if (v <= 0) return null;
    const fullLen = (v / total) * c;
    const len = fullLen * progress; // ← ここで描画進捗を弧の長さに乗せる
    const isHovered = hovered === cat.id;
    const seg = (
      <circle
        key={cat.id}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={cat.color}
        strokeWidth={isHovered ? stroke + 4 : stroke}
        strokeDasharray={`${len} ${c - len}`}
        strokeDashoffset={-offset}
        strokeLinecap="butt"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-width 200ms cubic-bezier(0.23, 1, 0.32, 1)",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(cat.id)}
        onMouseLeave={() => setHovered(null)}
      />
    );
    offset += fullLen;
    return seg;
  });

  // 中央テキスト：ホバー中はそのカテゴリの内訳を、それ以外は合計値（カウントアップ）
  const animatedTotal = Math.round(total * progress);
  const hoveredCat = hovered ? EXPENSE_CATEGORIES.find((c) => c.id === hovered) : null;
  const hoveredValue = hovered ? perCategory.get(hovered) ?? 0 : 0;
  const hoveredPercent =
    hovered && total > 0 ? Math.round((hoveredValue / total) * 100) : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-muted)" strokeWidth={stroke} />
      {segments}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="-0.2em"
        className="fill-[var(--color-muted-foreground)]"
        style={{ fontSize: 11, transition: "fill 200ms" }}
      >
        {hoveredCat ? hoveredCat.label : "合計"}
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="1.1em"
        className="fill-[var(--color-foreground)] tabular-nums"
        style={{ fontSize: 16, fontWeight: 700 }}
      >
        {hoveredCat
          ? `${formatYen(hoveredValue)} (${hoveredPercent}%)`
          : formatYen(animatedTotal)}
      </text>
    </svg>
  );
}
