"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useAiChat } from "@/hooks/use-ai";
import { useAiChatStore } from "@/store/ai-chat-store";
import { AiProductSuggestionCard } from "./ai-product-suggestion-card";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
};

const starterPrompts = [
  "Show me top-selling products",
  "Help me find a good product under $100",
  "What should I buy as a gift?",
  "How does checkout work?",
];

export function AiChatWidget() {
  const { isOpen, toggleChat, closeChat } = useAiChatStore();
  const aiChatMutation = useAiChat();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I’m Nexa AI. I can help you find top-selling products, compare options, answer shopping questions, and guide you through checkout.",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiChatMutation.isPending, isOpen]);

  const sendMessage = async (messageText?: string) => {
    const message = (messageText || input).trim();

    if (!message) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");

    const response = await aiChatMutation.mutateAsync(message);

    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        response.data?.answer ||
        "I found some information, but could not generate a full response.",
      products: response.data?.products || [],
    };

    setMessages((previous) => [...previous, assistantMessage]);
  };

  return (
    <>
      <Button
        type="button"
        onClick={toggleChat}
        className={cn(
          "fixed bottom-4 right-4 z-50 h-12 rounded-full px-4 shadow-2xl sm:bottom-6 sm:right-6",
          "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? (
          <X className="mr-2 h-5 w-5" />
        ) : (
          <MessageCircle className="mr-2 h-5 w-5" />
        )}
        {isOpen ? "Close AI" : "Ask AI"}
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-3 z-50 w-[calc(100vw-1.5rem)] max-w-[360px] overflow-hidden rounded-[1.75rem] border border-border bg-background/95 shadow-2xl backdrop-blur-2xl sm:bottom-24 sm:right-6 sm:max-w-[380px]">
          <div className="flex items-center justify-between border-b border-border p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">Nexa AI Assistant</h2>
                <p className="text-xs text-muted-foreground">
                  Shopping support online
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={closeChat}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-[50vh] min-h-[250px] max-h-[360px] overflow-y-auto p-3 custom-scrollbar">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-[1.25rem] p-3 text-sm leading-6",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card/80"
                    )}
                  >
                    <p>{message.content}</p>

                    {message.products && message.products.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {message.products.slice(0, 3).map((product) => (
                          <AiProductSuggestionCard
                            key={product.id}
                            product={product}
                            onNavigate={closeChat}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {aiChatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-[1.5rem] border border-border bg-card/80 p-4 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={aiChatMutation.isPending}
                  className="shrink-0 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about products, support, or checkout..."
                className="min-h-10 resize-none rounded-[1.25rem] bg-background/70 p-3 text-sm"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <Button
                type="button"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-full"
                disabled={aiChatMutation.isPending || !input.trim()}
                onClick={() => sendMessage()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}