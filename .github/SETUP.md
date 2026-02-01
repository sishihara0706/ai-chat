# GitHub Actions セットアップガイド

## 必要な設定

### 1. ANTHROPIC_API_KEY の設定

1. GitHubリポジトリの **Settings** → **Secrets and variables** → **Actions** に移動
2. **New repository secret** をクリック
3. 以下を入力：
   - **Name**: `ANTHROPIC_API_KEY`
   - **Secret**: あなたのAnthropic APIキー
4. **Add secret** をクリック

### 2. GitHub App のインストール確認

1. リポジトリの **Settings** → **Installed GitHub Apps** で「Claude」が表示されているか確認
2. 表示されていない場合は、ローカルで `/install-github-app` コマンドを再実行

### 3. GitHub Actions の有効化確認

1. リポジトリの **Settings** → **Actions** → **General**
2. **Actions permissions** が有効になっているか確認

## 使い方

### Issue/PRコメントで Claude を呼び出す

**Issue コメント:**
```
@claude このIssueを実装してください
```

**PR コメント:**
```
@claude このPRをレビューしてください
```

**Issue 本文:**
Issue作成時に本文に `@claude` を含めることも可能

### 動作確認

1. Issue #1 のコメント欄に `@claude test` とコメント
2. GitHub Actionsタブでワークフローが起動することを確認
3. Claudeからの返信がコメントで追加される

## トラブルシューティング

### ワークフローが起動しない場合

- [ ] `@claude` とメンション（`/claude` ではない）
- [ ] ANTHROPIC_API_KEY がシークレットに設定されているか確認
- [ ] GitHub App がインストールされているか確認
- [ ] Actions が有効になっているか確認

### ワークフローが失敗する場合

- Actionsタブでログを確認
- ANTHROPIC_API_KEY の値が正しいか確認

## 参考リンク

- [Claude Code GitHub Actions ドキュメント](https://code.claude.com/docs/en/github-actions.md)
- [Claude Code Action リポジトリ](https://github.com/anthropics/claude-code-action)
