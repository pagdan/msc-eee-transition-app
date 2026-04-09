import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/clubs/[slug] - Fetch single club by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const club = await prisma.club.findUnique({
      where: { slug },
    });
    if (!club) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 });
    }
    return NextResponse.json(club);
  } catch (error) {
    console.error("Error fetching club:", error);
    return NextResponse.json(
      { error: "Failed to fetch club" },
      { status: 500 },
    );
  }
}

// PUT /api/clubs/[slug] - Update club (Admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const club = await prisma.club.update({
      where: { slug },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        imageUrl: body.imageUrl,
        memberCount: body.memberCount,
        contactEmail: body.contactEmail,
        website: body.website,
        isActive: body.isActive,
      },
    });
    return NextResponse.json(club);
  } catch (error) {
    console.error("Error updating club:", error);
    return NextResponse.json(
      { error: "Failed to update club" },
      { status: 500 },
    );
  }
}

// DELETE /api/clubs/[slug] - Delete club (Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    await prisma.club.delete({
      where: { slug },
    });
    return NextResponse.json({ message: "Club deleted successfully" });
  } catch (error) {
    console.error("Error deleting club:", error);
    return NextResponse.json(
      { error: "Failed to delete club" },
      { status: 500 },
    );
  }
}
