import Link from "next/link";
import { MobileShell } from "@/components/MobileShell";
import { BrandLogo } from "@/components/BrandLogo";

export default function NotFound() {
  return (
    <MobileShell>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <BrandLogo size="lg" />
        <p className="mt-8 text-sm text-[var(--color-muted-foreground)]">
          このページは見つかりませんでした。
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 px-6 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold items-center"
        >
          ホームに戻る
        </Link>
      </div>
    </MobileShell>
  );
}
