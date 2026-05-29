"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@/lib/clsx";

/**
 * 画面下部の3タブ：レポート / 領収書登録(中央カメラ大ボタン) / マイページ。
 * Vite版と同じ構成で、中央のみ立体的な丸ボタンとして浮かせる。
 */
type Item = {
  href: string;
  label: string;
  primary?: boolean;
  icon: (props: { className?: string }) => React.ReactElement;
};

function PieIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M21 12A9 9 0 1 1 12 3v9z" />
      <path d="M21 12A9 9 0 0 0 12 3v9h9" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const ITEMS: Item[] = [
  { href: "/report", label: "レポート", icon: PieIcon },
  { href: "/capture", label: "領収書登録", icon: CameraIcon, primary: true },
  { href: "/profile", label: "マイページ", icon: UserIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 border-t border-[var(--color-border)] bg-white/95 backdrop-blur">
      <div className="grid grid-cols-3 items-end px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {ITEMS.map((item) => {
          const active = pathname === item.href || (item.href === "/report" && pathname === "/");
          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center -mt-6">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[rgba(46,196,182,0.35)] transition-transform active:scale-95">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="mt-1 text-[10px] font-medium text-[var(--color-foreground)]">{item.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-1 py-2 transition-colors",
                active ? "text-[var(--color-primary)]" : "text-[var(--color-muted-foreground)]",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
