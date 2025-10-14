import { z } from "zod";

// User validation schemas
export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  studentId: z.string().optional(),
  programme: z.string().optional(),
  yearOfStudy: z.number().int().min(1).max(4).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    studentId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Calendar event validation schemas
export const calendarEventSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(200, "Title too long"),
    description: z.string().max(1000, "Description too long").optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string().max(200, "Location too long").optional(),
    category: z
      .enum(["academic", "orientation", "social", "deadline"])
      .optional(),
    isAllDay: z.boolean().default(false),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const calendarSyncSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  syncOutlook: z.boolean().default(false),
});

// Club validation schemas
export const clubSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000),
  category: z.enum(["academic", "sports", "cultural", "social"]),
  imageUrl: z.string().url("Invalid image URL").optional(),
  meetingSchedule: z.string().max(200).optional(),
  contactEmail: z.string().email("Invalid email address").optional(),
});

export const clubMembershipSchema = z.object({
  clubId: z.string().cuid(),
  role: z.enum(["member", "admin", "president"]).default("member"),
});

// Forum validation schemas
export const forumPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(5000),
  category: z.enum(["general", "academics", "housing", "social"]),
  isPinned: z.boolean().default(false),
});

export const forumCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000),
  postId: z.string().cuid(),
});

// Student Life validation schemas
export const diningLocationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  location: z.string().min(2).max(200),
  cuisine: z.array(z.string()),
  priceRange: z.enum(["$", "$$", "$$$"]),
  openingHours: z.string().optional(),
  imageUrl: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const studySpotSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  location: z.string().min(2).max(200),
  capacity: z.enum(["small", "medium", "large"]),
  amenities: z.array(z.string()),
  openingHours: z.string().optional(),
  imageUrl: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const busRouteSchema = z.object({
  routeNumber: z.string().min(1).max(10),
  routeName: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  schedule: z.record(z.unknown()),
  stops: z.array(z.string()),
});

// Wellbeing validation schemas
export const wellbeingResourceSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(2000),
  category: z.enum([
    "mental_health",
    "physical_health",
    "counseling",
    "workshops",
  ]),
  resourceType: z.enum(["article", "video", "service", "event"]),
  link: z.string().url().optional(),
  contactInfo: z.string().max(200).optional(),
  imageUrl: z.string().url().optional(),
});

export const wellbeingLogSchema = z.object({
  moodScore: z.number().int().min(1).max(5),
  notes: z.string().max(500).optional(),
  date: z.coerce.date().optional(),
});

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  category: z.string().optional(),
  sortBy: z.enum(["date", "title", "relevance"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const dateRangeSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

// Type exports
export type UserSchema = z.infer<typeof userSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type CalendarEventSchema = z.infer<typeof calendarEventSchema>;
export type ClubSchema = z.infer<typeof clubSchema>;
export type ForumPostSchema = z.infer<typeof forumPostSchema>;
export type ForumCommentSchema = z.infer<typeof forumCommentSchema>;
export type WellbeingLogSchema = z.infer<typeof wellbeingLogSchema>;
