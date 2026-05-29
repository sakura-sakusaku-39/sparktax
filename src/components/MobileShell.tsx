import type { ReactNode } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Vite版の MobileFrame を踏襲した縦長フレーム。
 * - モバイル: 全画面幅
 * - デスクトップ: 中央寄せ、角丸、影
 * `withBottomNav` を渡すと BottomNav の高さ分だけ下に余白を確保する。
 */
export function MobileShell({
  children,
  withBottomNav = false,
  className,
}: {
  children: ReactNode;
  withBottomNav?: boolean;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex items-stretch justify-center md:bg-[#f5f6f7]">
      <div
        className={clsx(
          "mobile-shell flex flex-col",
          withBottomNav && "bottom-nav-safe",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
