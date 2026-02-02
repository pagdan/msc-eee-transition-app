import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/clubs - Fetch all active clubs
export async function GET() {
  try {
    const clubs = await prisma.club.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json(
      { error: "Failed to fetch clubs" },
      { status: 500 },
    );
  }
}

// POST /api/clubs - Create a new club (Admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const club = await prisma.club.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        category: body.category,
        imageUrl: body.imageUrl,
        memberCount: body.memberCount || 0,
        contactEmail: body.contactEmail,
        website: body.website,
      },
    });

    return NextResponse.json(club, { status: 201 });
  } catch (error) {
    console.error("Error creating club:", error);
    return NextResponse.json(
      { error: "Failed to create club" },
      { status: 500 },
    );
  }
}
