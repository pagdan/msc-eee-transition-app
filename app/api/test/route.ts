import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clubCount = await prisma.club.count();
    const userCount = await prisma.user.count();
    const eventCount = await prisma.calendarEvent.count();

    return NextResponse.json({
      success: true,
      message: "API is working! 🎉",
      data: {
        clubs: clubCount,
        users: userCount,
        events: eventCount,
        database: "Connected ✅",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
