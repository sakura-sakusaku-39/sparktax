import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { MobileShell } from "@/components/MobileShell";
import {
  CheckCircle,
  ChevronRight,
  Clipboard,
  Database,
  FileText,
  HelpCircle,
  Inbox,
  LogOut,
  Mail,
  Receipt,
  Shield,
  User,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const ACCOUNTS: { key: "line" | "google" | "apple"; label: string; linked: boolean }[] = [
  { key: "line", label: "LINEアカウント連携", linked: true },
  { key: "google", label: "Googleアカウント連携", linked: false },
  { key: "apple", label: "Appleアカウント連携", linked: false },
];

const ACCOUNT_MENU = [
  { icon: User, label: "基本情報の確認・編集", href: "/profile/basic" },
  { icon: FileText, label: "申告情報の管理", href: "/profile/filing" },
  { icon: Clipboard, label: "働き方の登録内容（再回答）", href: "/onboarding" },
  { icon: FileText, label: "税金シミュレーション", href: "/profile/tax" },
  { icon: Database, label: "データのエクスポート（CSV）", href: "/profile/export" },
];

const SUPPORT_MENU = [
  { icon: HelpCircle, label: "よくある質問", href: "/faq" },
  { icon: Mail, label: "お問い合わせ", href: "/contact" },
  { icon: Inbox, label: "お知らせ", href: "/news" },
  { icon: Receipt, label: "利用規約", href: "/terms" },
  { icon: Shield, label: "プライバシーポリシー", href: "/privacy" },
];

export default function ProfilePage() {
  const linkedCount = ACCOUNTS.filter((a) => a.linked).length;

  return (
    <MobileShell withBottomNav>
      <header className="px-5 pt-6 pb-2">
        <h1 className="text-base font-bold text-center">マイページ</h1>
      </header>

      <div className="px-5 space-y-4 pb-6">
        {/* アカウント情報 */}
        <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3">
          <div>
            <p className="text-xs text-[var(--color-muted-foreground)]">ユーザーID</p>
            <p className="text-sm font-mono break-all">u-{Math.random().toString(36).slice(2, 10)}</p>
          </div>
          {linkedCount < 2 && (
            <p className="text-xs text-[var(--color-destructive)] leading-relaxed">
              アカウントを削除するとデータが見られなくなってしまうため、2つ以上の連携をおすすめしています。
            </p>
          )}
          <div className="space-y-2">
            {ACCOUNTS.map((a) => (
              <button
                key={a.key}
                disabled={a.linked}
                className="w-full flex items-center justify-between text-sm py-2"
              >
                <span>{a.label}</span>
                {a.linked ? (
                  <span className="flex items-center gap-1 text-[var(--color-primary)] text-xs">
                    <CheckCircle className="w-4 h-4" />
                    認証済
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* CTAタイル */}
        <Link
          href="/expenses"
          className="block bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 text-center"
        >
          <p className="font-semibold text-sm">給与明細を登録</p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
            厚生費・ペナルティなども経費にできます
          </p>
        </Link>
        <div className="bg-[var(--color-primary-soft)]/40 border border-[var(--color-primary)]/30 rounded-2xl p-4 text-center">
          <p className="font-semibold text-sm">確定申告をもっとカンタンに</p>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
            （毎年2〜3月）収入・経費を入力して正しく節税しましょう
          </p>
        </div>

        {/* アカウント */}
        <MenuList title="アカウント" items={ACCOUNT_MENU} />

        {/* サポート */}
        <MenuList title="サポート" items={SUPPORT_MENU} />

        <button className="w-full rounded-full border border-[var(--color-border)] py-3 flex items-center justify-center gap-1 text-sm">
          <LogOut className="w-4 h-4" />
          ログアウト
        </button>
      </div>

      <BottomNav />
    </MobileShell>
  );
}

function MenuList({
  title,
  items,
}: {
  title: string;
  items: { icon: (p: { className?: string }) => React.ReactElement; label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-[var(--color-muted-foreground)] px-1 mb-2">{title}</p>
      <ul className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl divide-y divide-[var(--color-border)] overflow-hidden">
        {items.map((it) => (
          <li key={it.label}>
            <Link href={it.href} className="w-full flex items-center gap-3 px-4 py-3 text-sm">
              <it.icon className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              <span className="flex-1">{it.label}</span>
              <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
