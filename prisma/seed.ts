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
  await prisma.club.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.event.deleteMany();

  console.log("✅ Cleared existing data");

  // Seed Clubs with Social Media
  console.log("🏛️ Seeding clubs with social media...");

  const clubs = await Promise.all([
    prisma.club.create({
      data: {
        name: "EEE Club",
        slug: "eee-club",
        description:
          "The official student club for all EEE students at NTU. We organize academic events, networking sessions, and social gatherings to foster a strong community among electrical and electronic engineering students. Join us for regular meetups, industry talks, and peer support throughout your master's journey.",
        category: "Academic",
        memberCount: 245,
        contactEmail: "eeeclub@e.ntu.edu.sg",
        website: "https://www.eeeclubntu.com",
        imageUrl: "/images/clubs/eee-club.jpg",
        instagram: "https://www.instagram.com/eeeclubntu",
        facebook: "https://www.facebook.com/eeeclubntu",
        linkedin: "https://www.linkedin.com/company/ntueeeclub/",
      },
    }),
    prisma.club.create({
      data: {
        name: "EEE LEAD",
        slug: "eee-lead",
        description:
          "EEE Leadership and Development Club focuses on developing leadership skills, professional competencies, and career readiness among EEE students. We conduct workshops on public speaking, project management, and teamwork. Perfect for students looking to enhance their soft skills and prepare for leadership roles.",
        category: "Professional",
        memberCount: 128,
        website: "https://www.instagram.com/ntueeelead/",
        imageUrl: "/images/clubs/eee-lead.jpg",
        instagram: "https://www.instagram.com/ntueeelead/",
        facebook: "https://facebook.com/ntueeelead",
      },
    }),
    prisma.club.create({
      data: {
        name: "EEE Outreach",
        slug: "eee-outreach",
        description:
          "Dedicated to community service and STEM education outreach. We organize tutoring programs for underprivileged students, science demonstrations at local schools, and technology workshops for the community. Make a difference while developing your communication and teaching skills.",
        category: "Social",
        memberCount: 87,
        contactEmail: "EEE-OUTREACH@ntu.edu.sg",
        website: "https://linktr.ee/ntueeeoutreach",
        imageUrl: "/images/clubs/eee-outreach.jpg",
        instagram: "https://www.instagram.com/eeeoutreach/",
        facebook:
          "https://www.linkedin.com/company/ntu-eee-outreach-committee/",
      },
    }),
    prisma.club.create({
      data: {
        name: "dEEEvelopers",
        slug: "deevelopers",
        description:
          "A coding and software development club for EEE students passionate about programming. We run hackathons, coding challenges, and collaborative projects. Whether you're interested in embedded systems, web development, or mobile apps, join us to code together and learn from peers.",
        category: "Technical",
        memberCount: 156,
        website: "https://www.linktr.ee/dEEEvelopers_eee",
        imageUrl: "/images/clubs/deevelopers.jpg",
        instagram: "https://instagram.com/deeevelopersntu",
        linkedin: "https://www.linkedin.com/company/ntu-eee-deeevelopers/",
      },
    }),
    prisma.club.create({
      data: {
        name: "Garage@EEE",
        slug: "garage-eee",
        description:
          "An innovation and maker space community where creativity meets engineering. Build prototypes, work on hardware projects, and access tools like 3D printers, soldering stations, and electronics kits. From robotics to IoT projects, bring your ideas to life in our collaborative workspace.",
        category: "Technical",
        memberCount: 93,
        contactEmail: "garageateee@ntu.edu.sg",
        website: "https://garage-eee.com/",
        imageUrl: "/images/clubs/garage-eee.jpg",
        instagram: "https://instagram.com/garageeeprojects",
        linkedin: "https://www.linkedin.com/company/garage-eee/",
      },
    }),
    prisma.club.create({
      data: {
        name: "Marvel Club@EEE",
        slug: "marvel-club-eee",
        description:
          "Microwave and Antennas Research and eValuation Lab Club brings together students interested in RF engineering, wireless communications, and electromagnetic theory. Participate in research projects, antenna design competitions, and technical seminars with industry experts in wireless technology.",
        category: "Academic",
        memberCount: 64,
        website: "https://marvelclubeee.github.io/",
        imageUrl: "/images/clubs/marvel-club.jpg",
        instagram: "https://instagram.com/marvel_club_eee",
        linkedin: "https://linkedin.com/company/marvel-club-eee",
      },
    }),
    prisma.club.create({
      data: {
        name: "MLDA@EEE",
        slug: "mlda-eee",
        description:
          "Machine Learning and Data Analytics Club explores the intersection of AI, machine learning, and electrical engineering. Join study groups on neural networks, computer vision, and data science. Perfect for students interested in applying ML to signal processing, power systems, and automation.",
        category: "Technical",
        memberCount: 203,
        contactEmail: "mlda-eee@ntu.edu.sg",
        website: "https://linktr.ee/mlda_eee",
        imageUrl: "/images/clubs/mlda-eee.jpg",
        instagram: "https://instagram.com/mlda_at_eee_ntu",
        facebook: "https://facebook.com/mldaateee",
        linkedin: "https://linkedin.com/company/mlda-at-eee",
      },
    }),
    prisma.club.create({
      data: {
        name: "NTU Clean Energy Club",
        slug: "clean-energy-club",
        description:
          "Promoting sustainability and renewable energy solutions. We work on solar power projects, energy efficiency initiatives, and organize talks about the future of clean energy. Join us if you're passionate about making engineering more sustainable and addressing climate challenges.",
        category: "Academic",
        memberCount: 112,
        website:
          "https://www.ntu.edu.sg/eee/student-life/ntu-clean-energy-club",
        imageUrl: "/images/clubs/clean-energy.jpg",
        instagram: "https://instagram.com/ncec_ntu",
        linkedin: "https://www.linkedin.com/company/ncec-at-ntu/",
      },
    }),
    prisma.club.create({
      data: {
        name: "VI Pod",
        slug: "vi-pod",
        description:
          "VI Pod provides students with practical hardware knowledge through workshops while promoting their Build, Learn, Teach (BLT) model. They kickstart students' learning journeys by offering hands-on experiences in building and acquiring hardware expertise.",
        category: "Professional",
        memberCount: 76,
        imageUrl: "/images/clubs/vi-pod.jpg",
        website: "https://www.ntu.edu.sg/eee/student-life/vi-pod",
      },
    }),
  ]);

  console.log(`✅ Created ${clubs.length} clubs`);

  // Create sample dining locations

  const dining = await Promise.all([
    prisma.diningLocation.create({
      data: {
        name: "McDonald's @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Western", "American", "Halal", "Vegetarian"],
        openingHours: "Mon–Sat: 7am–10pm | Sun & PH: 10am–8pm",
        imageUrl: "/images/food/mcdonalds.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Subway @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Western", "Halal", "Vegetarian"],
        openingHours: "Mon–Fri: 8am–9pm | Sat, Sun & PH: 11am–7pm",
        imageUrl: "/images/food/subway.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Starbucks @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Café"],
        openingHours: "Mon–Fri: 7am–10pm | Sat, Sun & PH: 8am–8pm",
        imageUrl: "/images/food/starbucks.jpg",
        priceRange: "$$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Popeyes @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Western", "American", "Halal"],
        openingHours: "Mon–Fri: 10am–9pm | Sat, Sun & PH: 11am–9pm",
        imageUrl: "/images/food/popeyes.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Pasta Express @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Italian", "Vegetarian"],
        openingHours: "Mon–Fri: 10:30am–7:30pm | Sat: 10:30am–1:30pm",
        imageUrl: "/images/food/pasta-express.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Paik's Bibim @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Korean", "Vegetarian"],
        openingHours: "Mon–Fri: 10am–9pm | Sat: 10am–8pm",
        imageUrl: "/images/food/paiks-bibim.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "South Spine Food Court",
        location: "South Spine",
        cuisine: [
          "Chinese",
          "Malay",
          "Indian",
          "Western",
          "Halal",
          "Vegetarian",
        ],
        openingHours: "Mon–Fri: 7am–8pm | Sat: 7am–2pm",
        imageUrl: "/images/food/south-spine-food-court.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "The Crowded Bowl @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Vegetarian only"],
        openingHours: "Mon–Fri: 8am–8pm | Sat: 8am–5pm",
        imageUrl: "/images/food/crowded-bowl.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Connect 71 Cafe @ NTU Innovation Centre",
        location: "NTU Innovation Centre",
        cuisine: ["Café", "Western"],
        openingHours: "Mon–Fri: 9am–9pm",
        imageUrl: "/images/food/connect71.jpg",
        priceRange: "$$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Domino's Pizza @ The Arc",
        location: "The Arc",
        cuisine: ["Pizza", "Western", "Vegetarian"],
        openingHours: "Daily: 10:30am–11pm",
        imageUrl: "/images/food/dominos.jpg",
        priceRange: "$$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "Encik Tan @ North Spine Plaza",
        location: "North Spine Plaza",
        cuisine: ["Malay", "Halal"],
        openingHours: "Daily: 9:30am–7:45pm",
        imageUrl: "/images/food/encik-tan.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
    prisma.diningLocation.create({
      data: {
        name: "North Spine Food Court",
        location: "North Spine Plaza",
        cuisine: ["Chinese", "Malay", "Indian", "Western", "Vegetarian"],
        openingHours: "Mon–Fri: 6:30am–8:30pm | Sat: 6:30am–2:30pm",
        imageUrl: "/images/food/north-spine-food-court.jpg",
        priceRange: "$",
        isOpen: true,
      },
    }),
  ]);

  console.log(`✅ Created ${dining.length} dining locations`);

  // Create sample study spots
  const studySpots = await Promise.all([
    prisma.studySpot.create({
      data: {
        name: "Nanyang Business School @ Wee Cho Yaw Plaza",
        location: "Wee Cho Yaw Plaza",
        capacity: "medium",
        amenities: ["Café", "Seating Areas", "Screens", "Breakout Rooms"],
        openingHours: "Open 24 hours",
        imageUrl: "/images/study-spots/nbs.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "The Hive @ Learning Hub South",
        location: "Learning Hub South",
        capacity: "medium",
        amenities: ["Screens", "Café", "WiFi", "Power Outlets"],
        openingHours: "Open 24 hours",
        imageUrl: "/images/study-spots/hive.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "ADM Library @ School of ADM",
        location: "School of ADM",
        capacity: "small",
        amenities: ["Quiet Zone", "WiFi"],
        openingHours: "Open 24 hours",
        imageUrl: "/images/study-spots/adm-library.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "NIE Library @ NIE Block 1",
        location: "NIE Block 1",
        capacity: "large",
        amenities: ["Power Outlets", "Quiet Zone", "WiFi"],
        openingHours: "Mon–Sat: 8:30am–8pm | Closed on Sundays",
        imageUrl: "/images/study-spots/nie-library.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "The Arc @ Learning Hub North",
        location: "Learning Hub North",
        capacity: "medium",
        amenities: ["Screens", "Power Outlets", "Group Study", "WiFi"],
        openingHours: "Daily: 5am–11:30pm",
        imageUrl: "/images/study-spots/arc.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "Lee Wee Nam Library @ North Spine",
        location: "North Spine",
        capacity: "large",
        amenities: [
          "WiFi",
          "Power Outlets",
          "Quiet Zone",
          "Group Study",
          "Screens",
        ],
        openingHours: "Mon–Sat: 8:30am–9:30pm | Closed on Sundays",
        imageUrl: "/images/study-spots/lwn-library.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "South Spine Benches",
        location: "South Spine",
        capacity: "small",
        amenities: ["Power Outlets", "Fan-cooled"],
        openingHours: "Open 24 hours",
        imageUrl: "/images/study-spots/south-spine-benches.jpg",
        isAvailable: true,
      },
    }),
    prisma.studySpot.create({
      data: {
        name: "North Spine Benches",
        location: "North Spine",
        capacity: "small",
        amenities: ["Power Outlets", "Fan-cooled"],
        openingHours: "Open 24 hours",
        imageUrl: "/images/study-spots/north-spine-benches.jpg",
        isAvailable: true,
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
        imageUrl: "/images/events/mid-autumn-festival.jpg",
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
        imageUrl: "/images/events/sgnog12.jpg",
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
        imageUrl: "/images/events/multiculture-walk.jpg",
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
        imageUrl: "/images/events/mandai-boardwalk.jpg",
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
        imageUrl: "/images/events/alumni-career-sharing.jpg",
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
        imageUrl: "/images/events/orientation-day.jpg",
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
        imageUrl: "/images/events/airport-pickup.jpg",
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
        imageUrl: "/images/events/music-festival.jpg",
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
        imageUrl: "/images/events/english-corner.jpg",
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
        imageUrl: "/images/events/graduation-dinner.jpg",
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
        imageUrl: "/images/events/cme-workshop.jpg",
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
        imageUrl: "/images/events/alumni-sharing-morris.jpg",
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
