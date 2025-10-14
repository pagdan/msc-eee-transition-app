import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

// GET - Fetch all clubs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const clubs = await prisma.club.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        members: {
          select: {
            id: true,
            role: true,
            joinedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: clubs,
    });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch clubs" },
      { status: 500 },
    );
  }
}

// POST - Create new club (admin only - add role check in production)
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
    const {
      name,
      description,
      category,
      imageUrl,
      meetingSchedule,
      contactEmail,
    } = body;

    if (!name || !description || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const club = await prisma.club.create({
      data: {
        name,
        description,
        category,
        imageUrl,
        meetingSchedule,
        contactEmail,
      },
    });

    return NextResponse.json({
      success: true,
      data: club,
      message: "Club created successfully",
    });
  } catch (error) {
    console.error("Error creating club:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create club" },
      { status: 500 },
    );
  }
}
