## Next.js全画面移植（Vite版と同一デザイン）

- [x] Vite版の各画面ソース（Home/Onboarding/Capture/Expenses/Profile/TaxSimulation/App.tsx/index.css）を精査
- [x] Next.js グローバルCSS にアクセント#2EC4B6・Lato・Noto Sans JP・shadcn風変数を反映
- [x] BottomNav（レポート/カメラ/マイページ）を `src/components/BottomNav.tsx` で実装
- [x] `MobileShell` で BottomNav 込みのアプリレイアウトを構築
- [x] ログイン画面 `/login`（LINE緑/Google白枠/Apple黒）を実装
- [x] 新規登録画面 `/signup` を実装
- [x] オンボーディング画面のデザインをVite版に合わせて改善（3ステップ・進捗・チェック）
- [x] レポート画面 `/report` をドーナツ・カテゴリ・月別バー付きで実装
- [x] 経費入力画面 `/capture` をカテゴリ8グリッド・金額入力・撮影コツモーダル付きで実装
- [x] マイページ `/profile`（アカウント連携・メニューリスト）を実装
- [x] 絞り込み画面 `/expenses` をフィルタBottomSheet付きで実装
- [x] `not-found.tsx` を App Router 用に追加
- [x] `npm run build` 成功を確認 (Next.js 15.5.18, NODE_ENV=production)
- [x] SETUP_GUIDE.md を全画面構成版に更新
- [x] sparktax-next.zip を再生成

## マイページ遷移先ページ移植

- [ ] 共通 `<PageShell>` コンポーネント（戻るボタン付きヘッダー）
- [ ] `/profile/basic` 基本情報の確認・編集（表示名・メール）
- [ ] `/profile/filing` 申告情報の管理（申告予定・出勤頻度）
- [ ] `/profile/tax` 税金シミュレーション（簡易版・年セレクタ・月別バー・概算サマリ）
- [ ] `/profile/export` データのエクスポート（CSVダウンロード）
- [ ] `/faq` よくある質問
- [ ] `/contact` お問い合わせ（メール・本文）
- [ ] `/news` お知らせ
- [ ] `/terms` 利用規約
- [ ] `/privacy` プライバシーポリシー
- [ ] Profile からのリンクを上記の Next.js ルートに合わせて修正
- [ ] `npm run build` 通過確認
- [ ] ZIP 再生成
