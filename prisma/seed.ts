import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.wellbeingLog.deleteMany();
  await prisma.wellbeingResource.deleteMany();
  await prisma.busRoute.deleteMany();
  await prisma.studySpot.deleteMany();
  await prisma.diningLocation.deleteMany();
  await prisma.forumComment.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.clubMembership.deleteMany();
  await prisma.club.deleteMany();
  await prisma.calendarEvent.deleteMany();

  console.log("✅ Cleared existing data");

  // Create sample clubs
  const clubs = await Promise.all([
    prisma.club.create({
      data: {
        name: "EEE Research Society",
        description:
          "Join us to explore cutting-edge research in electrical and electronic engineering. We host regular seminars, workshops, and networking events with industry professionals.",
        category: "academic",
        meetingSchedule: "Every Friday, 6:00 PM - 8:00 PM",
        contactEmail: "eee.research@ntu.edu.sg",
      },
    }),
    prisma.club.create({
      data: {
        name: "Badminton Club",
        description:
          "Play badminton with fellow students. All skill levels welcome! We have regular training sessions and friendly matches.",
        category: "sports",
        meetingSchedule: "Tuesday & Thursday, 7:00 PM - 9:00 PM",
        contactEmail: "badminton@ntu.edu.sg",
      },
    }),
    prisma.club.create({
      data: {
        name: "Cultural Dance Ensemble",
        description:
          "Experience diverse cultures through dance. We perform at university events and organize cultural showcases throughout the year.",
        category: "cultural",
        meetingSchedule: "Wednesday, 6:00 PM - 8:00 PM",
        contactEmail: "dance@ntu.edu.sg",
      },
    }),
    prisma.club.create({
      data: {
        name: "Student Volunteer Corps",
        description:
          "Make a difference in the community through volunteering. Join us for meaningful social impact projects.",
        category: "social",
        meetingSchedule: "Saturdays, 9:00 AM - 12:00 PM",
        contactEmail: "volunteer@ntu.edu.sg",
      },
    }),
  ]);

  console.log(`✅ Created ${clubs.length} clubs`);

  // Create sample dining locations
  const dining = await Promise.all([
    prisma.diningLocation.create({
      data: {
        name: "Canteen 2",
        description:
          "Popular canteen in South Spine with diverse food options. Great for quick meals between classes.",
        location: "South Spine",
        cuisine: ["Chinese", "Malay", "Indian", "Western"],
        priceRange: "$",
        openingHours: "7:00 AM - 9:00 PM",
        rating: 4.2,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Koufu @ Canteen 16",
        description:
          "Modern air-conditioned food court with variety of Asian and Western cuisines.",
        location: "North Spine Plaza",
        cuisine: ["Japanese", "Korean", "Western", "Chinese"],
        priceRange: "$$",
        openingHours: "8:00 AM - 10:00 PM",
        rating: 4.5,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "North Hill Food Court",
        description:
          "Student favorite with affordable meals and late night options.",
        location: "North Hill",
        cuisine: ["Chinese", "Malay", "Western", "Vegetarian"],
        priceRange: "$",
        openingHours: "7:00 AM - 11:00 PM",
        rating: 4.0,
      },
    }),
  ]);

  console.log(`✅ Created ${dining.length} dining locations`);

  // Create sample study spots
  const studySpots = await Promise.all([
    prisma.studySpot.create({
      data: {
        name: "Lee Wee Nam Library",
        description:
          "Main library with extensive study spaces, quiet zones, and 24/7 access. Perfect for focused study sessions.",
        location: "Central Campus",
        capacity: "large",
        amenities: [
          "WiFi",
          "Power Outlets",
          "Quiet Zone",
          "Air Conditioning",
          "24/7 Access",
          "Printing Services",
        ],
        openingHours: "24/7",
        rating: 4.8,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "The Hive",
        description:
          "Modern collaborative learning space with flexible seating and group study rooms.",
        location: "North Spine",
        capacity: "medium",
        amenities: [
          "WiFi",
          "Power Outlets",
          "Group Study",
          "Whiteboards",
          "Air Conditioning",
        ],
        openingHours: "8:00 AM - 11:00 PM",
        rating: 4.6,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "S1 Level 3 Study Area",
        description:
          "Quiet study area near EEE labs. Convenient for EEE students.",
        location: "S1 Building (EEE)",
        capacity: "small",
        amenities: ["WiFi", "Power Outlets", "Quiet Zone"],
        openingHours: "7:00 AM - 10:00 PM",
        rating: 4.3,
      },
    }),
  ]);

  console.log(`✅ Created ${studySpots.length} study spots`);

  // Create sample bus routes
  const busRoutes = await Promise.all([
    prisma.busRoute.create({
      data: {
        routeNumber: "Red",
        routeName: "Campus Red Route",
        description: "Main campus loop service connecting all major locations.",
        schedule: {
          weekday: "7:30 AM - 11:00 PM",
          weekend: "9:00 AM - 9:00 PM",
          frequency: "10-15 minutes",
        },
        stops: [
          "Hall of Residence 1",
          "Canteen 2",
          "Lee Wee Nam Library",
          "North Spine Plaza",
          "Innovation Centre",
          "Yunnan Garden",
        ],
      },
    }),
    prisma.busRoute.create({
      data: {
        routeNumber: "Blue",
        routeName: "Campus Blue Route",
        description: "Connects academic buildings with residential areas.",
        schedule: {
          weekday: "7:30 AM - 11:00 PM",
          weekend: "9:00 AM - 9:00 PM",
          frequency: "10-15 minutes",
        },
        stops: [
          "Jurong East MRT",
          "Hall 4",
          "North Hill",
          "School of EEE",
          "South Spine",
          "Pioneer MRT",
        ],
      },
    }),
  ]);

  console.log(`✅ Created ${busRoutes.length} bus routes`);

  // Create sample wellbeing resources
  const resources = await Promise.all([
    prisma.wellbeingResource.create({
      data: {
        title: "Student Counselling Services",
        description:
          "Professional counselling support for all students. Services are confidential and free of charge. Our trained counsellors can help with stress, anxiety, relationships, and academic concerns.",
        category: "counseling",
        resourceType: "service",
        contactInfo:
          "Email: cgu@ntu.edu.sg | Phone: +65 6790 6343 | Walk-in: Mon-Fri 9AM-5PM",
        link: "https://www.ntu.edu.sg/student-life/student-wellbeing",
      },
    }),
    prisma.wellbeingResource.create({
      data: {
        title: "Stress Management Workshop",
        description:
          "Learn effective techniques to manage academic stress and maintain work-life balance. Interactive session with practical tools you can use daily.",
        category: "workshops",
        resourceType: "event",
        link: "https://www.ntu.edu.sg/student-life/student-wellbeing",
      },
    }),
    prisma.wellbeingResource.create({
      data: {
        title: "Campus Recreation Centre",
        description:
          "Stay active with our gym facilities, swimming pool, and fitness classes. Student membership available at discounted rates.",
        category: "physical_health",
        resourceType: "service",
        contactInfo: "Email: ssc-src@ntu.edu.sg | Phone: +65 6790 6166",
        link: "https://www.ntu.edu.sg/src",
      },
    }),
    prisma.wellbeingResource.create({
      data: {
        title: "Mindfulness Meditation Sessions",
        description:
          "Free weekly meditation sessions to help reduce stress and improve focus. No experience necessary.",
        category: "mental_health",
        resourceType: "event",
      },
    }),
  ]);

  console.log(`✅ Created ${resources.length} wellbeing resources`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
