const OpenAI = require("openai");

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  buildPrompt(client, message) {
    return `You are a customer support chatbot for ${client.business_name}.

BUSINESS INFORMATION:
${client.business_info}

RULES:
1. ONLY answer questions based on the business information above
2. If asked something not in the business info, say exactly: "${client.fallback_message}"
3. Keep answers short and helpful (2-3 sentences max)
4. Be friendly but professional
5. Do not make up information not provided above

Question: ${message}`;
  }

  async generateResponse(client, message) {
    try {
      const prompt = this.buildPrompt(client, message);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful business assistant." },
          { role: "user", content: prompt },
        ],
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("AI Service Error:", error);
      return client.fallback_message;
    }
  }
}

module.exports = new AIService();

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// class AIService {
//   constructor() {
//     this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     this.model = this.genAI.getGenerativeModel({
//       model: "gemini-3-flash-preview",
//     });
//   }

//   buildPrompt(client, message) {
//     return `You are a customer support chatbot for ${client.business_name}.

// BUSINESS INFORMATION:
// ${client.business_info}

// RULES:
// 1. ONLY answer questions based on the business information above
// 2. If asked something not in the business info, say exactly: "${client.fallback_message}"
// 3. Keep answers short and helpful (2-3 sentences max)
// 4. Be friendly but professional
// 5. Do not make up information not provided above

// Question: ${message}`;
//   }

//   async generateResponse(client, message) {
//     try {
//       const prompt = this.buildPrompt(client, message);
//       const result = await this.model.generateContent(prompt);
//       const response = await result.response;
//       return response.text();
//     } catch (error) {
//       console.error("AI Service Error:", error);
//       return client.fallback_message;
//     }
//   }
// }

// module.exports = new AIService();
