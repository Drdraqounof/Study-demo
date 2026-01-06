const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});
async function chatWithAI(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful study assistant. Provide clear, concise, and student-friendly explanations and summaries." },
      ...messages
    ],
    max_tokens: 500,
  });
  return response.choices[0]?.message?.content || "No AI response.";
}

async function analyzeFile(file) {
  // Read file as base64 or text
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  // Example: send to OpenAI Vision (GPT-4V) or document model
  // This is a placeholder; you may need to use a specific endpoint for images/docs
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: "You are a helpful study assistant. Provide clear, concise, and student-friendly explanations and summaries.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze this file and summarize its contents." },
          { type: "image_url", image_url: { url: `data:${file.type};base64,${base64}` } },
        ],
      },
    ],
    max_tokens: 500,
  });

  return response.choices[0]?.message?.content || "No AI response.";
}

module.exports = { analyzeFile, chatWithAI };
