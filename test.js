require("dotenv").config();
const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  console.log("❌ ENV TIDAK TERBACA");
  process.exit(1);
}

// Buat instance OpenAI terbaru
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function chat() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // bisa juga "gpt-4"
      messages: [
        { role: "system", content: "Kamu adalah asisten yang ramah." },
        { role: "user", content: "Halo, kamu siapa?" }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    console.log("✅ BALASAN:", response.choices[0].message.content);
  } catch (err) {
    console.error("❌ ERROR:", err);
  }
}

chat();
