"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Database } from "@/components/icons";
import { toDateInputValue } from "@/lib/format";

/**
 * データのエクスポート（CSV）ページ。
 *
 * Vite版では `trpc.expenses.exportCsv` で実データを取りに行っていたが、
 * Next.js 移植版ではバックエンドが未接続のため、サンプル CSV を
 * クライアントで Blob 生成 → ダウンロードする実装にしている。
 *
 * 接続後は handleExport の Blob 生成部分を fetch + Server Action に
 * 差し替えるだけで本番化できる。
 */
const SAMPLE_ROWS = [
  ["date", "category", "amount", "memo"],
  ["2026-04-12", "ヘアセット", "5500", "コテ巻き"],
  ["2026-04-15", "衣装", "12800", "新ドレス"],
  ["2026-04-18", "送迎タクシー", "1840", "終電後"],
  ["2026-04-22", "贈答品", "3200", "お客様への差し入れ"],
];

export default function ExportPage() {
  const [count, setCount] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const csv = SAMPLE_ROWS.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      try {
        const a = document.createElement("a");
        a.href = url;
        a.download = `sparktax_expenses_${toDateInputValue(new Date())}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } finally {
        URL.revokeObjectURL(url);
      }
      // データ行はヘッダー除く
      setCount(SAMPLE_ROWS.length - 1);
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell title="データのエクスポート（CSV）">
      <p className="text-[var(--color-muted-foreground)]">
        登録した経費を CSV ファイルでダウンロードできます。表計算ソフトや会計ソフトに取り込んでご利用ください。
      </p>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary-soft)]/40 flex items-center justify-center">
          <Database className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <p className="text-sm font-semibold">経費データを CSV で書き出す</p>
        <p className="text-xs text-[var(--color-muted-foreground)] text-center">
          UTF-8 / カンマ区切り。Excel / Numbers / freee などで開けます。
        </p>
        <button
          onClick={handleExport}
          disabled={busy}
          className="mt-1 w-full rounded-full bg-[var(--color-primary)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "書き出し中..." : "CSVをダウンロード"}
        </button>
        {count !== null && (
          <p className="text-xs text-[var(--color-primary)]">
            {count}件をエクスポートしました
          </p>
        )}
      </div>

      <p className="text-xs text-[var(--color-muted-foreground)]">
        ※ サンプル: 4件（2026年4月分）。実データに差し替えるには Server Action 化が必要です。
      </p>
    </PageShell>
  );
}
