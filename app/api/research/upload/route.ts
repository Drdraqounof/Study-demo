import { NextRequest, NextResponse } from 'next/server';
import { analyzeFile } from '../../../lib/studyflow-agent.js';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll('file').filter(f => f instanceof File);
  if (!files.length) {
    console.error('Upload error: No files uploaded. FormData keys:', Array.from(formData.keys()));
    return NextResponse.json({ error: 'No files uploaded', details: Array.from(formData.keys()) }, { status: 400 });
  }
  try {
    // Analyze all files and collect results
    const results = [];
    for (const file of files) {
      try {
        const aiResult = await analyzeFile(file);
        results.push({ name: file.name, result: aiResult });
      } catch (fileErr: any) {
        console.error('File analysis error:', file.name, fileErr);
        results.push({ name: file.name, error: fileErr?.message || String(fileErr) });
      }
    }
    return NextResponse.json({ results });
  } catch (err: any) {
    console.error('General AI analysis failed:', err);
    return NextResponse.json({ error: 'AI analysis failed', details: err?.message || String(err) }, { status: 500 });
  }
}
