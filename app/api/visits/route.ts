import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Fetch all logins for the last 7 days
  const logins = await prisma.userLogin.findMany({
    where: {
      login_time: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    select: { login_time: true },
  });

  // Aggregate by date (YYYY-MM-DD)
  const visitsMap: Record<string, number> = {};
  logins.forEach(({ login_time }) => {
    if (login_time) {
      const date = login_time.toISOString().slice(0, 10);
      visitsMap[date] = (visitsMap[date] || 0) + 1;
    }
  });

  // Format for recharts
  const visits = Object.entries(visitsMap).map(([date, count]) => ({
    date,
    visits: count,
  }));

  // Also return total visits
  const total = await prisma.userLogin.count();
  return NextResponse.json({ visits, total });
}

export async function POST() {
  // Not implemented, but must return a response
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
