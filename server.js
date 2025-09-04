// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // require .env has OPENAI_API_KEY

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.warn("Warning: OPENAI_API_KEY not found in environment!");
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Build messages for OpenAI API
    const messages = [
      { role: "system", content: "You are a helpful shopping assistant." },
      ...history.map((m) => ({
        role: m.type === "user" ? "user" : "assistant",
        content: m.content ?? m, // support both object and plain-string items
      })),
      { role: "user", content: message },
    ];

    // Call OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or change to your chosen model
      messages,
      max_tokens: 1500,
    });

    // Be robust: try multiple response shapes
    const content =
      response?.choices?.[0]?.message?.content ??
      response?.choices?.[0]?.text ??
      (typeof response === "string" ? response : "");

    console.log("OpenAI reply (truncated):", content?.slice(0, 400));

    res.json({ content });
  } catch (err) {
    console.error("Server /api/chat error:", err);
    res.status(500).json({ error: err?.message ?? "unknown error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`AI proxy server listening on http://localhost:${PORT}`));
