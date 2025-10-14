import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";

export interface GraphEvent {
  id: string;
  subject: string;
  bodyPreview?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: {
    displayName: string;
  };
  isAllDay: boolean;
}

/**
 * Creates an authenticated Microsoft Graph client
 * @param accessToken - The OAuth access token from NextAuth session
 */
export function getGraphClient(accessToken: string) {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

/**
 * Fetches calendar events from Microsoft Outlook
 * @param accessToken - The OAuth access token
 * @param startDate - Start date for fetching events (ISO string)
 * @param endDate - End date for fetching events (ISO string)
 */
export async function getCalendarEvents(
  accessToken: string,
  startDate?: string,
  endDate?: string,
): Promise<GraphEvent[]> {
  const client = getGraphClient(accessToken);

  try {
    let query = client
      .api("/me/calendar/events")
      .select("id,subject,bodyPreview,start,end,location,isAllDay");

    // Add date filters if provided
    if (startDate && endDate) {
      query = query.filter(
        `start/dateTime ge '${startDate}' and end/dateTime le '${endDate}'`,
      );
    }

    const response = await query.top(50).orderby("start/dateTime").get();

    return response.value as GraphEvent[];
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    throw new Error("Failed to fetch calendar events from Microsoft Graph");
  }
}

/**
 * Creates a new calendar event in Outlook
 * @param accessToken - The OAuth access token
 * @param event - Event details
 */
export async function createCalendarEvent(
  accessToken: string,
  event: {
    subject: string;
    body?: string;
    start: string;
    end: string;
    location?: string;
    isAllDay?: boolean;
  },
) {
  const client = getGraphClient(accessToken);

  const calendarEvent = {
    subject: event.subject,
    body: {
      contentType: "HTML",
      content: event.body || "",
    },
    start: {
      dateTime: event.start,
      timeZone: "Singapore Standard Time",
    },
    end: {
      dateTime: event.end,
      timeZone: "Singapore Standard Time",
    },
    location: {
      displayName: event.location || "",
    },
    isAllDay: event.isAllDay || false,
  };

  try {
    const response = await client
      .api("/me/calendar/events")
      .post(calendarEvent);
    return response;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw new Error("Failed to create calendar event");
  }
}

/**
 * Gets user profile information from Microsoft Graph
 * @param accessToken - The OAuth access token
 */
export async function getUserProfile(accessToken: string) {
  const client = getGraphClient(accessToken);

  try {
    const profile = await client.api("/me").get();
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}
