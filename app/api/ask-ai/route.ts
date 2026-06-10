import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in environment variables.");
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages } = await request.json();
    console.log("Received messages:", messages);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        systemInstruction: "You are a knowledgeable assistant specializing in Dasa Sahitya, the devotional literature of the Haridasaru of Karnataka. Provide accurate, insightful, and respectful answers based on Dvaita philosophy and the works of saints like Purandara Dasa and Kanaka Dasa. Keep your responses concise, focused on the query, and include relevant emojis to make the content feel more engaging and devotional."
    });

    // Format messages for Gemini and ensure alternating roles
    const history: any[] = [];
    let expectedRole = 'user';

    for (const m of messages.slice(0, -1)) {
        const role = m.role === 'user' ? 'user' : 'model';
        if (role === expectedRole) {
            history.push({
                role: role,
                parts: [{ text: m.content }],
            });
            expectedRole = role === 'user' ? 'model' : 'user';
        }
    }

    // Ensure the history ends with 'model' so the next message can be 'user'
    if (history.length > 0 && history[history.length - 1].role !== 'model') {
        history.pop();
    }

    const chat = model.startChat({
      history: history,
    });

    const userContent = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userContent);
    const response = await result.response;
    const text = response.text();
    console.log("AI Response:", text);
    
    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
  }
}
