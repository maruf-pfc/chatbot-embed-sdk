const databaseService = require("../services/databaseService");
const aiService = require("../services/aiService");

class ChatController {
  async handleChat(req, res) {
    const { botId, message } = req.body;

    // Validate input
    if (!botId || !message) {
      return res.status(400).json({ error: "Missing botId or message" });
    }

    // Get client from database
    const client = databaseService.getClient(botId);
    if (!client) {
      return res.status(404).json({ error: "Bot not found" });
    }

    // Generate AI response
    const answer = await aiService.generateResponse(client, message);

    console.log(
      `💬 [${client.business_name}] Q: "${message}" → A: "${answer.substring(0, 50)}..."`,
    );

    res.json({ answer });
  }
}

module.exports = new ChatController();
