import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  try {
    // Save user to UserLogin table (email must be unique)
    await prisma.userLogin.create({
      data: {
        email,
        // Optionally store name or password in a real user table
      },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
