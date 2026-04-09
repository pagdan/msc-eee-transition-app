import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "admin") return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const spots = await prisma.studySpot.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(spots);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    name,
    location,
    capacity,
    amenities,
    openingHours,
    imageUrl,
    isAvailable,
  } = body;

  if (!name || !location)
    return NextResponse.json(
      { error: "Name and location are required" },
      { status: 400 },
    );

  const spot = await prisma.studySpot.create({
    data: {
      name,
      location,
      capacity: capacity ?? "medium",
      amenities: amenities ?? [],
      openingHours: openingHours || null,
      imageUrl: imageUrl || null,
      isAvailable: isAvailable ?? true,
    },
  });

  return NextResponse.json(spot, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const spot = await prisma.studySpot.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.location && { location: data.location }),
      ...(data.capacity && { capacity: data.capacity }),
      ...(data.amenities && { amenities: data.amenities }),
      ...(data.openingHours !== undefined && {
        openingHours: data.openingHours || null,
      }),
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl || null }),
      ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
    },
  });

  return NextResponse.json(spot);
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  await prisma.studySpot.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
