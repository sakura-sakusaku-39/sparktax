import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileShell } from "@/components/MobileShell";
import { Apple, Google, Line } from "@/components/icons";

export const dynamic = "force-dynamic";

/**
 * 新規登録画面。Vite版同様、3つのソーシャルログインボタンと利用規約リンク。
 */
export default function SignUpPage() {
  const buttons = [
    {
      label: "LINEで無料登録",
      icon: <Line className="w-5 h-5" />,
      className: "bg-[var(--color-line-green)] text-white hover:opacity-95",
      href: "/onboarding",
    },
    {
      label: "Googleで無料登録",
      icon: <Google className="w-5 h-5" />,
      className: "bg-white border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
      href: "/onboarding",
    },
    {
      label: "Appleアカウントで無料登録",
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
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
            タップで完了！まずは無料アカウント登録から！
          </p>
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

          <p className="text-[11px] text-center text-[var(--color-muted-foreground)] leading-relaxed mt-4">
            アカウント登録で、
            <Link href="/terms" className="underline">利用規約</Link>と
            <Link href="/privacy" className="underline">プライバシーポリシー</Link>
            に同意したことになります。
          </p>

          <p className="text-center text-sm text-[var(--color-primary)] mt-4">
            <Link href="/login" className="underline underline-offset-4">
              ログイン画面はこちら
            </Link>
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
