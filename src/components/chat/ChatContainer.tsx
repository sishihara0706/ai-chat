"use client";

import { Trash2 } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";

export function ChatContainer() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

  return (
    <div className="flex flex-col h-full">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">AI Chat</h1>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearMessages} disabled={isLoading}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </header>
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 text-sm">
          Error: {error}
        </div>
      )}
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
