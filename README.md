# MSc EEE Student Transition Web Application

> A comprehensive web platform designed to support Master of Science in Electrical and Electronic Engineering (MSc EEE) freshmen during their transition into Nanyang Technological University (NTU).

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue) ![Prisma](https://img.shields.io/badge/Prisma-ORM-teal)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Azure AD Integration](#azure-ad-integration)
- [Screenshots](#screenshots)
- [Future Development](#future-development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The transition into a master's program presents significant challenges for incoming students, including adapting to academic requirements, navigating campus resources, and integrating into a new social environment. This web application addresses these challenges through four comprehensive pillars:

### Core Pillars

1. **Calendar** - Academic timetable integration and event management
2. **Community** - Clubs directory and discussion forums
3. **Student Life** - Campus resources (dining, transportation, study spots)
4. **Well-being** - Mental health support and wellness tracking

---

## Features

### Completed Features

#### Authentication & User Management

- NextAuth.js-based authentication system
- Demo credential-based login (Azure AD ready)
- User profile management
- Session persistence

#### Landing Page & Dashboard

- Professional landing page with NTU branding (official colors: `#D7143F` red, `#181D62` blue)
- Comprehensive dashboard with quick access to all modules
- Resource carousel with Swiper.js integration
- Smooth fade effects and auto-play functionality
- Responsive design for mobile and desktop

#### Events System

- Event CRUD operations (Create, Read, Update, Delete)
- 12 seeded events covering:
  - Orientation activities (campus tours, welcome reception)
  - Academic workshops (research methodology, thesis writing)
  - Professional development (career planning, networking)
  - Wellness activities (stress management, fitness)
  - Social events (cultural celebration, sports day)
- Event detail pages with dynamic routing
- Event filtering and display
- Calendar integration architecture (Azure AD pending)

#### Community Module

- Community page layout and navigation
- Three-card carousel featuring:
  - Clubs directory entry point
  - Forum access
  - Social media links
- Database models for clubs and forums
- Foundation for forum system implementation

#### Contact System

- Fully functional contact form
- Backend API endpoint (`/api/contact`)
- Database integration for message storage
- Form validation and error handling
- Success confirmation messaging

#### Mobile Support

- Development server configured for mobile access
- Responsive design tested on iPhone
- Touch-optimized interfaces
- Mobile authentication flow

### In Progress Features

#### Forum System (Priority - 2-3 weeks)

- Post and comment CRUD operations
- UI for creating posts and threading comments
- Categories and tags organization
- Search functionality

#### Clubs Directory (1-2 weeks)

- Browse and search interface
- Club detail pages
- Join/leave functionality

### Planned Features

#### Calendar Integration

- Microsoft Outlook synchronization (pending Azure AD approval)
- Calendar event creation from web app
- Event reminders and notifications

#### Student Life Module

- Dining locations API integration
- Bus routes and transportation info
- Study spots directory

#### Well-being Module

- Mental health resources
- Mood tracking system
- Wellness activity logging

#### Admin Panel

- Role-based access control
- Content management system
- User management dashboard

#### Additional Features

- File upload system for images
- Global search functionality
- Email notifications
- In-app notifications

---

## Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Swiper.js** - Modern touch slider for carousels

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication solution
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database (hosted on Supabase)

### Development Tools

- **Zed** - Code editor
- **npm** - Package manager
- **Git** - Version control

### Deployment (Planned)

- **Vercel** - Frontend hosting
- **Supabase** - PostgreSQL database hosting

---

## Project Status

**Overall Completion: ~50-60%**

| Module               | Status              | Completion       |
| -------------------- | ------------------- | ---------------- |
| Authentication       | Complete            | 100%             |
| Landing Page         | Complete            | 100%             |
| Dashboard            | Complete            | 100%             |
| Events System        | Complete            | 100%             |
| Contact Form         | Complete            | 100%             |
| Community Layout     | Complete            | 100%             |
| Forum System         | In Progress         | 20%              |
| Clubs Directory      | Planned             | 0%               |
| Calendar Integration | Pending Azure AD    | 80% (code ready) |
| Student Life         | Planned             | 0%               |
| Well-being           | Planned             | 0%               |
| Admin Panel          | Planned             | 0%               |

**Estimated Remaining Development Time: 6-10 weeks**

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- npm or yarn

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
   # Application
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_NAME="MSc EEE Transition Portal"

   # Database
   DATABASE_URL="postgresql://user:password@host:5432/database"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here" # Generate: openssl rand -base64 32

   # Azure AD (Optional - for Microsoft integration)
   AZURE_AD_CLIENT_ID=""
   AZURE_AD_CLIENT_SECRET=""
   AZURE_AD_TENANT_ID=""

   # Microsoft Graph
   MICROSOFT_GRAPH_API_ENDPOINT="https://graph.microsoft.com/v1.0"
   ```

4. **Set up the database**

   ```bash
   # Run database migrations
   npx prisma migrate dev --name init

   # Seed the database with sample data
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Development on Mobile

To test on your iPhone or other mobile devices:

1. **Find your computer's IP address**

   ```bash
   ipconfig getifaddr en0  # macOS/Linux
   ipconfig  # Windows (look for IPv4 Address)
   ```

2. **Start the dev server with network access**

   ```bash
   npm run dev -- -H 0.0.0.0
   ```

3. **Access from mobile**

   Open `http://YOUR-IP-ADDRESS:3000` on your mobile device (ensure both devices are on the same network)

---

## Project Structure

```
msc-eee-transition-portal/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── login/               # Login page
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── calendar/            # Calendar module
│   │   ├── community/           # Community module
│   │   ├── student-life/        # Student life resources
│   │   └── wellbeing/           # Well-being module
│   ├── api/                     # API routes
│   │   ├── auth/                # NextAuth endpoints
│   │   ├── calendar/            # Calendar API
│   │   ├── community/           # Community API (clubs, forums)
│   │   ├── contact/             # Contact form API
│   │   └── wellbeing/           # Well-being API
│   └── layout.tsx               # Root layout
├── components/                   # Reusable React components
│   ├── Navbar.tsx               # Navigation bar
│   └── ...                      # Other shared components
├── lib/                         # Utility libraries
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client
│   └── microsoft-graph.ts       # MS Graph API integration
├── prisma/                      # Database
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Seed data script
│   └── migrations/              # Database migrations
├── public/                      # Static assets
├── docs/                        # Documentation
│   └── AZURE_INTEGRATION_PLAN.md  # Azure AD integration guide
├── .env.local                   # Environment variables (not in git)
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

---

## Database Schema

### Core Models

- **User** - Student profiles and authentication
- **Account** - OAuth account linking (NextAuth)
- **Session** - User sessions (NextAuth)
- **CalendarEvent** - Events and academic schedule
- **Club** - Student clubs and organizations
- **ClubMembership** - User-club relationships
- **ForumPost** - Discussion forum posts
- **ForumComment** - Post comments and replies
- **DiningLocation** - Campus dining options
- **StudySpot** - Study locations
- **BusRoute** - Campus transportation
- **WellbeingResource** - Mental health resources
- **WellbeingLog** - Mood and wellness tracking
- **Contact** - Contact form submissions

### Entity Relationship Overview

```
User ──┬── CalendarEvent (one-to-many)
       ├── ClubMembership (one-to-many)
       ├── ForumPost (one-to-many)
       ├── ForumComment (one-to-many)
       └── WellbeingLog (one-to-many)

Club ──── ClubMembership (one-to-many)

ForumPost ──── ForumComment (one-to-many)
```

For detailed schema, see `prisma/schema.prisma`

---

## Azure AD Integration

### Current Status

The application is **architecturally ready** for Microsoft Azure Active Directory integration, which would enable:

- Single Sign-On (SSO) with NTU credentials
- Microsoft Outlook calendar synchronization
- Access to Microsoft Graph API

**Challenge:** Azure AD app registration requires approval from NTU IT Services due to institutional security policies. This approval process is outside the scope of the current development timeline.

**Solution:** A demonstration authentication system has been implemented that mirrors the Azure AD user experience while development continues.

### Integration Architecture

The codebase is fully prepared for Azure AD integration:

- NextAuth.js Azure AD provider configured (commented out)
- Microsoft Graph API client implemented
- Calendar sync logic complete
- Token refresh handling ready
- Comprehensive documentation prepared

**Migration Path:** Once Azure AD credentials are obtained, integration requires only:

1. Uncommenting Azure AD provider in `lib/auth.ts`
2. Adding environment variables
3. Testing authentication flow

**Estimated migration time:** 1-2 days

### Documentation

For complete Azure AD integration details, see:

- `docs/AZURE_INTEGRATION_PLAN.md` - Comprehensive integration guide
- `lib/auth.ts` - Authentication configuration
- `lib/microsoft-graph.ts` - Graph API implementation

---

## Screenshots

### Landing Page

![Landing Page](docs/screenshots/landing-page.png)
_Professional landing page with NTU branding and feature showcase_

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)
_Central hub with events carousel and resource navigation_

### Events Display

![Events](docs/screenshots/events.png)
_12 seeded events covering orientation, workshops, and wellness activities_

### Community Module

![Community](docs/screenshots/community.png)
_Three-card carousel featuring clubs, forums, and social media_

### Contact Form

![Contact](docs/screenshots/contact-form.png)
_Fully functional contact system with database backend_

---

## Future Development

### Phase 1: Core Community Features (3-4 weeks)

- **Forum System** - Complete post/comment functionality
- **Clubs Directory** - Full browse and membership features
- **Calendar Integration** - If Azure AD approved

### Phase 2: Enhanced Features (3-5 weeks)

- **Student Life APIs** - Dining, transportation, study spots
- **Well-being Module** - Resources and mood tracking
- **Admin Panel** - Content and user management
- **File Upload** - Image handling for posts/profiles
- **Search** - Global search functionality

### Phase 3: Optional Enhancements (Time Permitting)

- Email notifications
- In-app notification system
- Advanced analytics
- Real-time features (WebSockets)
- PWA support

### Excluded Features

Based on time constraints and project scope:

- ❌ Real-time chat (deferred to future phases)
- ❌ Native mobile apps (focus on responsive web)
- ❌ Gamification features (focus on core functionality)

---

## Testing

### Current Testing Setup

- Manual testing on desktop (Chrome, Safari, Firefox)
- Mobile testing on iPhone
- API endpoint testing with sample data

### Planned Testing

- **Unit Tests** - Jest + React Testing Library
- **Integration Tests** - Complete user workflows
- **User Acceptance Testing** - 5-10 MSc EEE students
- **Performance Testing** - Page load optimization
- **Production Testing** - Staging environment validation

---

## Deployment

### Planned Production Environment

- **Platform**: Vercel (Frontend + API Routes)
- **Database**: Supabase PostgreSQL (Production instance)
- **Monitoring**: Vercel Analytics + Error tracking
- **Backups**: Automated daily database backups

### Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Production database migrations run
- [ ] Azure AD redirect URIs updated (when approved)
- [ ] Performance optimization complete
- [ ] Security audit passed
- [ ] User documentation finalized

---

## Academic Context

This is a Final Year Project (FYP) for:

- **Programme:** Information Engineering & Media, Year 4
- **Institution:** Nanyang Technological University
- **Project Type:** Individual academic coursework

**Academic Integrity Note:** This project adheres to NTU's academic integrity policies. All development is original work, and any AI assistance is properly managed to ensure no AI attribution in project submissions.

---

## License

This project is developed as academic coursework for Nanyang Technological University. All rights reserved.

---

## Contact

**Project Developer:** Robert
**Institution:** Nanyang Technological University
**Programme:** Year 4 Information Engineering & Media


---

## Acknowledgments

- **Supervisor:** Prof Michelle Shao Xu Guang - Project guidance and feedback
- **NTU IT Services** - Technical infrastructure support
- **MSc EEE Programme** - Problem domain insights
- **Open Source Community** - Amazing tools and frameworks

---

## Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/)

### Project Documents

- [Azure Integration Plan](docs/AZURE_INTEGRATION_PLAN.md)
- [Interim Report](docs/INTERIM_REPORT.md)
- [Presentation Slides](docs/PRESENTATION.pdf)

---

**Last Updated:** February 2026
**Version:** 0.6.0 (Development)
**Status:** Active Development
