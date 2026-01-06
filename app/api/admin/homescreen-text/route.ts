import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const latest = await prisma.homeScreenText.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ text: latest?.text || "" });
}

export async function POST(req: Request) {
  const { text } = await req.json();
  const entry = await prisma.homeScreenText.create({ data: { text } });
  return NextResponse.json({ text: entry.text });
}
