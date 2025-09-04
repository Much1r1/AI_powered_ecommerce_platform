// src/services/openaiService.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // ⚠️ not safe for production
});

// Get a simple chat completion
export const getChatCompletion = async (message) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-3.5-turbo
      messages: [{ role: "user", content: message }],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "⚠️ Sorry, something went wrong.";
  }
};

// Generate contextual responses with history
export async function generateContextualResponse(userMessage, history = []) {
  try {
    const body = { message: userMessage, history };

    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errBody = await resp.json().catch(() => ({}));
      throw new Error(errBody?.error || `HTTP ${resp.status}`);
    }

    const data = await resp.json();
    // data.content should be a string
    console.log("Frontend received AI content (first 300 chars):", (data.content || "").slice(0, 300));
    return data.content ?? "";
  } catch (err) {
    console.error("generateContextualResponse error:", err);
    throw err;
  }
}
