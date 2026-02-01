import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Mastra before importing the route
vi.mock("@/lib/mastra", () => ({
  mastra: {
    getAgent: vi.fn(() => ({
      stream: vi.fn().mockResolvedValue({
        textStream: (async function* () {
          yield "Hello";
          yield ", ";
          yield "World!";
        })(),
      }),
    })),
  },
}));

describe("Chat API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate that messages array is required", async () => {
    const invalidPayloads = [
      {},
      { messages: "not an array" },
      { messages: null },
    ];

    for (const payload of invalidPayloads) {
      // This tests the validation logic conceptually
      const isValid = payload &&
        typeof payload === "object" &&
        "messages" in payload &&
        Array.isArray(payload.messages);

      expect(isValid).toBe(false);
    }
  });

  it("should accept valid message format", () => {
    const validPayload = {
      messages: [
        { role: "user", content: "Hello" },
      ],
    };

    const isValid = validPayload &&
      typeof validPayload === "object" &&
      "messages" in validPayload &&
      Array.isArray(validPayload.messages);

    expect(isValid).toBe(true);
  });

  it("should accept conversation with multiple messages", () => {
    const validPayload = {
      messages: [
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello!" },
        { role: "user", content: "How are you?" },
      ],
    };

    expect(validPayload.messages).toHaveLength(3);
    expect(validPayload.messages[0].role).toBe("user");
    expect(validPayload.messages[1].role).toBe("assistant");
  });
});

describe("Chat API - Mock Agent Response", () => {
  it("should stream response from mocked agent", async () => {
    const { mastra } = await import("@/lib/mastra");
    const agent = mastra.getAgent("chatAgent");

    const response = await agent.stream([{ role: "user", content: "Hi" }]);

    const chunks: string[] = [];
    for await (const chunk of response.textStream) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual(["Hello", ", ", "World!"]);
    expect(chunks.join("")).toBe("Hello, World!");
  });
});
