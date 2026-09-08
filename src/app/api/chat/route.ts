import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

// Support chatbot backend. The API key stays server-side (never NEXT_PUBLIC_*).
// Set ANTHROPIC_API_KEY in apps/web/.env.local and restart `npm run dev`.
// To use a cheaper model for support chat, change MODEL to "claude-haiku-4-5".
const MODEL = "claude-opus-5";

const SYSTEM_PROMPT = `You are the Rentlet support assistant, embedded in a chat widget on the Rentlet website.

Rentlet is an Indian property rental marketplace (rent, buy, land/plots, PG/hostel, flatmates, commercial). Key things you can help with:
- Searching properties: the /properties page has filters (city, price, BHK, property type, amenities) plus a "nearest first" option.
- Posting a property: the "Post Property" button opens a short form, then a 12-step wizard. Listing is free (zero brokerage). Approved listings get a Verified badge.
- Scheduling a visit / contacting an owner from any property page (Call, WhatsApp, Chat, Schedule Visit).
- Saved properties, saved searches, site visits, and messages live in the user's account.
- Owners get a dashboard with leads, visits, analytics and subscription plans.

Rules:
- Keep answers short and practical — 1 to 3 sentences, plain text (no markdown headings).
- This is a demo site: do NOT invent specific listings, prices, phone numbers, or availability. Point the user to the relevant page or button instead.
- If a question is outside real estate / Rentlet, answer briefly and steer back.
- If you don't know, say so and suggest the Help Center or Contact page.`;

type IncomingMessage = { from: "bot" | "user"; text: string };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        "The live assistant isn't configured yet. Meanwhile: use the Search page to browse listings, or the Post Property button to list one. For anything else, the Help Center and Contact page are linked below.",
    });
  }

  let history: IncomingMessage[] = [];
  try {
    const body = (await req.json()) as { messages?: IncomingMessage[] };
    history = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages: Anthropic.MessageParam[] = history
    .filter((m) => m.text?.trim())
    .slice(-12) // keep the last few turns
    .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

  if (messages.length === 0 || messages[0].role !== "user") {
    return NextResponse.json({ error: "Conversation must start with a user message." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      output_config: { effort: "low" },
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || "Sorry, I didn't catch that — could you rephrase?" });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "Assistant auth failed — check ANTHROPIC_API_KEY." }, { status: 502 });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "The assistant is busy right now. Try again in a moment." }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `Assistant error (${error.status}).` }, { status: 502 });
    }
    return NextResponse.json({ error: "Couldn't reach the assistant." }, { status: 500 });
  }
}
