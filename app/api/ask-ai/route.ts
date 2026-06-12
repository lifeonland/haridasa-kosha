import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Using API Key starting with:", apiKey ? apiKey.substring(0, 5) : "undefined");
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in environment variables.");
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages } = await request.json();
    console.log("Received messages:", messages);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-3.1-flash-lite",
        systemInstruction: "You are a knowledgeable assistant specializing in Dasa Sahitya. Provide accurate, highly concise, and clear answers. Use bullet points for readability. Avoid lengthy introductions or conclusions. Maximum 3-4 sentences."
    });

    // Format messages for Gemini and ensure alternating roles
    const history: any[] = [];
    
    // Filter to only include user and assistant messages, mapping to 'user'/'model'
    for (const m of messages.slice(0, -1)) {
        const role = m.role === 'user' ? 'user' : 'model';
        const text = typeof m.content === 'string' ? m.content : JSON.stringify(m.content);
        
        // Ensure history starts with 'user'
        if (history.length === 0 && role === 'model') continue;
        
        history.push({
            role: role,
            parts: [{ text: text }],
        });
    }

    const chat = model.startChat({
      history: history,
    });

    const userContent = typeof messages[messages.length - 1].content === 'string' 
        ? messages[messages.length - 1].content 
        : JSON.stringify(messages[messages.length - 1].content);
        
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
