import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  return session;
}

// GET - fetch all events for the logged-in user
export async function GET() {
  const session = await requireUser();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const events = await prisma.calendarEvent.findMany({
    where: { userId: session.user.id },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(events);
}

// POST - create a new event
export async function POST(req: NextRequest) {
  const session = await requireUser();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title,
    description,
    location,
    startTime,
    endTime,
    isAllDay,
    category,
  } = body;

  if (!title || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Title, start time, and end time are required" },
      { status: 400 },
    );
  }

  const event = await prisma.calendarEvent.create({
    data: {
      userId: session.user.id,
      title,
      description: description || null,
      location: location || null,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isAllDay: isAllDay ?? false,
      category: category || null,
    },
  });

  return NextResponse.json(event, { status: 201 });
}

// DELETE - delete an event
export async function DELETE(req: NextRequest) {
  const session = await requireUser();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  // Ensure the event belongs to the user
  const event = await prisma.calendarEvent.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!event)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  await prisma.calendarEvent.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
