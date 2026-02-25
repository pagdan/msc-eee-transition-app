import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const spots = await prisma.studySpot.findMany({
      where: { isAvailable: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        location: true,
        capacity: true,
        amenities: true,
        openingHours: true,
        imageUrl: true,
        isAvailable: true,
      },
    });

    return NextResponse.json(spots);
  } catch (error) {
    console.error("Failed to fetch study spots:", error);
    return NextResponse.json(
      { error: "Failed to fetch study spots" },
      { status: 500 },
    );
  }
}
