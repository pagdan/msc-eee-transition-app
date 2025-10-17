# Microsoft Azure AD Integration Plan

**MSc EEE Transition Portal - Nanyang Technological University**

## Executive Summary

This document outlines the technical implementation plan for integrating Microsoft Azure Active Directory (Azure AD) authentication and Microsoft Graph API for calendar synchronization in the MSc EEE Transition Portal. The application architecture is designed and implemented to support enterprise-grade Microsoft integration, pending institutional Azure AD access approval.

---

## Table of Contents

1. [Overview](#overview)
2. [Current Implementation Status](#current-implementation-status)
3. [Authentication Architecture](#authentication-architecture)
4. [Required Azure AD Configuration](#required-azure-ad-configuration)
5. [Implementation Details](#implementation-details)
6. [Security Considerations](#security-considerations)
7. [Production Deployment Steps](#production-deployment-steps)
8. [Testing Strategy](#testing-strategy)
9. [Timeline and Dependencies](#timeline-and-dependencies)
10. [References](#references)

---

## Overview

### Purpose

The MSc EEE Transition Portal requires seamless authentication and calendar integration for NTU students. Microsoft Azure AD integration provides:

- **Single Sign-On (SSO)**: Students authenticate using existing NTU credentials
- **Calendar Synchronization**: Automatic integration with Outlook calendars
- **Enhanced Security**: Institutional-level authentication and authorization
- **Improved UX**: No additional credentials to remember

### Scope

This integration plan covers:

- Azure AD authentication configuration
- Microsoft Graph API integration for Outlook calendars
- Security and data privacy considerations
- Production deployment procedures

---

## Current Implementation Status

### ✅ Completed Components

#### 1. Authentication Infrastructure

- **NextAuth.js Configuration** (`lib/auth.ts`)
  - Azure AD provider configured (currently commented out)
  - Credentials provider for development/demo
  - JWT session strategy
  - Callback handlers for token management

#### 2. Microsoft Graph API Integration (`lib/microsoft-graph.ts`)

- Graph client initialization
- Calendar event retrieval functions
- Calendar event creation functions
- User profile fetching
- Error handling and logging

#### 3. API Routes

- `/api/auth/[...nextauth]` - Authentication endpoints
- `/api/calendar/events` - Calendar CRUD operations with Outlook sync capability
- Session management and authorization checks

#### 4. User Interface

- Professional Microsoft login page with brand-consistent design
- Calendar page with sync functionality
- Dashboard with navigation
- Mobile-responsive layouts

#### 5. Database Schema

- User authentication tables (Prisma)
- Calendar event storage
- Outlook event ID tracking for synchronization

### 🔄 Pending Components

- Azure AD app registration (requires NTU IT approval)
- Production environment variables
- Institutional security review

---

## Authentication Architecture

### Authentication Flow Diagram

```
┌─────────────┐
│   Student   │
└──────┬──────┘
       │ 1. Clicks "Sign in with Microsoft"
       ▼
┌─────────────────────┐
│  Next.js Frontend   │
└──────┬──────────────┘
       │ 2. Redirects to Azure AD
       ▼
┌─────────────────────┐
│  Microsoft Azure AD │
│   (NTU Tenant)      │
└──────┬──────────────┘
       │ 3. User authenticates
       │ 4. Grants permissions
       ▼
┌─────────────────────┐
│   Redirect Back     │
│   with Auth Code    │
└──────┬──────────────┘
       │ 5. Exchange code for tokens
       ▼
┌─────────────────────┐
│   NextAuth.js       │
│   Backend           │
└──────┬──────────────┘
       │ 6. Create session
       │ 7. Store tokens
       ▼
┌─────────────────────┐
│   User Dashboard    │
└─────────────────────┘
```

### OAuth 2.0 Flow

The application implements the **Authorization Code Flow with PKCE**, which is the recommended OAuth 2.0 flow for web applications:

1. **Authorization Request**: User is redirected to Microsoft login
2. **User Consent**: User authenticates and grants permissions
3. **Authorization Code**: Azure AD returns authorization code
4. **Token Exchange**: Backend exchanges code for access/refresh tokens
5. **API Access**: Access token used for Microsoft Graph API calls

---

## Required Azure AD Configuration

### Prerequisites

- Access to NTU Azure AD tenant
- Administrative permissions for app registration
- Security review approval

### App Registration Details

#### Basic Information

- **Application Name**: MSc EEE Transition Portal
- **Supported Account Types**: Accounts in this organizational directory only (NTU - Single tenant)
- **Application Type**: Web

#### Redirect URIs

**Development:**

```
http://localhost:3000/api/auth/callback/azure-ad
```

**Staging:**

```
https://staging-msc-eee-portal.vercel.app/api/auth/callback/azure-ad
```

**Production:**

```
https://msc-eee-portal.ntu.edu.sg/api/auth/callback/azure-ad
```

#### API Permissions

| Permission            | Type      | Purpose                        | Admin Consent Required |
| --------------------- | --------- | ------------------------------ | ---------------------- |
| `openid`              | Delegated | OpenID Connect authentication  | No                     |
| `profile`             | Delegated | Basic user profile             | No                     |
| `email`               | Delegated | User email address             | No                     |
| `User.Read`           | Delegated | Read user's full profile       | No                     |
| `Calendars.ReadWrite` | Delegated | Read and write user's calendar | Yes                    |

**Note**: `Calendars.ReadWrite` requires admin consent from NTU IT administrators.

#### Client Secret

- **Description**: MSc EEE Portal Production Secret
- **Expiration**: 24 months (recommended)
- **Security**: Store in environment variables, never commit to repository

---

## Implementation Details

### Environment Variables

Required configuration in `.env.local` (development) and production environment:

```env
# NextAuth Configuration
NEXTAUTH_URL="https://your-app-url.com"
NEXTAUTH_SECRET="[generated-secret-key]"

# Azure AD Configuration
AZURE_AD_CLIENT_ID="[application-client-id]"
AZURE_AD_CLIENT_SECRET="[client-secret-value]"
AZURE_AD_TENANT_ID="[ntu-tenant-id]"

# Microsoft Graph API
MICROSOFT_GRAPH_API_ENDPOINT="https://graph.microsoft.com/v1.0"

# Database
DATABASE_URL="[postgres-connection-string]"
```

### Code Configuration

#### 1. Enable Azure AD Provider

In `lib/auth.ts`, uncomment the Azure AD provider:

```typescript
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read Calendars.ReadWrite",
        },
      },
    }),
    // Keep credentials provider for admin access
  ],
  // ... rest of configuration
};
```

#### 2. Calendar Sync Implementation

The calendar sync is already implemented in `/api/calendar/events`:

```typescript
// Syncs Outlook calendar when syncOutlook=true parameter is passed
if (syncOutlook && session.accessToken) {
  const outlookEvents = await getCalendarEvents(
    session.accessToken,
    startDate,
    endDate,
  );

  // Upsert events to local database
  for (const event of outlookEvents) {
    await prisma.calendarEvent.upsert({
      where: { outlookId: event.id },
      update: {
        /* event data */
      },
      create: {
        /* event data */
      },
    });
  }
}
```

#### 3. Microsoft Graph API Calls

All Graph API functions are implemented in `lib/microsoft-graph.ts`:

- `getCalendarEvents()` - Fetch calendar events
- `createCalendarEvent()` - Create new events
- `getUserProfile()` - Get user information

---

## Security Considerations

### Data Privacy

1. **Token Storage**:
   - Access tokens stored in JWT session (encrypted)
   - Refresh tokens stored in database (encrypted at rest)
   - Tokens never exposed to client-side JavaScript

2. **Minimal Permissions**:
   - Request only necessary Graph API scopes
   - Calendar access is read/write only (not delete)

3. **Data Retention**:
   - User data deleted upon account deletion
   - Calendar events cached locally for performance
   - Original Outlook events remain unchanged

### Compliance

- **PDPA (Singapore)**: User consent obtained before data collection
- **NTU Policies**: Compliant with institutional data handling policies
- **Microsoft Security**: Follows Microsoft identity platform best practices

### Authentication Security

1. **HTTPS Only**: All production traffic encrypted with TLS
2. **CSRF Protection**: Built into NextAuth.js
3. **Session Expiry**: Configurable session timeout
4. **Token Refresh**: Automatic refresh token rotation

---

## Production Deployment Steps

### Phase 1: Azure AD Setup (Est. 1-2 weeks)

**Step 1.1: Submit Request to NTU IT**

- Contact: ntu-it-support@ntu.edu.sg
- Subject: "Azure AD App Registration Request - MSc EEE Transition Portal"
- Include: Application purpose, security measures, data handling

**Step 1.2: Security Review**

- Provide application architecture documentation
- Data flow diagrams
- Security measures implementation
- Privacy policy compliance

**Step 1.3: App Registration**

- IT creates app registration
- Configure redirect URIs
- Set up API permissions
- Grant admin consent

**Step 1.4: Obtain Credentials**

- Receive Client ID
- Receive Client Secret
- Receive Tenant ID

### Phase 2: Configuration (Est. 2-3 days)

**Step 2.1: Update Environment Variables**

```bash
# In production environment (Vercel/Railway)
vercel env add AZURE_AD_CLIENT_ID
vercel env add AZURE_AD_CLIENT_SECRET
vercel env add AZURE_AD_TENANT_ID
```

**Step 2.2: Enable Azure AD Provider**

- Uncomment provider in `lib/auth.ts`
- Update login page to use Azure AD
- Remove demo login button

**Step 2.3: Update Database**

```bash
# Run any necessary migrations
npx prisma migrate deploy
```

### Phase 3: Testing (Est. 3-5 days)

**Step 3.1: Staging Environment Testing**

- Deploy to staging environment
- Test authentication flow
- Test calendar synchronization
- Test token refresh
- Test session expiry

**Step 3.2: User Acceptance Testing**

- Select 5-10 test users from MSc EEE cohort
- Provide testing guidelines
- Collect feedback
- Fix identified issues

**Step 3.3: Load Testing**

- Simulate concurrent users
- Test API rate limits
- Monitor performance
- Optimize as needed

### Phase 4: Production Deployment (Est. 1 week)

**Step 4.1: Final Security Review**

- Code audit
- Dependency vulnerability scan
- Penetration testing (if required by NTU)

**Step 4.2: Deploy to Production**

```bash
# Deploy via Vercel (or chosen platform)
git push origin main
vercel --prod
```

**Step 4.3: Monitor**

- Set up error tracking (Sentry/LogRocket)
- Monitor authentication success rate
- Track API usage
- Monitor calendar sync performance

**Step 4.4: User Onboarding**

- Send announcement email to MSc EEE students
- Provide user guide
- Set up support channel
- Collect feedback

---

## Testing Strategy

### Unit Tests

```typescript
// Example test for Microsoft Graph integration
describe("Microsoft Graph API", () => {
  it("should fetch calendar events with valid token", async () => {
    const mockToken = "mock-access-token";
    const events = await getCalendarEvents(mockToken);
    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
  });

  it("should handle expired token gracefully", async () => {
    const expiredToken = "expired-token";
    await expect(getCalendarEvents(expiredToken)).rejects.toThrow(
      "Failed to fetch calendar events",
    );
  });
});
```

### Integration Tests

- Test complete authentication flow
- Test calendar sync end-to-end
- Test token refresh mechanism
- Test error scenarios

### Manual Testing Checklist

- [ ] User can sign in with NTU email
- [ ] User profile information loads correctly
- [ ] Calendar sync retrieves Outlook events
- [ ] New events can be created
- [ ] Events display correct date/time
- [ ] Logout works properly
- [ ] Session persists across page refreshes
- [ ] Mobile responsiveness works
- [ ] Error messages are user-friendly

---

## Timeline and Dependencies

### Critical Path

```
S1
Week 9:   Azure AD Access Request → NTU IT Approval
          ↓
Week 11:  App Registration → Credentials Obtained
          ↓
Week 13:  Configuration → Environment Setup
          ↓
S2
Week 1:   Testing → Staging Deployment
          ↓
Week 3:   UAT → Feedback & Fixes
          ↓
Week 5:   Security Review → Final Approval
          ↓
Week 7:   Production Deployment → Monitoring
```

### Dependencies

**External:**

- NTU IT approval for Azure AD access
- Security review completion
- Admin consent for API permissions

**Internal:**

- Staging environment setup
- Production database provisioning
- Monitoring tools configuration

### Risks and Mitigation

| Risk                | Impact | Probability | Mitigation                                  |
| ------------------- | ------ | ----------- | ------------------------------------------- |
| Delayed IT approval | High   | Medium      | Start process early, maintain communication |
| API rate limits     | Medium | Low         | Implement caching, request throttling       |
| Token expiry issues | Medium | Low         | Implement robust refresh logic              |
| User adoption       | Medium | Medium      | Provide clear documentation, support        |

---

## Current Demo Implementation

For Final Year Project demonstration purposes, the application currently uses:

### Credentials-Based Authentication

- Simulates Microsoft SSO user experience
- Creates user accounts automatically
- Supports development and testing

### Mock Calendar Sync

- UI/UX matches production design
- Sync button prepared for Outlook integration
- Local calendar event storage

### Production-Ready Architecture

- All integration code implemented
- Waiting only for Azure AD credentials
- Environment variables configuration

**Estimated Time to Production**: 1-2 days after receiving Azure AD credentials

---

## References

### Microsoft Documentation

- [Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/)
- [Calendar API reference](https://docs.microsoft.com/en-us/graph/api/resources/calendar)

### Libraries Used

- [NextAuth.js](https://next-auth.js.org/) - v4.24.7
- [Microsoft Graph Client](https://www.npmjs.com/package/@microsoft/microsoft-graph-client) - v3.0.7
- [Next.js](https://nextjs.org/) - v15.5.4

### NTU Resources

- NTU MSc EEE Contact: https://www.ntu.edu.sg/eee/admissions/programmes/graduate-programmes/msc/contact-msc
- NTU Msc EEE Main Page: https://www.ntu.edu.sg/eee/admissions/programmes/graduate-programmes/msc

---

## Appendix

### A. Environment Variable Template

```env
# .env.example
# Copy this to .env.local and fill in actual values

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="MSc EEE Transition Portal"

# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"

# Azure AD (obtain from NTU IT)
AZURE_AD_CLIENT_ID="[application-client-id]"
AZURE_AD_CLIENT_SECRET="[client-secret-value]"
AZURE_AD_TENANT_ID="[ntu-tenant-id]"

# Microsoft Graph
MICROSOFT_GRAPH_API_ENDPOINT="https://graph.microsoft.com/v1.0"
```

### B. Contact Information

**Project Team:**

- Developer: Pagdanganan Robert Martin Gosioco
- Supervisor: Michelle, Xu Shao Guang
- Email: PAGD0001@e.ntu.edu.sg

---

**Document Version**: 1.0
**Last Updated**: October 17, 2025
**Status**: Pending Azure AD Access Approval
