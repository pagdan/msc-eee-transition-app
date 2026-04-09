import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "admin") {
    return null;
  }
  return session;
}

// GET - fetch all events
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  return NextResponse.json(events);
}

// POST - create new event
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, subtitle, date, imageUrl, content, isPublished } = body;

  if (!title || !subtitle || !date) {
    return NextResponse.json(
      { error: "Title, subtitle, and date are required" },
      { status: 400 },
    );
  }

  const event = await prisma.event.create({
    data: {
      title,
      subtitle,
      date: new Date(date),
      imageUrl: imageUrl || null,
      content: content || null,
      isPublished: isPublished ?? true,
    },
  });

  return NextResponse.json(event, { status: 201 });
}

// PUT - update existing event
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, title, subtitle, date, imageUrl, content, isPublished } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 },
    );
  }

  const event = await prisma.event.update({
    where: { id },
    data: {
      title,
      subtitle,
      date: new Date(date),
      imageUrl: imageUrl || null,
      content: content || null,
      isPublished,
    },
  });

  return NextResponse.json(event);
}

// DELETE - delete event
export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 },
    );
  }

  await prisma.event.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
