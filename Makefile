# ============================================
# AI Chat - Makefile
# ============================================

# 変数
PROJECT_ID := $(shell gcloud config get-value project 2>/dev/null)
REGION := asia-northeast1
IMAGE_NAME := ai-chat
DOCKER_TAG := gcr.io/$(PROJECT_ID)/$(IMAGE_NAME)

# ============================================
# include
# ============================================
include .env

# ============================================
# 初期化
# ============================================

.PHONY: init
init: ## プロジェクト初期化（依存関係インストール）
	npm ci
	npx prisma generate

.PHONY: setup
setup: ## 初回セットアップ（init + 環境変数テンプレート作成）
	@make init
	@if [ ! -f .env.local ]; then cp .env.example .env.local; echo "Created .env.local"; fi
	@echo "Setup complete! Edit .env.local to add your API keys."

# ============================================
# 開発
# ============================================

.PHONY: dev
dev: ## 開発サーバー起動
	npm run dev

.PHONY: lint
lint: ## Lint実行
	npm run lint

.PHONY: format
format: ## コード整形
	npm run format

.PHONY: type-check
type-check: ## 型チェック
	npm run type-check

.PHONY: test
test: ## テスト実行
	npm run test

.PHONY: test-watch
test-watch: ## テスト（ウォッチモード）
	npm run test:watch

# ============================================
# ビルド
# ============================================

.PHONY: build
build: ## Next.jsビルド
	npm run build

.PHONY: start
start: ## 本番モードで起動
	npm run start

# ============================================
# Docker（ローカル）
# ============================================

.PHONY: docker-build
docker-build: ## Dockerイメージをビルド
	docker build -t $(IMAGE_NAME) .

.PHONY: docker-up
docker-up: ## Docker Compose起動
	docker compose up -d

.PHONY: docker-down
docker-down: ## Docker Compose停止
	docker compose down

.PHONY: docker-logs
docker-logs: ## Dockerログ表示
	docker compose logs -f app

.PHONY: docker-clean
docker-clean: ## Dockerリソース削除
	docker compose down -v --rmi local

# ============================================
# Google Cloud Run デプロイ
# ============================================

.PHONY: gcloud-check
gcloud-check: ## GCloud設定確認
	@echo "Project: $(PROJECT_ID)"
	@echo "Region: $(REGION)"
	@gcloud billing projects describe $(PROJECT_ID) 2>/dev/null || echo "Billing not configured"

.PHONY: gcloud-enable-apis
gcloud-enable-apis: ## 必要なAPIを有効化
	gcloud services enable cloudbuild.googleapis.com
	gcloud services enable run.googleapis.com
	gcloud services enable artifactregistry.googleapis.com

.PHONY: gcloud-build
gcloud-build: ## Cloud Buildでイメージをビルド
	gcloud builds submit --tag $(DOCKER_TAG)

.PHONY: gcloud-deploy
gcloud-deploy: ## Cloud Runにデプロイ
	@read -p "Enter ANTHROPIC_API_KEY: " API_KEY; \
	gcloud run deploy $(IMAGE_NAME) \
		--image $(DOCKER_TAG) \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--set-env-vars "ANTHROPIC_API_KEY=$$API_KEY,NODE_ENV=production"

.PHONY: gcloud-deploy-full
gcloud-deploy-full: gcloud-enable-apis gcloud-build gcloud-deploy ## フルデプロイ（API有効化→ビルド→デプロイ）

.PHONY: gcloud-url
gcloud-url: ## デプロイ済みサービスのURLを表示
	@gcloud run services describe $(IMAGE_NAME) --region $(REGION) --format="value(status.url)"

.PHONY: gcloud-delete
gcloud-delete: ## Cloud Runサービスを削除
	gcloud run services delete $(IMAGE_NAME) --region $(REGION)

# ============================================
# データベース
# ============================================

.PHONY: db-generate
db-generate: ## Prismaクライアント生成
	npx prisma generate

.PHONY: db-push
db-push: ## スキーマをDBに反映
	npx prisma db push

.PHONY: db-studio
db-studio: ## Prisma Studio起動
	npx prisma studio

# ============================================
# ヘルプ
# ============================================

.PHONY: help
help: ## ヘルプ表示
	@echo "使用可能なコマンド:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
