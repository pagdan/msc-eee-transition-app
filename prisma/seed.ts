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
  await prisma.event.deleteMany();

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

  // Create sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "MSc Mid-Autumn Festival Celebration 2025",
        subtitle:
          "EEE MSc students gathered at the Lee Kong Chian Function Room for a heartwarming Mid-Autumn Festival celebration for a wonderful afternoon filled with culture, creativity, and connection.",
        date: new Date("2025-10-07"),
        content:
          "Join us for a memorable Mid-Autumn Festival celebration! EEE MSc students will gather at the Lee Kong Chian Function Room for an afternoon filled with traditional games, lantern displays, and mooncake sharing. This is a wonderful opportunity to connect with fellow students while experiencing the rich cultural heritage of this important festival.",
      },
    }),
    prisma.event.create({
      data: {
        title: "Innovation in Action at SGNOG12!",
        subtitle:
          "From deep tech talks to networking with industry pioneers, NTU MSc students experienced how Singapore's top network professionals are shaping the future of Internet and communications technology.",
        date: new Date("2025-09-26"),
        content:
          "SGNOG12 brought together Singapore's leading network operators and technology professionals. Students had the opportunity to attend technical presentations, participate in hands-on workshops, and network with industry experts shaping the future of internet infrastructure.",
      },
    }),
    prisma.event.create({
      data: {
        title: "EEE MSc Multiculture Walk",
        subtitle:
          "EEE MSc students embarked on a cultural journey through Singapore's rich multicultural history, discovering how Southeast Asian, South Asian, and Islamic traditions have shaped the nation's vibrant identity.",
        date: new Date("2025-09-26"),
        content:
          "Explore Singapore's diverse cultural heritage through a guided walking tour. Visit historic neighborhoods, temples, and cultural landmarks while learning about the traditions and customs that make Singapore a unique multicultural nation.",
      },
    }),
    prisma.event.create({
      data: {
        title: "Explores Nature's Tranquility at Mandai Boardwalk",
        subtitle:
          "Participants enjoyed a refreshing weekend hike through lush greenery and scenic rest stops, connecting with nature and one another along the Mandai Boardwalk.",
        date: new Date("2025-09-15"),
        content:
          "Take a break from studies and immerse yourself in nature! The Mandai Boardwalk offers a peaceful escape with its scenic trails, lush tropical vegetation, and beautiful rest areas. Perfect for relaxation and making new friends.",
      },
    }),
    prisma.event.create({
      data: {
        title: "EEE MSc Alumni Career Sharing Series: Research Career",
        subtitle:
          "We had an inspiring session with NTU alumnus and Singapore Institute of Technology's Associate Professor Dr Hua Guang.",
        date: new Date("2025-08-29"),
        content:
          "Learn from successful alumni about pursuing a research career in engineering. Dr Hua Guang shares insights on academic research, publishing, grant applications, and transitioning from industry to academia.",
      },
    }),
    prisma.event.create({
      data: {
        title: "EEE MSc August 2025 Orientation Day",
        subtitle:
          "We rolled out the red carpet for our newest cohort of Master of Science graduate students at #NTUEEE!",
        date: new Date("2025-08-06"),
        content:
          "Welcome to NTU! Join us for orientation day where you'll meet your cohort, learn about campus facilities, understand your programme structure, and get all the information you need to start your MSc journey successfully.",
      },
    }),
    prisma.event.create({
      data: {
        title: "Airport Pickup Services for August 2025 Intake Students",
        subtitle:
          "We warmly welcomed our new EEE MSc students at the airport with a complimentary pickup service, ensuring a smooth arrival and a swift start to their journey at NTU.",
        date: new Date("2025-07-30"),
        content:
          "New international students arriving for the August intake can enjoy complimentary airport pickup services. Our team will meet you at the airport and help you get settled into your accommodation.",
      },
    }),
    prisma.event.create({
      data: {
        title: "Weekend Music Festival",
        subtitle:
          "The EEE Lifelong Learning Club hosted its highly anticipated Weekend Music Festival at the AIA Canopy, North Spine.",
        date: new Date("2025-04-05"),
        content:
          "Enjoy live music performances from talented student bands and local artists. The festival features multiple genres, food stalls, and a relaxed atmosphere perfect for unwinding after exams.",
      },
    }),
    prisma.event.create({
      data: {
        title: "English Corner",
        subtitle:
          "The EEE English Corner (E4C) is an engaging initiative that offers a relaxed space for participants to practice spoken English and improve their communication skills.",
        date: new Date("2025-03-14"),
        content:
          "Practice your English in a friendly, supportive environment. English Corner sessions include group discussions, presentations, and language games designed to build confidence and fluency.",
      },
    }),
    prisma.event.create({
      data: {
        title:
          "MSc Graduation Dinner 2025: Celebrating Success and New Beginnings",
        subtitle:
          "The MSc Graduation Dinner is an annual celebration recognising the achievements of graduating Master of Science students.",
        date: new Date("2025-05-09"),
        content:
          "Celebrate your achievements with fellow graduates, faculty, and family at our annual graduation dinner. Enjoy a formal dinner, speeches, awards ceremony, and entertainment as we mark this significant milestone.",
      },
    }),
    prisma.event.create({
      data: {
        title: "2025 CME Industrial Workshop",
        subtitle:
          "Organised by the Lifelong Learning Club and SGNOG, the workshop provided students insights on resume building, interview preparation, and networking.",
        date: new Date("2025-02-21"),
        content:
          "Prepare for your career with practical workshops on resume writing, interview techniques, and professional networking. Industry professionals share their insights and review your application materials.",
      },
    }),
    prisma.event.create({
      data: {
        title: "Alumni Sharing Session by Morris Liwen Xu",
        subtitle:
          "Morris Liwen Xu, EEE MSC alumnus, now a Data Scientist at DBS Bank Ltd, returned to share his career journey and offer valuable advice during a session with juniors.",
        date: new Date("2025-02-21"),
        content:
          "Hear firsthand from a successful alumnus about transitioning from MSc to industry. Morris shares his journey to becoming a Data Scientist at DBS Bank, including tips on job hunting, skill development, and career growth.",
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} events`);

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
