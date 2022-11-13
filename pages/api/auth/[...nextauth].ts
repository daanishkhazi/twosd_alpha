import { NextApiHandler } from "next";
import NextAuth, {Session, User} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "../../../lib/prisma";
import { userAgent } from "next/server";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const getTokenCountAndQuota = async (session: Session, user: User) => {
    const DBuser = await prisma.user.findUnique({
        where: {
            email: user.email as string,
          },
    })
    return {tokenBalance: user.tokensUsed, tokenQuota: user.tokenQuota}
};

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    })
  ],
  callbacks: {
    // "any" typing used since Next Auth module augmentation not working properly - see issue #5576 on NextAuth GitHub
    async session({session, user}: {session: Session, user: User}) {
      const {tokenBalance: tokenBalanceFromDB, tokenQuota: tokenQuotaFromDB} = await getTokenCountAndQuota(session, user) 
      session.user.tokensUsed = tokenBalanceFromDB;
      session.user.tokenQuota = tokenQuotaFromDB;
      console.log('sess', session)
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};