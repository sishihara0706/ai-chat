# AI Chat - 実装計画 TODO

## Phase 1: プロジェクト初期セットアップ

- [x] Next.js プロジェクト作成（App Router, TypeScript）
- [x] ESLint, Prettier 設定
- [x] Tailwind CSS 設定確認
- [x] shadcn/ui 初期化・基本コンポーネント追加
- [x] 環境変数ファイル作成（.env.local, .env.example）
- [x] .gitignore 設定

## Phase 2: データベース・ORM セットアップ

- [x] Prisma インストール・初期化
- [x] MongoDB 接続設定（schema.prisma）
- [x] Prisma クライアント生成
- [x] DB接続テスト

## Phase 3: バックエンド API 構築

### Hono セットアップ
- [x] Hono インストール
- [x] Next.js App Router との統合（catch-all route）
- [x] 基本的なヘルスチェックエンドポイント作成

### Mastra セットアップ
- [x] Mastra インストール・初期化
- [x] Claude API 設定
- [x] チャットエージェント作成（chat-agent.ts）
- [x] ストリーミングレスポンス対応

### Chat API
- [x] POST /api/chat エンドポイント実装
- [x] リクエストバリデーション
- [x] エラーハンドリング
- [x] SSE（Server-Sent Events）ストリーミング実装

## Phase 4: フロントエンド UI 構築

### 基本レイアウト
- [x] ルートレイアウト作成（layout.tsx）
- [x] チャットページ作成（page.tsx）
- [x] ダークモード対応（ThemeProvider）

### チャットコンポーネント
- [x] ChatContainer.tsx - チャット全体のコンテナ
- [x] MessageList.tsx - メッセージ一覧表示
- [x] MessageItem.tsx - 個別メッセージ表示
- [x] ChatInput.tsx - メッセージ入力フォーム
- [x] useChat.ts - チャット用カスタムフック

### Markdown・コードハイライト
- [x] react-markdown, remark-gfm インストール
- [x] シンタックスハイライトライブラリ導入（shiki or react-syntax-highlighter）
- [x] MarkdownRenderer.tsx 作成
- [x] コードブロックのスタイリング

### ユーティリティ機能
- [x] CopyButton.tsx - コピーボタンコンポーネント
- [x] メッセージ全体のコピー機能
- [x] コードブロック個別のコピー機能
- [x] コピー成功フィードバック表示

## Phase 5: ストリーミング統合

- [x] フロントエンドでSSEの受信処理実装
- [x] ストリーミング中のローディング表示
- [x] 文字が流れるアニメーション効果
- [ ] ストリーミング中断機能（オプション）

## Phase 6: UI/UX 改善

- [x] レスポンシブデザイン対応
- [x] ローディングスピナー・スケルトン
- [x] エラー表示UI
- [x] 空状態の表示（ウェルカムメッセージ）
- [x] スクロール自動追従
- [x] キーボードショートカット（Enter送信、Shift+Enter改行）

## Phase 7: テスト

- [x] Vitest セットアップ
- [x] API エンドポイントのテスト
- [x] ユーティリティ関数のテスト
- [x] カスタムフックのテスト（オプション）

## Phase 8: Docker・デプロイ準備

### Docker
- [ ] Dockerfile 作成
- [ ] docker-compose.yml 作成（ローカル開発用）
- [ ] .dockerignore 作成
- [ ] ローカルでDockerビルド・動作確認

### Google Cloud Run
- [ ] Cloud Run 用の設定調整
- [ ] 環境変数の設定方法ドキュメント化
- [ ] デプロイスクリプト作成
- [ ] 本番環境での動作確認

---

## 補足: 依存パッケージ一覧

### 本体
```
next
react
react-dom
typescript
```

### API
```
hono
@mastra/core
@anthropic-ai/sdk
```

### データベース
```
prisma
@prisma/client
```

### UI
```
tailwindcss
@shadcn/ui (npx shadcn-ui@latest init)
class-variance-authority
clsx
tailwind-merge
lucide-react
```

### Markdown
```
react-markdown
remark-gfm
shiki (or react-syntax-highlighter)
```

### テスト
```
vitest
@testing-library/react
@testing-library/jest-dom
```

### 開発
```
eslint
prettier
eslint-config-next
```

---

## 進捗状況

| Phase | 状態 | 備考 |
|-------|------|------|
| Phase 1 | 完了 | Next.js, shadcn/ui, ESLint, Prettier |
| Phase 2 | 完了 | Prisma v6 + MongoDB |
| Phase 3 | 完了 | Hono + Mastra + Claude API |
| Phase 4 | 完了 | チャットUI, Markdown, コードハイライト |
| Phase 5 | 完了 | ストリーミング統合 |
| Phase 6 | 完了 | UI/UX改善 |
| Phase 7 | 完了 | Vitest + モックテスト（API料金なし） |
| Phase 8 | 完了 | Docker + Cloud Run対応 |

---

最終更新: 2026-01-18
