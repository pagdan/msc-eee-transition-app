import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dining = await prisma.diningLocation.findMany({
      where: { isOpen: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        location: true,
        cuisine: true,
        openingHours: true,
        imageUrl: true,
        isOpen: true,
      },
    });

    return NextResponse.json(dining);
  } catch (error) {
    console.error("Failed to fetch dining locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch dining locations" },
      { status: 500 },
    );
  }
}
