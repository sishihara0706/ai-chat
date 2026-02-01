import { describe, it, expect } from "vitest";
import type { ChatMessage, ChatRequest, ErrorResponse } from "@/types";

describe("Type definitions", () => {
  it("should allow valid ChatMessage with user role", () => {
    const message: ChatMessage = {
      role: "user",
      content: "Hello, AI!",
    };
    expect(message.role).toBe("user");
    expect(message.content).toBe("Hello, AI!");
  });

  it("should allow valid ChatMessage with assistant role", () => {
    const message: ChatMessage = {
      role: "assistant",
      content: "Hello! How can I help you?",
    };
    expect(message.role).toBe("assistant");
    expect(message.content).toBe("Hello! How can I help you?");
  });

  it("should allow valid ChatRequest", () => {
    const request: ChatRequest = {
      messages: [
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello!" },
      ],
    };
    expect(request.messages).toHaveLength(2);
  });

  it("should allow valid ErrorResponse", () => {
    const error: ErrorResponse = {
      error: "Something went wrong",
      message: "Detailed error message",
    };
    expect(error.error).toBe("Something went wrong");
    expect(error.message).toBe("Detailed error message");
  });

  it("should allow ErrorResponse without optional message", () => {
    const error: ErrorResponse = {
      error: "Error occurred",
    };
    expect(error.error).toBe("Error occurred");
    expect(error.message).toBeUndefined();
  });
});
