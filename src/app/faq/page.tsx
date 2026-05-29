import { PageShell } from "@/components/PageShell";

const ITEMS = [
  {
    q: "夜職の経費はどこまで認められますか？",
    a: "業務に直接関連する出費（衣装・ヘアセット・送迎タクシー・お客様への贈答など）は経費計上できる場合があります。実際の判断は税務署や税理士にご相談ください。",
  },
  {
    q: "レシートを撮り忘れた場合は？",
    a: "金額・日付・店名・カテゴリを手入力で記録できます。後から追記・編集も可能です。",
  },
  {
    q: "アカウントを削除したらデータはどうなりますか？",
    a: "削除と同時にデータは閲覧できなくなります。LINE削除リスクを避けるため、Google・Appleとの併用連携をおすすめしています。",
  },
  {
    q: "通信は安全ですか？",
    a: "通信はすべて HTTPS で暗号化され、セッションは httpOnly Cookie で管理しています。ファイルアップロードも MIME・サイズ検証を行っています。",
  },
];

export default function FaqPage() {
  return (
    <PageShell title="よくある質問">
      {ITEMS.map((it, i) => (
        <div
          key={i}
          className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4"
        >
          <p className="font-semibold mb-1">Q. {it.q}</p>
          <p className="text-[var(--color-muted-foreground)] text-[13px]">A. {it.a}</p>
        </div>
      ))}
    </PageShell>
  );
}
