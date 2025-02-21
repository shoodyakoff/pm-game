import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { analysis } = await req.json();

    if (!analysis || analysis.length < 10) {
      return NextResponse.json({ error: "Анализ слишком короткий." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API-ключ не найден. Проверь .env.local" }, { status: 500 });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: "Ты эксперт по маркетингу, оцени маркетинговый анализ пользователя." }, { role: "user", content: analysis }],
        temperature: 0.7
      })
    });

    const data = await openaiResponse.json();

    if (openaiResponse.ok) {
      return NextResponse.json({ feedback: data.choices[0].message.content });
    } else {
      return NextResponse.json({ error: data.error?.message || "Ошибка OpenAI" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Ошибка обработки запроса" }, { status: 500 });
  }
}
