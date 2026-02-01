"use client";

import { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatMessage } from "@/types";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">AI Chat</p>
          <p className="text-sm">Send a message to start the conversation</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-4 p-4 rounded-lg bg-background">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-600 text-white">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="animate-pulse">...</span>
              </div>
            </div>
            <div className="flex-1">
              <span className="font-medium text-sm">Assistant</span>
              <div className="mt-1">
                <span className="inline-block w-2 h-4 bg-foreground/50 animate-pulse" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
