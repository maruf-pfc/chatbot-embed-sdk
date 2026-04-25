const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// JSON file as database
const DB_FILE = path.join(__dirname, "database", "clients.json");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ensure database folder and file exist
if (!fs.existsSync(path.join(__dirname, "database"))) {
  fs.mkdirSync(path.join(__dirname, "database"));
}

if (!fs.existsSync(DB_FILE)) {
  // Create initial database with demo client
  const initialData = {
    clients: {
      "demo-coffee-shop": {
        id: "demo-coffee-shop",
        business_name: "Bean & Brew Coffeehouse",
        business_info: `Open 7am to 7pm daily.
Menu: Espresso $3, Latte $4.50, Cold brew $4.
Pastries: Croissant $3, Muffin $2.50.
Free WiFi. Catering available for 10+ people.
Returns accepted within 14 days with receipt.`,
        fallback_message:
          "I don't have that info — please call us at (555) 727-2834 or ask a barista in-store.",
        bubble_color: "#6F4E37",
        created_at: new Date().toISOString(),
      },
    },
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helper function to read database
function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(data);
}

// Helper function to write database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// API endpoint for widget chat
app.post("/api/chat", async (req, res) => {
  const { botId, message } = req.body;

  if (!botId || !message) {
    return res.status(400).json({ error: "Missing botId or message" });
  }

  const db = readDB();
  const client = db.clients[botId];

  if (!client) {
    return res.status(404).json({ error: "Bot not found" });
  }

  try {
    // Build the prompt
    const systemPrompt = `You are a customer support chatbot for ${client.business_name}.

BUSINESS INFORMATION:
${client.business_info}

RULES:
1. ONLY answer questions based on the business information above
2. If asked something not in the business info, say exactly: "${client.fallback_message}"
3. Keep answers short and helpful (2-3 sentences max)
4. Be friendly but professional
5. Do not make up information not provided above

Question: ${message}`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const answer = response.text();

    res.json({ answer });
  } catch (error) {
    console.error("Gemini error:", error);
    res.json({ answer: client.fallback_message });
  }
});

// Admin API - get all clients
app.get("/api/admin/clients", (req, res) => {
  const db = readDB();
  const clients = Object.values(db.clients);
  res.json(clients);
});

// Admin API - create/update client
app.post("/api/admin/clients", (req, res) => {
  const { id, business_name, business_info, fallback_message, bubble_color } =
    req.body;

  const db = readDB();
  db.clients[id] = {
    id,
    business_name,
    business_info,
    fallback_message,
    bubble_color,
    created_at: new Date().toISOString(),
  };

  writeDB(db);
  res.json({ success: true });
});

// Admin API - delete client
app.delete("/api/admin/clients/:id", (req, res) => {
  const db = readDB();
  delete db.clients[req.params.id];
  writeDB(db);
  res.json({ success: true });
});

// Serve admin panel
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(
    `💬 Widget embed: <script src="http://localhost:${PORT}/widget.js" data-bot-id="YOUR_BOT_ID"></script>\n`,
  );
});
