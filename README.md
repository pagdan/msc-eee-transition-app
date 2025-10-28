# Web Application with Calendar Integration to Support MSc EEE Freshmen Transition at NTU

A comprehensive web application with calendar integration to support MSc Electrical and Electronic Engineering freshmen during their transition at Nanyang Technological University.

## Features

- **Calendar Integration**: Sync with Microsoft Outlook for academic timetables and events
- **Community**: Join clubs, participate in forums, and connect with peers
- **Student Life**: Campus resources, dining options, and study spots
- **Wellbeing**: Mental health resources and wellness tracking

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Microsoft Azure AD
- **Calendar**: Microsoft Graph API

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Microsoft Azure AD application (for NTU SSO and Outlook integration)

## Getting Started

### 1. Clone and Install

```bash
# Create the project
npx create-next-app@latest msc-eee-transition-app --typescript --tailwind --app --no-src-dir --import-alias "@/*"

cd msc-eee-transition-app

# Install dependencies
npm install prisma @prisma/client
npm install @microsoft/microsoft-graph-client @azure/msal-node
npm install next-auth@beta
npm install zod date-fns lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs

# Install dev dependencies
npm install -D prisma
```

### 2. Set Up Database

```bash
# Initialize Prisma
npx prisma init

# Copy the schema provided in prisma/schema.prisma

# Create and run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/msc_eee_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Microsoft Azure AD
AZURE_AD_CLIENT_ID="your-client-id"
AZURE_AD_CLIENT_SECRET="your-client-secret"
AZURE_AD_TENANT_ID="your-tenant-id"

# Microsoft Graph API
MICROSOFT_GRAPH_API_ENDPOINT="https://graph.microsoft.com/v1.0"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="MSc EEE Transition Portal"
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 4. Set Up Microsoft Azure AD (using demo login instead, ignore for now)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Create a new registration:
   - Name: MSc EEE Transition Portal
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: Web - `http://localhost:3000/api/auth/callback/azure-ad`
4. Copy the Application (client) ID → `AZURE_AD_CLIENT_ID`
5. Copy the Directory (tenant) ID → `AZURE_AD_TENANT_ID`
6. Go to Certificates & secrets → New client secret → Copy value → `AZURE_AD_CLIENT_SECRET`
7. Go to API permissions → Add permission:
   - Microsoft Graph → Delegated permissions
   - Add: `User.Read`, `Calendars.ReadWrite`, `openid`, `profile`, `email`
   - Grant admin consent

### 5. Run the Application

```bash
# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Database Management

```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Create a new migration after schema changes
npx prisma migrate dev --name migration_name
```

### 7. Useful Commands

```bash
# Run Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate

# Run migrations
npx prisma migrate dev

# Run seed
npx prisma db seed

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
msc-eee-transition-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/           # Auth pages
│   ├── (dashboard)/      # Protected dashboard pages
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── calendar/         # Calendar components
│   ├── community/        # Community components
│   └── layout/           # Layout components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth config
│   ├── prisma.ts         # Prisma client
│   └── microsoft-graph.ts # MS Graph helpers
├── prisma/               # Database schema
└── types/                # TypeScript types
```

## Key Features Implementation

### Calendar Integration

- Syncs with Microsoft Outlook using Graph API
- Displays academic timetables and orientation schedules
- Create custom events

### Community Features

- Browse and join clubs
- Discussion forums with categories
- Peer networking

### Student Life Resources

- Dining recommendations with filters
- Campus bus routes and schedules
- Study spot locations with amenities

### Wellbeing Module

- Mental health resources
- Counseling services information
- Wellness tracking (mood logs)

### Contact Us

- Contacts: Email & Phone Numbers
- Office Hours
- Contact Us Form

## Development Tips

1. **Database Changes**: Always run `npx prisma migrate dev` after modifying `schema.prisma`
2. **Type Safety**: Run `npx prisma generate` to update Prisma client types
3. **Testing API Routes**: Use tools like Postman or Thunder Client
4. **Mobile Testing**: Use Chrome DevTools device emulator or test on actual devices

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Update these environment variables in production:

- `NEXTAUTH_URL` → Your production URL
- `DATABASE_URL` → Production database connection string
- Update Azure AD redirect URI to production URL

### Database Hosting Options

- **Supabase**: Free PostgreSQL hosting
- **PlanetScale**: MySQL-compatible database
- **Railway**: PostgreSQL with free tier

## Contributing

This is a Final Year Project for NTU. For questions or suggestions, please email me here: pagd0001@e.ntu.edu.sg

## License

© 2025 Nanyang Technological University

## Support

For technical issues or questions:

- Check the documentation in `/docs`
- Review API routes in `/app/api`
- Consult Prisma schema in `/prisma/schema.prisma`

---

**Project Status**: In Development
**Academic Year**: 2024/2025
**Programme**: BSc Information Engineering & Media, Year 4
