import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clubs = await prisma.club.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(clubs);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    name,
    slug,
    description,
    category,
    memberCount,
    contactEmail,
    website,
    imageUrl,
    isActive,
    instagram,
    facebook,
    linkedin,
  } = body;

  if (!name || !slug || !description)
    return NextResponse.json(
      { error: "Name, slug, and description are required" },
      { status: 400 },
    );

  // Check for duplicate slug
  const existing = await prisma.club.findUnique({ where: { slug } });
  if (existing)
    return NextResponse.json(
      {
        error:
          "A club with this slug already exists. Please use a different slug.",
      },
      { status: 400 },
    );

  const club = await prisma.club.create({
    data: {
      name,
      slug,
      description,
      category: category ?? "Academic",
      memberCount: memberCount ?? 0,
      contactEmail: contactEmail || null,
      website: website || null,
      imageUrl: imageUrl || null,
      isActive: isActive ?? true,
      instagram: instagram || null,
      facebook: facebook || null,
      linkedin: linkedin || null,
    },
  });

  return NextResponse.json(club, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const club = await prisma.club.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.slug && { slug: data.slug }),
      ...(data.description && { description: data.description }),
      ...(data.category && { category: data.category }),
      ...(data.memberCount !== undefined && { memberCount: data.memberCount }),
      ...(data.contactEmail !== undefined && {
        contactEmail: data.contactEmail,
      }),
      ...(data.website !== undefined && { website: data.website }),
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.instagram !== undefined && { instagram: data.instagram }),
      ...(data.facebook !== undefined && { facebook: data.facebook }),
      ...(data.linkedin !== undefined && { linkedin: data.linkedin }),
    },
  });

  return NextResponse.json(club);
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  await prisma.club.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
