// Application constants

export const APP_NAME = "MSc EEE Transition Portal";
export const APP_DESCRIPTION = "Supporting MSc EEE freshmen transition at NTU";

// NTU Campus Locations
export const NTU_LOCATIONS = {
  NORTH_SPINE: "North Spine",
  SOUTH_SPINE: "South Spine",
  CANTEEN_1: "Canteen 1 (North Spine)",
  CANTEEN_2: "Canteen 2 (South Spine)",
  CANTEEN_9: "Canteen 9",
  CANTEEN_11: "Canteen 11",
  CANTEEN_13: "Canteen 13",
  CANTEEN_14: "Canteen 14",
  CANTEEN_16: "Canteen 16 (Koufu)",
  EEE_BUILDING: "S1 (EEE Building)",
  LWN_LIBRARY: "Lee Wee Nam Library",
  HIVE: "The Hive",
  INNOVATION_CENTER: "Innovation Centre",
  STUDENT_UNION: "North Hill Student Union",
} as const;

// Calendar Event Categories
export const EVENT_CATEGORIES = {
  ACADEMIC: {
    value: "academic",
    label: "Academic",
    color: "blue",
    icon: "📚",
  },
  ORIENTATION: {
    value: "orientation",
    label: "Orientation",
    color: "purple",
    icon: "🎓",
  },
  SOCIAL: {
    value: "social",
    label: "Social",
    color: "green",
    icon: "🎉",
  },
  DEADLINE: {
    value: "deadline",
    label: "Deadline",
    color: "red",
    icon: "⏰",
  },
} as const;

// Club Categories
export const CLUB_CATEGORIES = {
  ACADEMIC: {
    value: "academic",
    label: "Academic & Professional",
    description: "Study groups, research clubs, and professional societies",
  },
  SPORTS: {
    value: "sports",
    label: "Sports & Recreation",
    description: "Sports teams, fitness clubs, and outdoor activities",
  },
  CULTURAL: {
    value: "cultural",
    label: "Cultural & Arts",
    description: "Dance, music, theatre, and cultural appreciation clubs",
  },
  SOCIAL: {
    value: "social",
    label: "Social & Community",
    description: "Social causes, volunteering, and community service",
  },
} as const;

// Forum Categories
export const FORUM_CATEGORIES = {
  GENERAL: {
    value: "general",
    label: "General Discussion",
    description: "Open discussions about student life",
  },
  ACADEMICS: {
    value: "academics",
    label: "Academics",
    description: "Course advice, study tips, and academic resources",
  },
  HOUSING: {
    value: "housing",
    label: "Housing & Accommodation",
    description: "On-campus and off-campus housing discussions",
  },
  SOCIAL: {
    value: "social",
    label: "Social & Events",
    description: "Social gatherings, events, and meetups",
  },
} as const;

// Cuisine Types
export const CUISINE_TYPES = [
  "Chinese",
  "Malay",
  "Indian",
  "Western",
  "Japanese",
  "Korean",
  "Thai",
  "Vietnamese",
  "Halal",
  "Vegetarian",
  "Fast Food",
  "Cafe",
] as const;

// Price Ranges
export const PRICE_RANGES = {
  BUDGET: {
    value: "$",
    label: "Budget ($3-5)",
    description: "Affordable meals under $5",
  },
  MODERATE: {
    value: "$$",
    label: "Moderate ($5-10)",
    description: "Mid-range dining options",
  },
  PREMIUM: {
    value: "$$$",
    label: "Premium ($10+)",
    description: "Premium dining experiences",
  },
} as const;

// Study Spot Amenities
export const STUDY_AMENITIES = [
  "WiFi",
  "Power Outlets",
  "Quiet Zone",
  "Group Study",
  "Air Conditioning",
  "Printing Services",
  "24/7 Access",
  "Whiteboards",
  "Computer Labs",
] as const;

// Study Spot Capacity
export const CAPACITY_LEVELS = {
  SMALL: {
    value: "small",
    label: "Small (1-10 people)",
    description: "Individual or small group study",
  },
  MEDIUM: {
    value: "medium",
    label: "Medium (10-30 people)",
    description: "Moderate sized study spaces",
  },
  LARGE: {
    value: "large",
    label: "Large (30+ people)",
    description: "Large lecture halls and spaces",
  },
} as const;

// Campus Bus Routes (simplified)
export const CAMPUS_BUSES = {
  RED: {
    routeNumber: "Red",
    routeName: "Campus Red",
    operatingHours: "7:30 AM - 11:00 PM",
    frequency: "10-15 minutes",
  },
  BLUE: {
    routeNumber: "Blue",
    routeName: "Campus Blue",
    operatingHours: "7:30 AM - 11:00 PM",
    frequency: "10-15 minutes",
  },
  BROWN: {
    routeNumber: "Brown",
    routeName: "Campus Brown Weekend",
    operatingHours: "9:00 AM - 9:00 PM (Weekends only)",
    frequency: "20 minutes",
  },
} as const;

// Wellbeing Resource Categories
export const WELLBEING_CATEGORIES = {
  MENTAL_HEALTH: {
    value: "mental_health",
    label: "Mental Health",
    description: "Mental wellness resources and support",
    icon: "🧠",
  },
  PHYSICAL_HEALTH: {
    value: "physical_health",
    label: "Physical Health",
    description: "Fitness, nutrition, and physical wellness",
    icon: "💪",
  },
  COUNSELING: {
    value: "counseling",
    label: "Counseling Services",
    description: "Professional counseling and therapy",
    icon: "🤝",
  },
  WORKSHOPS: {
    value: "workshops",
    label: "Workshops & Events",
    description: "Wellness workshops and activities",
    icon: "📅",
  },
} as const;

// Mood Scores
export const MOOD_SCORES = {
  VERY_POOR: { value: 1, label: "Very Poor", emoji: "😢", color: "red" },
  POOR: { value: 2, label: "Poor", emoji: "😟", color: "orange" },
  NEUTRAL: { value: 3, label: "Neutral", emoji: "😐", color: "yellow" },
  GOOD: { value: 4, label: "Good", emoji: "😊", color: "green" },
  EXCELLENT: { value: 5, label: "Excellent", emoji: "😄", color: "emerald" },
} as const;

// NTU Important Contacts
export const NTU_CONTACTS = {
  GENERAL_OFFICE: {
    name: "EEE General Office",
    phone: "+65 6790 4504",
    email: "eee-go@ntu.edu.sg",
  },
  STUDENT_SERVICES: {
    name: "Student Services Centre",
    phone: "+65 6790 6270",
    email: "ssc@ntu.edu.sg",
  },
  COUNSELING: {
    name: "Counselling and Guidance",
    phone: "+65 6790 6343",
    email: "cgu@ntu.edu.sg",
  },
  CAMPUS_SECURITY: {
    name: "Campus Security",
    phone: "+65 6790 6666",
    emergency: "6790 5555",
  },
  HEALTH_CENTER: {
    name: "University Health and Wellness Centre",
    phone: "+65 6790 4437",
    emergency: "6790 4437",
  },
} as const;

// Singapore Emergency Numbers
export const EMERGENCY_NUMBERS = {
  POLICE: "999",
  AMBULANCE: "995",
  FIRE: "995",
  NON_EMERGENCY: "1777",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// API Rate Limits
export const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: 60,
  REQUESTS_PER_HOUR: 1000,
} as const;

// File Upload Limits
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

// Time Zones
export const TIMEZONE = "Asia/Singapore";

// Date Formats
export const DATE_FORMATS = {
  SHORT: "MMM d, yyyy",
  LONG: "MMMM d, yyyy",
  WITH_TIME: "MMM d, yyyy • h:mm a",
  TIME_ONLY: "h:mm a",
  ISO: "yyyy-MM-dd",
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_POST_LENGTH: 20,
  MAX_POST_LENGTH: 5000,
  MIN_COMMENT_LENGTH: 1,
  MAX_COMMENT_LENGTH: 1000,
} as const;
