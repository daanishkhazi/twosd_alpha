import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    tokensUsed: number;
    tokenQuota: number;
  }
  interface Session {
    user: {
      id: string;
      tokensUsed: number;
      tokenQuota: number;
    } & DefaultSession["user"];
  }
}
