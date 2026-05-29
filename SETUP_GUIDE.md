# Spark tax — Next.js 全画面構成セットアップガイド

このフォルダは、Spark tax（夜職特化の経費・税金アプリ）を **Next.js 15 (App Router) / TypeScript / Tailwind CSS v4** で書き直したものです。Vite + React 版と同じデザインで、以下の **全画面**を Next.js App Router 上で再現しています。

| 画面 | パス | 役割 |
| --- | --- | --- |
| ルート | `/` | 認証状態を見て `/login` または `/report` へリダイレクト |
| ログイン | `/login` | LINE（緑）/ Google（白枠）/ Apple（黒）3ボタン構成 |
| 新規登録 | `/signup` | 利用規約への同意つきサインアップ画面 |
| オンボーディング | `/onboarding` | 3ステップウィザード。Q01 申告区分・Q02 出勤ペースを選択 |
| レポート（ホームタブ） | `/report` | ドーナツチャート / カテゴリ別内訳 / 直近6ヶ月の推移バー |
| 領収書登録（中央カメラ） | `/capture` | 8カテゴリのグリッド・金額入力・撮影コツモーダル |
| マイページ | `/profile` | LINE/Google/Apple アカウント連携・各種メニュー |
| 絞り込み | `/expenses` | 期間 / 金額 / 取引内容 / 取引先名 のフィルタ Bottom Sheet |
| 基本情報 | `/profile/basic` | 表示名・メールアドレスの確認・編集 |
| 申告情報 | `/profile/filing` | 申告予定（白/青/未定）と出勤頻度の管理 |
| 税金シミュ | `/profile/tax` | 月別売上を入力 → 所得税・住民税・復興特別所得税の概算 |
| エクスポート | `/profile/export` | 経費データを CSV ダウンロード |
| よくある質問 | `/faq` | FAQ |
| お問い合わせ | `/contact` | メール・本文フォーム |
| お知らせ | `/news` | サンプル静的ニュース |
| 利用規約 | `/terms` | サンプル本文 |
| プライバシーポリシー | `/privacy` | サンプル本文 |
| 404 | `/_not-found` | App Router 用 not-found 画面 |

ブラウザ最下部には **BottomNav**（レポート / 領収書登録〔中央カメラボタン〕/ マイページ）が常に表示されます。アクセントカラーは **#2EC4B6**（ターコイズ）、英数字は **Lato**、日本語は **Noto Sans JP** を使用しています。

> 動作確認済み環境: macOS / Windows + Node.js 20 以上 + Cursor 最新版

---

## ステップ 0：事前準備（1 回だけ）

| 必要なもの | インストール方法 |
| --- | --- |
| Node.js（v20 以上） | [https://nodejs.org/](https://nodejs.org/) から LTS 版インストーラを実行 |
| pnpm | Cursor の下部ターミナルで `npm install -g pnpm` を実行 |
| Cursor | [https://www.cursor.com/](https://www.cursor.com/) からダウンロードして起動 |

---

## ステップ 1：プロジェクトを Cursor で開く

ZIP（`sparktax-next.zip`）を任意の場所に展開し、Cursor で **「File → Open Folder」** から展開後の `sparktax-next` フォルダを開きます。

左ツリーは次のようになっています（主要ファイルのみ抜粋）:

```
sparktax-next/
├ package.json
├ tsconfig.json
├ next.config.ts
├ postcss.config.mjs
├ dotenv.example.txt        ← .env にリネーム
├ prisma/
│  └ schema.prisma
├ public/icons/             ← 自作SVGアイコン
└ src/
   ├ components/
   │  ├ BottomNav.tsx       ← レポート / カメラ / マイページ
   │  ├ MobileShell.tsx
   │  ├ BrandLogo.tsx
   │  └ icons.tsx           ← 共通アイコン集
   ├ lib/
   │  ├ categories.ts       ← 8カテゴリ定義（色 / 絵文字 / ラベル）
   │  ├ format.ts
   │  ├ prisma.ts
   │  ├ anonId.ts
   │  └ beautyExpense.ts
   └ app/
      ├ globals.css         ← #2EC4B6 / Lato / Noto Sans JP / shadcn風変数
      ├ layout.tsx          ← フォント設定（Lato / Noto JP / Cormorant）
      ├ not-found.tsx
      ├ page.tsx            ← / ルート
      ├ login/page.tsx
      ├ signup/page.tsx
      ├ onboarding/
      │  ├ page.tsx
      │  ├ OnboardingWizard.tsx
      │  └ actions.ts
      ├ report/
      │  ├ page.tsx
      │  └ ReportContent.tsx   ← ドーナツ / カテゴリ / 月別バー
      ├ capture/
      │  ├ page.tsx
      │  └ CaptureClient.tsx   ← 経費入力 + 撮影コツモーダル
      ├ expenses/
      │  ├ page.tsx
      │  └ ExpensesClient.tsx  ← 絞り込み Bottom Sheet
      └ profile/page.tsx
```

---

## ステップ 2：依存パッケージのインストール

Cursor 下部のターミナルでプロジェクト直下にいることを確認してから、

```bash
pnpm install
```

を実行します。完了後、Prisma Client を生成しておきます。

```bash
pnpm prisma generate
```

---

## ステップ 3：環境設定ファイルを作る

`dotenv.example.txt` を **`.env`** にリネーム（先頭ドット）してください。中身はそのままで問題ありません。

```
DATABASE_URL="file:./prisma/dev.db"
```

ローカル動作確認では SQLite のままで OK です。本番環境で Postgres（Neon/Supabase など）に切り替えたい場合は、後述の「本番デプロイ」を参照してください。

---

## ステップ 4：データベース初期化

```bash
pnpm prisma db push
```

を実行すると、`prisma/dev.db` が作成され、`OnboardingAnswer` テーブルが用意されます。「🚀 Your database is now in sync」と表示されれば成功です。

---

## ステップ 5：開発サーバを起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、まず `/login` にリダイレクトされます。LINE/Google/Apple のいずれかをクリックすると `/onboarding` に進み、3ステップを完了すると `/report`（ホームタブ）に遷移します。

下部ナビゲーションから **レポート / 領収書登録（中央カメラ）/ マイページ** を切り替えられます。レポート画面右上の絞り込みアイコンから `/expenses`（絞り込み画面）に遷移します。

開発サーバを止めるには **Ctrl + C** を押します。

---

## ステップ 6：本番ビルド検証（重要）

ユーザー要望「`npm run build` でエラーが出ないようにしてください」に対応するため、`package.json` の build スクリプトには `NODE_ENV=production` を明示的に埋め込んでいます。次のコマンドだけで本番ビルドが通ります。

```bash
pnpm build
# あるいは
npm run build
```

Next.js 15.5 では `NODE_ENV=development` のままビルドすると `<Html> should not be imported outside of pages/_document.` という既知の警告が出るため、build スクリプト側で固定する形にしています。生成物は `.next/` 以下に出力されます。

ビルド後の起動は次のコマンドです。

```bash
pnpm start
```

---

## ステップ 7：デザイン仕様（Vite版と完全一致）

| 要素 | 値 |
| --- | --- |
| アクセントカラー | `#2EC4B6` （`--color-primary`） |
| プライマリ ソフト | `#E0F7F5` （ボタン淡色背景・チャート） |
| ピンク アクセント | `#F472B6` |
| 英数字フォント | **Lato**（400 / 700 / 900） |
| 日本語フォント | **Noto Sans JP**（400 / 500 / 700） |
| ロゴ装飾 | Cormorant Garamond Italic |
| 角丸 | rounded-2xl（カード）/ rounded-full（CTAボタン） |
| BottomNav 高さ | 72px、中央カメラボタンは 56×56px の浮かせデザイン |

カラーやフォントの値は `src/app/globals.css` の CSS 変数で集約管理しているので、トーン調整したい場合はここだけ書き換えれば全画面に反映されます。

---

## ステップ 8：本番デプロイ（公開）にしたいとき

1. プロジェクト全体を GitHub に push（Cursor のサイドバーから可能）
2. [Vercel](https://vercel.com/) で **New Project → GitHub から取り込み** を選択
3. 環境変数 `DATABASE_URL` に本番 DB の接続文字列を設定（推奨: Neon / Supabase の Postgres）
4. `prisma/schema.prisma` の `provider = "sqlite"` を `provider = "postgresql"` に書き換え、Vercel 側で `pnpm prisma db push` を実行
5. Deploy ボタンを押せば公開完了

---

## トラブルシューティング

| 症状 | 対処 |
| --- | --- |
| `pnpm: command not found` | ステップ 0 の `npm install -g pnpm` を実行 |
| `Cannot find module '@prisma/client'` | ターミナルで `pnpm install && pnpm prisma generate` |
| 画面が真っ白 | `.next` フォルダを削除して `pnpm dev` を再起動 |
| `<Html> should not be imported outside of pages/_document.` がビルド時に出る | `NODE_ENV=development` のままビルドしている可能性あり。`pnpm build` を使うか、`NODE_ENV=production npm run build` を使ってください |
| 「Cookies can only be modified…」エラー | `src/lib/anonId.ts` を書き換えないでください |
| Server Component から `localStorage` を読もうとしてエラー | レポート/経費入力/絞り込みは "use client" のクライアントコンポーネントです。Server Component から直接読まないようにしてください |

---

## 補足：Server Action と Prisma の安全な書き分け

このプロジェクトでは **DB 関連処理を Server Action（`"use server"`）に閉じ込める** 設計を維持しています。

- オンボーディングの保存ロジック: `src/app/onboarding/actions.ts`
- ブラウザは Server Action を呼ぶだけで、Prisma クライアントや `DATABASE_URL` は一切露出しません
- `anonId` Cookie はサーバー側のみが HttpOnly で書き込みます

レポート/経費入力/絞り込みの 3 画面は現時点ではサンプルデータでデザインを再現していますが、Server Action（`actions.ts`）と Prisma スキーマを増やすだけで、同じ仕組みで安全に永続化できます。

---

何か詰まったら、エラーメッセージの全文（赤字部分）を Cursor のチャットにそのまま貼り付けて「これを直してください」と聞くと、Cursor が自動で原因を教えてくれます。
