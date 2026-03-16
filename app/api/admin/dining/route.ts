import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") return null;
  return session;
}

// GET - fetch all dining locations
export async function GET() {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dining = await prisma.diningLocation.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(dining);
}

// POST - create new dining location
export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, location, cuisine, openingHours, imageUrl, isOpen } = body;

  if (!name || !location) {
    return NextResponse.json(
      { error: "Name and location are required" },
      { status: 400 },
    );
  }

  const dining = await prisma.diningLocation.create({
    data: {
      name,
      location,
      cuisine: cuisine ?? [],
      openingHours: openingHours || null,
      imageUrl: imageUrl || null,
      priceRange: "$",
      isOpen: isOpen ?? true,
    },
  });

  return NextResponse.json(dining, { status: 201 });
}

// PUT - update dining location (supports partial update for toggle)
export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const dining = await prisma.diningLocation.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.location && { location: data.location }),
      ...(data.cuisine && { cuisine: data.cuisine }),
      ...(data.openingHours !== undefined && {
        openingHours: data.openingHours || null,
      }),
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl || null }),
      ...(data.isOpen !== undefined && { isOpen: data.isOpen }),
    },
  });

  return NextResponse.json(dining);
}

// DELETE - delete dining location
export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  await prisma.diningLocation.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
