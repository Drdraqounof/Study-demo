import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '../../../lib/studyflow-agent.js';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const message = formData.get('message');
  let history = [];
  try {
    history = JSON.parse(formData.get('conversationHistory') as string) || [];
  } catch {}

  // Prepare messages for OpenAI
  const messages = [
    ...history.map((m: any) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ];

  try {
    const aiResult = await chatWithAI(messages);
    return NextResponse.json({ result: aiResult });
  } catch (err) {
    console.error('[API CONVERSE ERROR]', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'AI conversation failed', details: errorMessage }, { status: 500 });
  }
}
