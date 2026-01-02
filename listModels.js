const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log("📜 Available models:", models);
  } catch (err) {
    console.error(err);
  }
}

listModels();
