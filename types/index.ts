import {
  User,
  CalendarEvent,
  Club,
  ForumPost,
  ForumComment,
} from "@prisma/client";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Calendar types
export interface CalendarEventWithUser extends CalendarEvent {
  user: Pick<User, "id" | "name" | "email">;
}

export type CalendarCategory =
  | "academic"
  | "orientation"
  | "social"
  | "deadline";

// Community types
export interface ClubWithMembers extends Club {
  members: {
    id: string;
    user: Pick<User, "id" | "name" | "email" | "image">;
    role: string;
    joinedAt: Date;
  }[];
  _count?: {
    members: number;
  };
}

export interface ForumPostWithDetails extends ForumPost {
  author: Pick<User, "id" | "name" | "email" | "image">;
  comments: ForumCommentWithAuthor[];
  _count?: {
    comments: number;
  };
}

export interface ForumCommentWithAuthor extends ForumComment {
  author: Pick<User, "id" | "name" | "email" | "image">;
}

export type ForumCategory = "general" | "academics" | "housing" | "social";

// Student Life types
export interface DiningFilter {
  cuisine?: string[];
  priceRange?: string[];
  location?: string;
}

export interface StudySpotFilter {
  capacity?: string[];
  amenities?: string[];
  location?: string;
}

// Wellbeing types
export type WellbeingCategory =
  | "mental_health"
  | "physical_health"
  | "counseling"
  | "workshops";

export type ResourceType = "article" | "video" | "service" | "event";

export interface WellbeingStats {
  averageMood: number;
  totalLogs: number;
  recentTrend: "improving" | "stable" | "declining";
}
