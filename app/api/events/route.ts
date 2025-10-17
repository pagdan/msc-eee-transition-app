import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch all events
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const upcoming = searchParams.get("upcoming") === "true";

    const events = await prisma.event.findMany({
      where: {
        isPublished: true,
        ...(upcoming && {
          date: {
            gte: new Date(),
          },
        }),
      },
      orderBy: {
        date: "desc",
      },
      ...(limit && { take: parseInt(limit) }),
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

// POST - Create new event (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { title, subtitle, date, imageUrl, content } = body;

    if (!title || !subtitle || !date) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        subtitle,
        date: new Date(date),
        imageUrl,
        content,
      },
    });

    return NextResponse.json({
      success: true,
      data: event,
      message: "Event created successfully",
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 },
    );
  }
}
