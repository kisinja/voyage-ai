// components/chat-sidebar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface ChatSidebarProps {
  tripContext?: object;
}

const QUICK_QUESTIONS = [
  "What should we do tonight?",
  "Find cheaper restaurants",
  "Best local markets nearby",
  "Hidden gems off the tourist trail",
  "Best rooftop bars",
  "How to get around cheaply?",
];

export default function ChatSidebar({ tripContext }: ChatSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm your AI travel concierge 🌍 I know everything about your trip. Ask me anything — best spots tonight, cheaper alternatives, hidden gems, logistics... I've got you.",
      id: "welcome",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          tripContext,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Chat failed");

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullContent += delta;
                  setStreamingContent(fullContent);
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: fullContent || "I had trouble responding. Try again!",
        id: Date.now().toString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I hit a snag. Check your connection and try again.",
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setStreamingContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-teal-400 text-zinc-950 font-bold text-sm shadow-2xl shadow-teal-400/30 hover:bg-teal-300 transition-colors ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <MessageCircle className="w-4 h-4" />
        Ask AI Concierge
        <motion.span
          className="w-2 h-2 rounded-full bg-zinc-950/30"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-zinc-950" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      AI Concierge
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <p className="text-zinc-500 text-xs">Online · Powered by Groq</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}

                {/* Streaming bubble */}
                {isLoading && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-400/20 to-sky-400/20 border border-teal-400/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      {streamingContent ? (
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                          {streamingContent}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="inline-block w-0.5 h-4 bg-teal-400 ml-0.5 align-middle"
                          />
                        </p>
                      ) : (
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-teal-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-3">
                  <p className="text-zinc-500 text-xs mb-2 font-medium">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2 bg-zinc-800 rounded-xl border border-zinc-700 focus-within:border-teal-400/50 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about your trip..."
                    className="flex-1 bg-transparent px-4 py-3 text-white text-sm placeholder:text-zinc-500 outline-none"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="mr-2 w-8 h-8 flex items-center justify-center rounded-lg bg-teal-400 disabled:bg-zinc-700 text-zinc-950 disabled:text-zinc-500 transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-400/20 to-sky-400/20 border border-teal-400/20 flex items-center justify-center flex-shrink-0">
          <Bot className="w-3.5 h-3.5 text-teal-400" />
        </div>
      )}
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-teal-400 text-zinc-950 rounded-tr-sm font-medium"
            : "bg-zinc-800 text-white rounded-tl-sm"
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
          <User className="w-3.5 h-3.5 text-zinc-400" />
        </div>
      )}
    </div>
  );
}
