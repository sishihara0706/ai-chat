# AI Chat - プロジェクト仕様書

## プロジェクト概要

シンプルなAIチャットアプリケーション。Claude APIを使用したリアルタイムストリーミング対応のチャットUI。

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14+ (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **状態管理**: React hooks (useState, useEffect)
- **Markdown**: react-markdown + remark-gfm
- **コードハイライト**: react-syntax-highlighter または shiki

### バックエンド
- **APIフレームワーク**: Hono (Next.js API Routes内で使用)
- **ORM**: Prisma
- **データベース**: MongoDB
- **AIエージェント**: Mastra
- **AI API**: Claude API (Anthropic)

### インフラ
- **デプロイ**: Google Cloud Run
- **コンテナ**: Docker

### テスト
- **テストフレームワーク**: Vitest
- **方針**: 最小限（重要なAPIエンドポイントとユーティリティ関数のみ）

## ディレクトリ構成

```
ai-chat/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # チャットページ
│   │   └── api/
│   │       └── [...route]/
│   │           └── route.ts    # Hono APIルート
│   ├── components/
│   │   ├── ui/                 # shadcn/uiコンポーネント
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── CopyButton.tsx
│   │   └── markdown/
│   │       └── MarkdownRenderer.tsx
│   ├── lib/
│   │   ├── mastra/             # Mastra設定
│   │   │   ├── index.ts
│   │   │   └── agents/
│   │   │       └── chat-agent.ts
│   │   ├── prisma.ts           # Prismaクライアント
│   │   └── utils.ts            # ユーティリティ関数
│   ├── hooks/
│   │   └── useChat.ts          # チャット用カスタムフック
│   └── types/
│       └── index.ts            # 型定義
├── prisma/
│   └── schema.prisma           # Prismaスキーマ
├── public/
├── tests/                      # テストファイル
├── .env.local                  # 環境変数（ローカル）
├── .env.example                # 環境変数テンプレート
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## 主要機能

### チャット機能
- ストリーミングレスポンス（リアルタイム文字表示）
- Markdownレンダリング（GFM対応）
- コードブロックのシンタックスハイライト
- メッセージ・コードブロックのコピーボタン

### UI/UX
- レスポンシブデザイン
- ダークモード対応（shadcn/uiのテーマ機能）
- ローディング状態の表示
- エラーハンドリングとユーザーフィードバック

## API設計

### POST /api/chat
チャットメッセージを送信し、AIからのストリーミングレスポンスを受け取る

**リクエスト:**
```json
{
  "messages": [
    { "role": "user", "content": "こんにちは" }
  ]
}
```

**レスポンス:** Server-Sent Events (SSE) によるストリーミング

## 環境変数

```env
# AI API
ANTHROPIC_API_KEY=your_anthropic_api_key

# Database (MongoDB)
DATABASE_URL=mongodb://localhost:27017/ai-chat

# App
NODE_ENV=development
```

## コーディング規約

### 全般
- TypeScript strict modeを使用
- ESLint + Prettierでコード整形
- 関数コンポーネントとhooksを使用（クラスコンポーネント禁止）
- 型定義は明示的に行う（any禁止）

### 命名規則
- コンポーネント: PascalCase (例: ChatContainer.tsx)
- 関数・変数: camelCase (例: handleSubmit)
- 定数: UPPER_SNAKE_CASE (例: MAX_TOKENS)
- 型・インターフェース: PascalCase (例: ChatMessage)

### ファイル構成
- 1ファイル1コンポーネントを基本とする
- 関連するコンポーネントは同一ディレクトリにまとめる
- ユーティリティ関数は`lib/`に配置

## テストコード作成時の厳守事項

### テストコードの品質
- テストは必ず実際の機能を検証すること
- `expect(true).toBe(true)`のような意味のないアサーションは絶対に書かない
- 各テストケースは具体的な入力と期待される出力を検証すること
- モックは必要最小限にとどめ、実際の動作に近い形でテストすること

### ハードコーディングの禁止
- テストを通すためだけのハードコードは絶対に禁止
- 本番コードに`if (testMode)`のような条件分岐を入れない
- テスト用の特別な値（マジックナンバー）を本番コードに埋め込まない
- 環境変数や設定ファイルを使用して、テスト環境と本番環境を適切に分離すること

### テスト実装の原則
- テストが失敗する状態から始めること（Red-Green-Refactor）
- 境界値、異常系、エラーケースも必ずテストすること
- テストケース名は何をテストしているか明確に記述すること

## 開発コマンド

Makefileを使用してコマンドを実行できます。`make help` で全コマンド一覧を表示。

### 初期化・セットアップ

```bash
make setup              # 初回セットアップ（依存関係 + 環境変数テンプレート）
make init               # 依存関係インストールのみ
```

### 開発

```bash
make dev                # 開発サーバー起動
make lint               # Lint実行
make format             # コード整形
make type-check         # 型チェック
make test               # テスト実行
make test-watch         # テスト（ウォッチモード）
```

### ビルド

```bash
make build              # Next.jsビルド
make start              # 本番モードで起動
```

### Docker（ローカル）

```bash
make docker-build       # Dockerイメージをビルド
make docker-up          # Docker Compose起動（アプリ + MongoDB）
make docker-down        # Docker Compose停止
make docker-logs        # Dockerログ表示
make docker-clean       # Dockerリソース削除
```

### データベース

```bash
make db-generate        # Prismaクライアント生成
make db-push            # スキーマをDBに反映
make db-studio          # Prisma Studio起動
```

### Google Cloud Run デプロイ

```bash
make gcloud-check       # GCloud設定・課金確認
make gcloud-enable-apis # 必要なAPIを有効化
make gcloud-build       # Cloud Buildでイメージをビルド
make gcloud-deploy      # Cloud Runにデプロイ
make gcloud-deploy-full # フルデプロイ（API有効化→ビルド→デプロイ）
make gcloud-url         # デプロイ済みサービスのURLを表示
make gcloud-delete      # Cloud Runサービスを削除
```

## デプロイ

### Google Cloud Run

#### 前提条件
- Google Cloud CLIのインストール (`gcloud`)
- 課金アカウントの設定
- プロジェクトの作成

#### デプロイ手順

```bash
# 1. GCloud設定確認
make gcloud-check

# 2. フルデプロイ（API有効化 → ビルド → デプロイ）
make gcloud-deploy-full

# 3. デプロイ先URLを確認
make gcloud-url
```

#### 個別実行する場合

```bash
# APIを有効化
make gcloud-enable-apis

# Cloud Buildでイメージをビルド
make gcloud-build

# Cloud Runにデプロイ（APIキーの入力を求められる）
make gcloud-deploy
```

## 注意事項

- 履歴保存機能は実装しない（セッション内のみ）
- ユーザー認証は実装しない（個人利用前提）
- APIキーは環境変数で管理し、絶対にコミットしない
- MongoDBは開発時はローカル、本番はMongoDB Atlasを推奨
