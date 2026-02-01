import { Hono } from "hono";
import { handle } from "hono/vercel";
import { streamText } from "hono/streaming";
import { mastra } from "@/lib/mastra";

const app = new Hono().basePath("/api");

// ヘルスチェックエンドポイント
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// チャットエンドポイント（ストリーミング対応）
app.post("/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: "messages is required and must be an array" }, 400);
    }

    const agent = mastra.getAgent("chatAgent");

    // ストリーミングレスポンスを返す
    return streamText(c, async (stream) => {
      const response = await agent.stream(messages);

      for await (const chunk of response.textStream) {
        await stream.write(chunk);
      }
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export const GET = handle(app);
export const POST = handle(app);
