"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileShell } from "@/components/MobileShell";
import { ListFilter, Search, Trash, XIcon } from "@/components/icons";
import { EXPENSE_CATEGORIES, type ExpenseCategoryId, categoryLabel } from "@/lib/categories";
import { formatYen } from "@/lib/format";

type AppliedFilter = {
  from?: string;
  to?: string;
  minAmount?: number;
  maxAmount?: number;
  categories?: ExpenseCategoryId[];
  missingVendor?: boolean;
  vendorContains?: string;
};

type SampleExpense = {
  id: string;
  amount: number;
  category: ExpenseCategoryId;
  occurredAt: string;
  vendor?: string;
};

const ROWS: SampleExpense[] = [
  { id: "1", amount: 12000, category: "beauty_a", occurredAt: "2026-05-12", vendor: "Hair Salon ROSE" },
  { id: "2", amount: 22000, category: "costume", occurredAt: "2026-05-08", vendor: "Dress shop B" },
  { id: "3", amount: 3500, category: "transport", occurredAt: "2026-05-05" },
  { id: "4", amount: 6000, category: "gift", occurredAt: "2026-04-20", vendor: "Patisserie A" },
  { id: "5", amount: 9100, category: "transport", occurredAt: "2026-04-09", vendor: "JapanTaxi" },
  { id: "6", amount: 14500, category: "beauty_a", occurredAt: "2026-03-26" },
];

export function ExpensesClient() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [minA, setMinA] = useState("");
  const [maxA, setMaxA] = useState("");
  const [range, setRange] = useState<[number, number]>([0, 50000]);
  const [cats, setCats] = useState<ExpenseCategoryId[]>([]);
  const [missingVendor, setMissingVendor] = useState(false);
  const [vendorContains, setVendorContains] = useState("");
  const [applied, setApplied] = useState<AppliedFilter>({});

  const toggle = (k: ExpenseCategoryId) => {
    setCats((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const apply = () => {
    setApplied({
      from: from || undefined,
      to: to || undefined,
      minAmount: minA !== "" ? Number(minA) : range[0] > 0 ? range[0] : undefined,
      maxAmount: maxA !== "" ? Number(maxA) : range[1] < 50000 ? range[1] : undefined,
      categories: cats.length > 0 ? cats : undefined,
      missingVendor: missingVendor || undefined,
      vendorContains: vendorContains.trim() || undefined,
    });
    setFilterOpen(false);
  };

  const reset = () => {
    setFrom("");
    setTo("");
    setMinA("");
    setMaxA("");
    setRange([0, 50000]);
    setCats([]);
    setMissingVendor(false);
    setVendorContains("");
    setApplied({});
  };

  const activeCount =
    (applied.from || applied.to ? 1 : 0) +
    (applied.minAmount !== undefined || applied.maxAmount !== undefined ? 1 : 0) +
    (applied.categories?.length ?? 0) +
    (applied.missingVendor ? 1 : 0) +
    (applied.vendorContains ? 1 : 0);

  const filtered = ROWS.filter((r) => {
    if (applied.from && r.occurredAt < applied.from) return false;
    if (applied.to && r.occurredAt > applied.to) return false;
    if (applied.minAmount !== undefined && r.amount < applied.minAmount) return false;
    if (applied.maxAmount !== undefined && r.amount > applied.maxAmount) return false;
    if (applied.categories && !applied.categories.includes(r.category)) return false;
    if (applied.missingVendor && r.vendor) return false;
    if (applied.vendorContains && !(r.vendor ?? "").includes(applied.vendorContains)) return false;
    return true;
  });

  const groups = new Map<string, SampleExpense[]>();
  for (const r of filtered) {
    const d = new Date(r.occurredAt);
    const key = `${d.getFullYear()}年${d.getMonth() + 1}月`;
    (groups.get(key) ?? groups.set(key, []).get(key))!.push(r);
  }

  return (
    <MobileShell withBottomNav>
      <header className="px-5 pt-6 flex items-center justify-between">
        <BrandLogo size="sm" tagline />
        <button
          onClick={() => setFilterOpen(true)}
          className="p-2 -mr-2 text-[var(--color-muted-foreground)] relative"
          aria-label="絞り込み"
        >
          <ListFilter className="w-5 h-5" />
          {activeCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-primary)] text-white rounded-full text-[10px] flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </header>

      <div className="px-5 mt-4 pb-6">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-muted-foreground)] py-12">
            該当する経費がありません
          </p>
        ) : (
          Array.from(groups.entries()).map(([month, items]) => (
            <div key={month} className="mb-6">
              <h3 className="text-sm font-bold mb-2">{month}</h3>
              <ul className="space-y-1">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {categoryLabel(it.category)}
                        {it.vendor && (
                          <span className="text-[var(--color-muted-foreground)] font-normal">
                            {" "}
                            ・ {it.vendor}
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-[var(--color-muted-foreground)]">
                        {it.occurredAt}
                      </p>
                    </div>
                    <p className="text-sm font-bold tabular-nums whitespace-nowrap">
                      {formatYen(it.amount)}
                    </p>
                    <button className="p-1 text-[var(--color-muted-foreground)]" aria-label="削除">
                      <Trash className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* 絞り込みボトムシート */}
      {filterOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setFilterOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-3xl max-h-[85dvh] overflow-y-auto px-4 pt-4 pb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold flex-1 text-center">絞り込み</h3>
              <button onClick={() => setFilterOpen(false)} aria-label="閉じる">
                <XIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              </button>
            </div>

            <div className="space-y-5 pt-2">
              <div>
                <p className="text-sm font-semibold mb-2">期間</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
                  />
                  <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">金額（手入力）</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="下限なし"
                    value={minA}
                    onChange={(e) => setMinA(e.target.value)}
                    className="h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
                  />
                  <input
                    type="number"
                    placeholder="上限なし"
                    value={maxA}
                    onChange={(e) => setMaxA(e.target.value)}
                    className="h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">金額（スライダー）</p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    step={500}
                    value={range[0]}
                    onChange={(e) => setRange([Number(e.target.value), range[1]])}
                    className="flex-1 accent-[var(--color-primary)]"
                  />
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    step={500}
                    value={range[1]}
                    onChange={(e) => setRange([range[0], Number(e.target.value)])}
                    className="flex-1 accent-[var(--color-primary)]"
                  />
                </div>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-2">
                  {formatYen(range[0])} 〜 {formatYen(range[1])}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">取引内容</p>
                <div className="grid grid-cols-4 gap-2">
                  {EXPENSE_CATEGORIES.map((c) => {
                    const active = cats.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggle(c.id)}
                        className={`px-2 py-2 rounded-lg border text-[11px] font-medium transition-colors ${
                          active
                            ? "border-[var(--color-pink)] bg-[var(--color-pink-soft)] text-[var(--color-foreground)]"
                            : "border-[var(--color-border)] text-[var(--color-muted-foreground)]"
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">そのほか</p>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={missingVendor}
                    onChange={(e) => setMissingVendor(e.target.checked)}
                    className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)]"
                  />
                  取引先名が未入力のもの
                </label>
                <div className="pt-2">
                  <label className="text-xs text-[var(--color-muted-foreground)]">取引先名で検索</label>
                  <input
                    type="text"
                    value={vendorContains}
                    onChange={(e) => setVendorContains(e.target.value)}
                    placeholder="例: 美容室、タクシー"
                    maxLength={255}
                    className="mt-1 w-full h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={reset}
                  className="flex-1 h-11 rounded-full border border-[var(--color-border)] text-sm font-semibold"
                >
                  リセット
                </button>
                <button
                  onClick={apply}
                  className="flex-1 h-11 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold flex items-center justify-center gap-1"
                >
                  <Search className="w-4 h-4" />
                  絞り込む
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </MobileShell>
  );
}
