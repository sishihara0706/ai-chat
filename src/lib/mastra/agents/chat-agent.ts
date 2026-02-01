import { Agent } from "@mastra/core/agent";

export const chatAgent = new Agent({
  id: "chatAgent",
  name: "Chat Agent",
  instructions: `あなたは親切で知識豊富なAIアシスタントです。
ユーザーの質問に対して、正確で分かりやすい回答を提供してください。

以下のガイドラインに従ってください：
- 日本語で回答する場合は自然な日本語を使用してください
- コードを含む回答の場合は、適切なマークダウン形式でコードブロックを使用してください
- 不明な点がある場合は、正直にその旨を伝えてください
- 回答は簡潔かつ的確に行ってください`,
  model: "anthropic/claude-sonnet-4-20250514",
});
