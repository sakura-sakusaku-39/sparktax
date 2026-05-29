"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ChevronLeft } from "@/components/icons";

/**
 * Vite 版 StaticPages の `PageShell` を Next.js 用に移植したもの。
 *
 * - 左上に戻るボタンを置き、`router.back()` が使えればそれを、できなければ
 *   `/profile` に戻るフォールバックを採用する。
 * - BottomNav は出さない（マイページ配下の詳細ページなので）。
 */
export function PageShell({
  title,
  children,
  fallbackHref = "/profile",
}: {
  title: string;
  children: ReactNode;
  fallbackHref?: string;
}) {
  const router = useRouter();

  return (
    <MobileShell>
      <header className="px-3 pt-6 flex items-center gap-2">
        <button
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              router.back();
            } else {
              router.push(fallbackHref);
            }
          }}
          className="p-2 text-[var(--color-muted-foreground)]"
          aria-label="戻る"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold">{title}</h1>
      </header>
      <div className="px-5 py-4 pb-12 text-sm leading-relaxed text-[var(--color-foreground)] space-y-4">
        {children}
      </div>
      {/* SSR 環境でリンク事前取得が動くよう、戻るリンクの代替も用意 */}
      <Link href={fallbackHref} className="hidden" prefetch>
        戻る
      </Link>
    </MobileShell>
  );
}
