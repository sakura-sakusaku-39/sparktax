import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lato, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

/**
 * 英数字メインフォント。Vite版の "本文は Lato が映える" デザインを踏襲。
 * 太さは 400 / 700 を読み込んで bold 表現に十分な範囲を確保。
 */
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

/** 日本語フォント。本文・UI ラベルで使う。 */
const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

/** Spark tax ロゴ用の装飾フォント。タイトル箇所だけで使う。 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spark tax — 夜職特化の経費・税金アプリ",
  description: "経費をサクッと記録。Spark tax の Next.js 版。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2ec4b6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${lato.variable} ${notoJp.variable} ${cormorant.variable}`}>
      <body className="has-shell">{children}</body>
    </html>
  );
}
