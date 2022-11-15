import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    isActive: boolean;
    id: string;
    stripeCustomerId: string;
    tokensUsed: number;
    promptsUsed: number;
    promptsQuota: number;
  }
  interface Session {
    user: {
      isActive: boolean;
      id: string;
      stripeCustomerId: string;
      tokensUsed: number;
      promptsUsed: number;
      promptsQuota: number;
    } & DefaultSession["user"];
  }
}