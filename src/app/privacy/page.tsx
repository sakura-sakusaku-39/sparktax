import { PageShell } from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell title="プライバシーポリシー">
      <p>運営者は、ユーザーのプライバシーを尊重し、個人情報を適切に取り扱います。</p>
      <p className="font-semibold">取得する情報</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        ソーシャルログインに伴う識別子・表示名・メールアドレス、領収書画像、入力された経費データ。
      </p>
      <p className="font-semibold">利用目的</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        サービスの提供、データ集計表示、申告書作成支援、お問い合わせ対応。
      </p>
      <p className="font-semibold">セキュリティ</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        通信は HTTPS で暗号化し、認証 Cookie は http-only / secure / sameSite 属性で保護されます。アップロード画像は MIME・サイズ検証を行います。
      </p>
      <p className="font-semibold">削除請求</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        お問い合わせよりデータ削除をご請求いただけます。
      </p>
      <p className="text-xs text-[var(--color-muted-foreground)]">
        ※ サンプル本文。正式公開時に法務確認のうえ差し替えてください。
      </p>
    </PageShell>
  );
}
