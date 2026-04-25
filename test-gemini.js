require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  console.log("Testing Gemini API...");
  console.log("API Key:", process.env.GEMINI_API_KEY ? "✓ Present" : "✗ Missing");
  
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in .env file");
    return;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Try different model names
    const modelsToTry = [
      "gemini-3-flash-preview"
    ];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'Hello, API is working!'");
        const response = await result.response;
        console.log(`✅ Success with ${modelName}:`, response.text());
        return;
      } catch (e) {
        console.log(`❌ ${modelName} failed:`, e.message);
      }
    }
    
    console.log("No working model found. Your API key might be for a different region or needs activation.");
    
  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
  }
}

testGemini();