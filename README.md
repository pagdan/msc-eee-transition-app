# MSc EEE Student Transition Web Application

> A comprehensive web platform designed to support Master of Science in Electrical and Electronic Engineering (MSc EEE) freshmen during their transition into Nanyang Technological University (NTU).

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue) ![Prisma](https://img.shields.io/badge/Prisma-ORM-teal)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Azure AD Integration](#azure-ad-integration)
- [Context](#context)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

The transition into a master's programme presents significant challenges for incoming students, including adapting to new academic requirements, navigating campus resources, and integrating into a new social and cultural environment. This web application addresses these challenges through four comprehensive pillars:

### Core Pillars

1. **Calendar** — Personal event management with Microsoft Outlook integration architecture
2. **Community** — EEE clubs directory and social media hub
3. **Student Life** — Campus resources including dining recommendations, study spots, and transport information
4. **Well-being** — Emotional and physical wellness support and resources

---

## Features

### Authentication and User Management

- NextAuth.js-based authentication with JWT session strategy
- Demo credential-based login for prototyping purposes
- Role-based access control with student and admin roles
- Azure AD provider pre-configured and ready for activation upon NTU IT approval
- Session persistence and middleware-based route protection

### Landing Page and Dashboard

- Professional landing page with NTU branding (official colours: `#D7143F` red, `#181D62` navy)
- Dashboard with upcoming events grid and resource carousel
- Swiper.js carousel with fade effect and autoplay
- Responsive design for mobile and desktop
- Add to Calendar button on each dashboard event card

### Events System

- Full event CRUD with title, subtitle, date, image, content, and published status
- 12 seeded events drawn from real NTU MSc EEE programme activities
- Individual event detail pages with dynamic routing
- Add to Calendar integration on both the dashboard and event detail pages

### Calendar Module

- Interactive monthly grid calendar with previous and next month navigation
- Per-user personal events stored in the database, scoped by authenticated user
- Event creation via modal form with title, category, date, time, location, and description
- Five event categories with colour coding: Academic, Orientation, Social, Deadline, Personal
- Day panel showing events for the selected date with inline delete
- Next 7 Days panel for quick visibility of upcoming personal events
- Upcoming NTU community events section below the calendar with Add to Calendar functionality
- Outlook sync notice explaining the Azure AD pending approval constraint

### Community Module

- Clubs directory featuring 9 real NTU EEE student clubs
- Search and category filter (Academic, Technical, Professional, Social)
- Slug-based club detail pages with full descriptions
- Social media hub with Facebook, Instagram, and LinkedIn links per club
- Community landing page with Swiper.js carousel

### Student Life Module

- Food Recommendations page (`/student-life/food-recos`) with 12 real NTU dining locations
- Search and filter by cuisine, dietary requirement (Halal, Vegetarian), and location
- Halal and Vegetarian badge overlays on dining cards
- Google Maps links for each dining location
- Study Spots page (`/student-life/study-spots`) with 8 campus study locations
- Search and filter by capacity, amenities, and location
- Capacity badges (Small, Medium, Large) and amenity icon pills
- Google Maps links for 6 study spots with verified coordinates
- Getting Around page with NTU campus shuttle information and NTU Omnibus app links

### Well-being Module

- Emotional Well-being page with crisis contact banner, University Counselling Centre details, NTU support service cards, practical transition tips for MSc EEE students, and curated self-help resources including national helplines
- Physical Well-being page with campus gym details, NTU Swimming Complex hours and directions, racket and team sports facility tables, facility booking portal link, and SRC General Office contact information

### Contact System

- Fully functional contact form with client-side and server-side validation
- Database-backed submission storage via Prisma
- Success and error feedback on submission

### Admin Dashboard

- Protected `/admin` route group accessible only to users with the admin role
- Collapsible navy sidebar navigation with Back to App link
- Overview page with live counts for all content modules and a new submissions badge
- Full CRUD for Events with published/draft toggle
- Full CRUD for Dining Locations with inline visibility toggle
- Full CRUD for Study Spots with capacity selector and inline visibility toggle
- Full CRUD for Clubs with auto-generated slugs and social media fields
- Contact Submissions management with status tracking (new, read, resolved), full message detail modal, auto-mark as read on open, and Reply via Email shortcut

---

## Tech Stack

### Frontend

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first CSS framework
- **Swiper.js** — Touch slider for carousels
- **Lucide React** — Icon library

### Backend

- **Next.js API Routes** — Serverless API endpoints
- **NextAuth.js v4** — Authentication with JWT strategy
- **Prisma ORM** — Type-safe database client
- **PostgreSQL** — Relational database hosted on Supabase

### Development Tools

- **Zed** — Code editor
- **npm** — Package manager
- **Git and GitHub** — Version control
- **Prisma Studio** — Database inspection and management

### Deployment

- **Vercel** — Frontend and API hosting
- **Supabase** — PostgreSQL database hosting

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- PostgreSQL database or Supabase account
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/msc-eee-transition-portal.git
   cd msc-eee-transition-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database (Supabase)
   DATABASE_URL="postgresql://user:password@host:5432/database"
   DIRECT_URL="postgresql://user:password@host:5432/database"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32

   # Azure AD (optional - pending NTU IT approval)
   AZURE_AD_CLIENT_ID=""
   AZURE_AD_CLIENT_SECRET=""
   AZURE_AD_TENANT_ID=""
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Seed the database**

   ```bash
   npx prisma db seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Setting Up an Admin Account

After seeding the database, open Prisma Studio to promote a user to admin:

```bash
npx prisma studio
```

Locate the user in the `users` table and set the `role` field to `admin`. The admin dashboard is accessible at `/admin`.

### Development on Mobile

To test on a mobile device on the same network:

1. Find your machine's local IP address:

   ```bash
   ipconfig getifaddr en0   # macOS
   ipconfig                 # Windows
   ```

2. Start the development server with network access:

   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. Navigate to `http://YOUR-IP-ADDRESS:3000` on the mobile device.

---

## Project Structure

```
msc-eee-transition-portal/
├── src/
│   ├── app/
│   │   ├── (auth)/                   # Authentication routes
│   │   │   └── login/
│   │   ├── (dashboard)/              # Protected student-facing routes
│   │   │   ├── dashboard/
│   │   │   ├── calendar/
│   │   │   ├── community/
│   │   │   │   └── clubs/[slug]/
│   │   │   ├── student-life/
│   │   │   │   ├── food-recos/
│   │   │   │   ├── study-spots/
│   │   │   │   └── getting-around/
│   │   │   ├── wellbeing/
│   │   │   │   ├── emotional/
│   │   │   │   └── physical/
│   │   │   └── contact/
│   │   ├── admin/                    # Protected admin routes
│   │   │   ├── events/
│   │   │   ├── dining/
│   │   │   ├── study-spots/
│   │   │   ├── clubs/
│   │   │   └── contacts/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── calendar/events/
│   │   │   ├── events/
│   │   │   ├── contact/
│   │   │   ├── student-life/
│   │   │   │   ├── dining/
│   │   │   │   └── study-spots/
│   │   │   └── admin/
│   │   │       ├── events/
│   │   │       ├── dining/
│   │   │       ├── study-spots/
│   │   │       ├── clubs/
│   │   │       └── contacts/
│   │   └── layout.tsx
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   └── prisma.ts
│   ├── middleware.ts
│   └── types/
│       └── next-auth.d.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   └── images/
│       ├── events/
│       ├── food/
│       ├── study-spots/
│       └── clubs/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema

### Core Models

| Model             | Description                                      |
| ----------------- | ------------------------------------------------ |
| User              | Student profiles with role field (student/admin) |
| Account           | OAuth account linking for NextAuth               |
| Session           | User session management for NextAuth             |
| CalendarEvent     | Per-user personal calendar events                |
| Club              | EEE student clubs with social media fields       |
| DiningLocation    | Campus dining options with cuisine and hours     |
| StudySpot         | Study locations with capacity and amenities      |
| WellbeingResource | Mental health and wellness resources             |
| WellbeingLog      | Student mood and wellness tracking               |
| Event             | Dashboard and community events                   |
| Contact           | Contact form submissions with status tracking    |

### Key Relationships

```
User ──── CalendarEvent (one-to-many, userId)
User ──── WellbeingLog  (one-to-many, userId)
```

For the complete schema, refer to `prisma/schema.prisma`.

---

## Azure AD Integration

### Current Status

The application is architecturally prepared for Microsoft Azure Active Directory integration, which would enable Single Sign-On using NTU student credentials and Microsoft Outlook calendar synchronisation. The Azure AD provider in NextAuth.js is fully configured but commented out, pending approval from NTU IT Services.

### Migration Path

Once Azure AD credentials are issued, enabling the integration requires:

1. Uncommenting the `AzureADProvider` block in `src/lib/auth.ts`
2. Adding the three Azure AD environment variables to the deployment configuration
3. Updating the redirect URI in the Azure portal to match the production domain
4. Enabling Microsoft Graph API scopes for calendar read and write access

Estimated migration time upon credential receipt is one to two days.

---

## Context

This project is submitted as a Final Year Project for:

- **Programme:** Information Engineering and Media, Y4S2, 2026
- **Institution:** Nanyang Technological University

**Academic Integrity Note:** This project adheres to NTU's academic integrity policies.

---

## License

This project is developed as academic coursework for Nanyang Technological University. All rights reserved.

---

## Acknowledgments

- **Supervisor:** Prof Michelle Shao Xu Guang — Project guidance and feedback
