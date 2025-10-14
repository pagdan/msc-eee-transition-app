import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getCalendarEvents } from "@/lib/microsoft-graph";

// GET - Fetch calendar events
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const syncOutlook = searchParams.get("syncOutlook") === "true";

    // Fetch from database
    const events = await prisma.calendarEvent.findMany({
      where: {
        userId: session.user.id,
        ...(startDate &&
          endDate && {
            startTime: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }),
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Optionally sync with Outlook
    if (syncOutlook && session.accessToken) {
      try {
        const outlookEvents = await getCalendarEvents(
          session.accessToken,
          startDate || undefined,
          endDate || undefined,
        );

        // Sync Outlook events to database
        for (const outlookEvent of outlookEvents) {
          await prisma.calendarEvent.upsert({
            where: {
              outlookId: outlookEvent.id,
            },
            update: {
              title: outlookEvent.subject,
              description: outlookEvent.bodyPreview,
              startTime: new Date(outlookEvent.start.dateTime),
              endTime: new Date(outlookEvent.end.dateTime),
              location: outlookEvent.location?.displayName,
              isAllDay: outlookEvent.isAllDay,
            },
            create: {
              userId: session.user.id,
              outlookId: outlookEvent.id,
              title: outlookEvent.subject,
              description: outlookEvent.bodyPreview,
              startTime: new Date(outlookEvent.start.dateTime),
              endTime: new Date(outlookEvent.end.dateTime),
              location: outlookEvent.location?.displayName,
              isAllDay: outlookEvent.isAllDay,
              category: "academic",
            },
          });
        }

        // Refetch after sync
        const updatedEvents = await prisma.calendarEvent.findMany({
          where: {
            userId: session.user.id,
            ...(startDate &&
              endDate && {
                startTime: {
                  gte: new Date(startDate),
                  lte: new Date(endDate),
                },
              }),
          },
          orderBy: {
            startTime: "asc",
          },
        });

        return NextResponse.json({
          success: true,
          data: updatedEvents,
          message: "Calendar synced successfully",
        });
      } catch (error) {
        console.error("Error syncing with Outlook:", error);
        // Return local events even if sync fails
        return NextResponse.json({
          success: true,
          data: events,
          message: "Failed to sync with Outlook, showing local events",
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch calendar events" },
      { status: 500 },
    );
  }
}

// POST - Create new calendar event
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
      title,
      description,
      startTime,
      endTime,
      location,
      category,
      isAllDay,
    } = body;

    // Validate required fields
    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const event = await prisma.calendarEvent.create({
      data: {
        userId: session.user.id,
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        category,
        isAllDay: isAllDay || false,
      },
    });

    return NextResponse.json({
      success: true,
      data: event,
      message: "Event created successfully",
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create calendar event" },
      { status: 500 },
    );
  }
}
