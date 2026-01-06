import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});
export async function chatWithAI(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: `You are a helpful study assistant. Your goal is to provide clear, concise, and student-friendly explanations.

When a user asks for information on a topic, structure your response in the following way:
1.  Start with a brief, one-sentence overview of the topic.
2.  Use Markdown headings (e.g., '### Key Concepts') to organize the information into logical sections.
3.  Use numbered or bulleted lists to break down complex information.
4.  Use bold text to highlight important terms or names.
5.  If applicable, include a '### Research Tips' section with suggestions for further reading or exploration.
6.  End with a short '### Summary' section that recaps the main points.

Your tone should be encouraging and easy to understand.` 
      },
      ...messages
    ],
    max_tokens: 1000,
  });
  return response.choices[0]?.message?.content || "No AI response.";
}

export async function analyzeFile(file) {
  // Read file as base64 or text
  const buffer = await file.arrayBuffer();
  // Check file type
  if (file.type.startsWith('image/')) {
    return "Image analysis is not available. Your OpenAI API key does not have access to vision models.";
  }
  // For text files, analyze with a text model
  let text = "";
  try {
    text = new TextDecoder().decode(buffer);
  } catch {
    text = "Unable to read file as text.";
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful study assistant. Your job is to read the provided document and give a clear, concise summary of its main points, findings, and what the document is about. If the document is not readable, say so.",
      },
      {
        role: "user",
        content: `Please analyze and summarize the following document. What is it about? What are the main findings or topics?\n\n${text}`,
      },
    ],
    max_tokens: 500,
  });
  return response.choices[0]?.message?.content || "No AI response.";
}


