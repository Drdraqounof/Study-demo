import { NextRequest, NextResponse } from 'next/server';
import { analyzeFile } from '../../../lib/studyflow-agent.js';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  try {
    const aiResult = await analyzeFile(file);
    return NextResponse.json({ result: aiResult });
  } catch (err: any) {
    return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
  }
}
