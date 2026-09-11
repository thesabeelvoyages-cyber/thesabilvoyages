import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parsed requests
app.use(express.json());

// Initialize Gemini Client with correct metadata header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in your environment/secrets. Please declare it to activate the AI Support Chatbot.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint for AI chat bot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid parameters. 'messages' array is required." });
    }

    const ai = getGeminiClient();

    // Map conversation logs to correct Gemini SDK format
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = 
      "You are the official Sabil Voyages AI Concierge, a dedicated digital assistant for " +
      "The Sabil Voyages—Srinagar's leading bespoke travel bureau specializing in curated Kashmir luxury " +
      "itineraries, family packages, high-end safaris, and honeymoon escapes.\n\n" +
      "YOUR PERSONALITY:\n" +
      "- Highly welcoming, hospitable, peaceful, and polite. Greet visitors with \"Assalamu Alaikum\" (May peace be upon you) or other classic warm Kashmiri hospitality greetings.\n" +
      "- Highly professional, fluent, and descriptive but structured.\n\n" +
      "YOUR TRAVEL DIRECTORY DATA:\n" +
      "- Location Base: Srinagar, Jammu & Kashmir. Head office near Dal Lake.\n" +
      "- Chief Director: Mr. Ssammer Hussain Bhat. Contact email: ssammerhussain@gmail.com.\n" +
      "- Destinations Covered: Srinagar (Shikara rides, houseboats, Mughal Gardens), Gulmarg (skiing, Gondola cable car ride phases 1 & 2), Pahalgam (Aru Valley, Betaab Valley, Lidder river rafting, pony tracks), Sonamarg (Thajiwas Glacier, trekking), Yusmarg, Gurez Valley.\n" +
      "- Key Offerings: Traditional Kehwa tea welcoming, boutique houseboats, 5-star resort selection, private deluxe vehicles (such as Innova Crysta / Tempo Traveller) with experienced safe mountain drivers, premium Shikara rides, and streamlined pre-purchased Gondola ticket layouts.\n\n" +
      "HOW TO ASSIST:\n" +
      "- Use concise bullet points and bold subtitles so text is readable in a compact floating chat balloon.\n" +
      "- If a traveler asks to design a custom schedule, pricing quotes, or book a safari, enthusiastically encourage them to fill the 'Bespoke Itinerary Form' on our website or click our direct 'WhatsApp Support' option.\n" +
      "- Be realistic about seasonal pricing (e.g. spring tulip festival in April, mountain snowfall in Gulmarg from Jan-March, green meadows from June-September).\n" +
      "- Maintain absolute elegance, avoid technical jargon, and never make up prices. Emphasize that custom requests are compiled personally by Mr. Ssammer Hussain.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I am currently adjusting my network frequency to Dal Lake. Please try sending your message again shortly.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API server route failed:", error);
    res.status(500).json({ 
      error: "Our satellite signals near Srinagar are experiencing high mountain winds. Please retry.",
      details: error?.message || "" 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "The Sabil Voyages Server" });
});

// Setup Vite Dev server middleware or serve production static assets
async function initializeVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Development Mode: Mounting Vite middleware onto Express.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Production Mode: Serving static assets from /dist folder.");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Fallback for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Sabil Voyages running successfully on http://localhost:${PORT}`);
  });
}

initializeVite().catch(err => {
  console.error("Failed to initialize server:", err);
});
