import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request. Messages are required." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        // {
        //   role: "system",
        //   content:
        //     "You are ReUpyog's AI assistant. Answer queries specifically about refurbished electronics, buy-back, repair clinics, and sustainability. Keep responses short and helpful.",
        // },
        {
  role: "system",
  content: `
You are ReUpyog's AI Assistant for https://reupyog.in.
Answer only about ReUpyog: refurbished products, buy-back, repair clinics, sustainability, orders/returns, and site help.
Be concise, friendly, and give step-by-step instructions when useful.
Prefer facts and links from reupyog.in (do not invent links). If unrelated, politely redirect to ReUpyog topics.`
},
        ...messages,
      ],
      temperature: 0.6,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content, // ✅ send only the text
    });
  } catch (error: any) {
    console.error("Error in chat route:", error);

    return NextResponse.json(
      {
        error:
          error.response?.data?.error?.message ||
          "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
