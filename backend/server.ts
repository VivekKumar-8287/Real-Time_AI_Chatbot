import WebSocket, { WebSocketServer } from 'ws';
import OpenAI from 'openai'; // We still use the OpenAI library!
import * as dotenv from 'dotenv';

dotenv.config();

// Groq uses the OpenAI library structure
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", 
});

const wss = new WebSocketServer({ port: 8080 });

console.log("🚀 Groq Server running on ws://localhost:8080");

wss.on('connection', (ws) => {
  console.log("✅ Client connected");

  ws.on('message', async (message) => {
    try {
      const parsed = JSON.parse(message.toString());
      
      const stream = await groq.chat.completions.create({
        // llama-3.3-70b-versatile is very fast and free
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: parsed.text }],
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'chunk', content }));
        }
      }

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'done' }));
      }

    } catch (error: any) {
      console.error("❌ Groq Error:", error.message);
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'error', content: error.message }));
      }
    }
  });

  ws.on('close', () => console.log("🔌 Client disconnected"));
});