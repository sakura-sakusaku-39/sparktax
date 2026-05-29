import { PageShell } from "@/components/PageShell";
import { formatDate } from "@/lib/format";

/**
 * お知らせページ。
 * Vite 版は trpc.notifications.list で取得していたが、
 * Next.js 移植版ではサンプルの静的データを表示する。
 * バックエンド接続後はこの配列を fetch / Server Component に差し替えればよい。
 */
const NEWS: { id: string; publishedAt: number; title: string; body: string }[] = [
  {
    id: "n1",
    publishedAt: new Date("2026-05-20").getTime(),
    title: "Spark tax β版リリースのお知らせ",
    body: "夜職特化の経費・税金アプリ Spark tax のβ版を公開しました。アイコン・配色など細部の改善を継続しています。",
  },
  {
    id: "n2",
    publishedAt: new Date("2026-05-25").getTime(),
    title: "領収書のカテゴリを8種類に拡張",
    body: "ヘアセット / 衣装 / 美容 / 通信 / 交通 / 接待 / 消耗品 / その他 の8カテゴリで登録できるようになりました。",
  },
  {
    id: "n3",
    publishedAt: new Date("2026-05-28").getTime(),
    title: "税金シミュレーションを追加",
    body: "月別売上から所得税・住民税・復興特別所得税の概算をその場で計算できるようになりました。",
  },
];

export default function NewsPage() {
  return (
    <PageShell title="お知らせ">
      {NEWS.length === 0 && (
        <p className="text-[var(--color-muted-foreground)]">お知らせはまだありません。</p>
      )}
      {NEWS.map((n) => (
        <div
          key={n.id}
          className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4"
        >
          <p className="text-[11px] text-[var(--color-muted-foreground)]">
            {formatDate(n.publishedAt)}
          </p>
          <p className="font-semibold mt-1">{n.title}</p>
          <p className="text-[13px] text-[var(--color-muted-foreground)] mt-1 whitespace-pre-wrap">
            {n.body}
          </p>
        </div>
      ))}
    </PageShell>
  );
}
