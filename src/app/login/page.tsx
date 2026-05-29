import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileShell } from "@/components/MobileShell";
import { Apple, Google, Line } from "@/components/icons";

export const dynamic = "force-dynamic";

/**
 * ログイン画面。
 * Vite版と同じく LINE 緑 / Google 白枠 / Apple 黒の縦並び3ボタン。
 * Next.js 版では認証実装は後続フェーズなので、いずれも /onboarding に飛ばす。
 */
export default function LoginPage() {
  const buttons = [
    {
      label: "LINEでログイン",
      icon: <Line className="w-5 h-5" />,
      className: "bg-[var(--color-line-green)] text-white hover:opacity-95",
      href: "/onboarding",
    },
    {
      label: "Googleでログイン",
      icon: <Google className="w-5 h-5" />,
      className: "bg-white border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
      href: "/onboarding",
    },
    {
      label: "Appleアカウントでログイン",
      icon: <Apple className="w-5 h-5 text-white" />,
      className: "bg-[var(--color-apple-black)] text-white hover:opacity-90",
      href: "/onboarding",
    },
  ];

  return (
    <MobileShell>
      <div className="flex-1 flex flex-col px-6 pt-16 pb-10 dot-bg">
        <div className="flex flex-col items-center text-center gap-3">
          <BrandLogo size="xl" tagline />
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">おかえりなさい</p>
        </div>

        <div className="flex-1 flex flex-col justify-end gap-3 mt-12">
          {buttons.map((b) => (
            <Link
              key={b.label}
              href={b.href}
              className={`flex items-center justify-center gap-3 h-12 rounded-full font-medium text-sm transition-colors active:scale-[0.98] ${b.className}`}
            >
              {b.icon}
              {b.label}
            </Link>
          ))}

          <p className="text-center text-sm text-[var(--color-primary)] mt-6">
            <Link href="/signup" className="underline underline-offset-4">
              はじめてご利用の方はこちら
            </Link>
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
