import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Azure AD Provider (for NTU SSO + Outlook integration)
    // Uncomment when you have Azure AD credentials
    /*
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
    */

    // Credentials provider for development/testing
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your.email@ntu.edu.sg",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For development - just check if user exists
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // In production, verify password hash here
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // For now, accept any password for existing users
        // TODO: Add proper password hashing with bcrypt
        if (!user) {
          // Auto-create user for testing
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split("@")[0],
            },
          });
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            image: newUser.image,
          };
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Add access token to session for MS Graph API calls
      if (session.user) {
        session.user.id = token.sub!;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    // ✅ Fixed redirect callback
    async redirect({ url, baseUrl }) {
      // Always use relative paths to work with any domain/IP
      // If the url is a relative path, use it directly
      if (url.startsWith("/")) {
        return url;
      }

      // If it's an absolute URL on the same origin, extract the path
      try {
        const urlObj = new URL(url);
        const baseUrlObj = new URL(baseUrl);

        // If same origin, return the path
        if (urlObj.origin === baseUrlObj.origin) {
          return urlObj.pathname;
        }
      } catch (e) {
        // If URL parsing fails, default to dashboard
      }

      // Default: redirect to dashboard (relative path)
      return "/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
