import { BottomNav } from "@/components/BottomNav";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileShell } from "@/components/MobileShell";
import { ReportContent } from "./ReportContent";
import { Bell, ListFilter } from "@/components/icons";
import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * レポート画面（ホームタブ）。
 * - ヘッダー: ロゴ + 通知 + 絞り込み
 * - ドーナツチャート / カテゴリ別内訳 / 月別推移バー
 *
 * Next.js 化はまだサンプルデータで描画する段階。
 * 実データは将来 trpc → Server Action 化する予定。
 */
export default function ReportPage() {
  return (
    <MobileShell withBottomNav>
      <header className="px-5 pt-6 flex items-center justify-between">
        <BrandLogo size="sm" tagline />
        <div className="flex items-center gap-1">
          <button className="p-2 text-[var(--color-muted-foreground)]" aria-label="通知">
            <Bell className="w-5 h-5" />
          </button>
          <Link
            href="/expenses"
            className="p-2 text-[var(--color-muted-foreground)]"
            aria-label="絞り込み"
          >
            <ListFilter className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <ReportContent />

      <BottomNav />
    </MobileShell>
  );
}
