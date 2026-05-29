import { PageShell } from "@/components/PageShell";

export default function TermsPage() {
  return (
    <PageShell title="利用規約">
      <p>
        本規約は、Spark tax（以下「本サービス」）の利用条件を定めるものです。本サービスを利用する際は、本規約に同意したものとみなされます。
      </p>
      <p className="font-semibold">第1条（適用）</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        本規約は、ユーザーと運営者との間の本サービスの利用に関わる一切の関係に適用されます。
      </p>
      <p className="font-semibold">第2条（禁止事項）</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        法令違反・他者の権利侵害・本サービスの運営妨害となる行為は禁止します。
      </p>
      <p className="font-semibold">第3条（免責）</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        本サービスは記録支援を目的としており、確定申告の最終的な責任はユーザーに帰属します。税理士法に抵触する個別アドバイスは行いません。
      </p>
      <p className="font-semibold">第4条（規約の変更）</p>
      <p className="text-[var(--color-muted-foreground)] text-[13px]">
        運営者は、必要と判断した場合に本規約を変更できるものとします。
      </p>
      <p className="text-xs text-[var(--color-muted-foreground)]">
        ※ サンプル本文。正式公開時に法務確認のうえ差し替えてください。
      </p>
    </PageShell>
  );
}
