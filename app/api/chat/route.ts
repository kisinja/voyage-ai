// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { groqChatStream, groqChat, GroqMessage } from "@/lib/ai/groq";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, tripContext, stream = true } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const systemMessage: GroqMessage = {
      role: "system",
      content: `You are an elite travel concierge AI assistant with deep local knowledge. You are helping a traveler with their trip.

${tripContext ? `CURRENT TRIP CONTEXT:\n${JSON.stringify(tripContext, null, 2)}` : ""}

You are:
- Specific and actionable (real names, real addresses, real prices when you know them)
- Conversational and warm
- An insider who knows the hidden spots tourists miss
- Always helpful with logistics, alternatives, and insider tips

Keep responses concise (2-4 paragraphs max or a short bullet list). Format nicely with line breaks.`,
    };

    const groqMessages: GroqMessage[] = [
      systemMessage,
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    if (stream) {
      const streamResponse = await groqChatStream(groqMessages, {
        temperature: 0.8,
        max_tokens: 1024,
      });

      // Return as SSE stream
      return new Response(streamResponse, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      const response = await groqChat(groqMessages, {
        temperature: 0.8,
        max_tokens: 1024,
      });

      return NextResponse.json({ message: response });
    }
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Chat failed" },
      { status: 500 }
    );
  }
}
