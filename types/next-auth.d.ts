import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    isActive: boolean;
    id: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string | null;
    cancelRequested: boolean;
    offWaitlist: boolean;
    tokensUsed: number;
    promptsUsed: number;
    promptsQuota: number;
    referralCodes: string[];
    offWaitlist?: boolean;
  }
  interface Session {
    user: {
      isActive: boolean;
      id: string;
      stripeCustomerId: string;
      stripeSubscriptionId: string | null;
      cancelRequested: boolean;
      offWaitlist: boolean;
      tokensUsed: number;
      promptsUsed: number;
      promptsQuota: number;
      referralCodes: string[];
    } & DefaultSession["user"];
  }
}
