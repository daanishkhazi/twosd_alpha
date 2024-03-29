import { NextApiHandler } from "next";
import NextAuth, { Session, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "../../../lib/prisma";
import { userAgent } from "next/server";
import Stripe from "stripe";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const getTokenCountAndQuota = async (session: Session, user: User) => {
  const DBuser = await prisma.user.findUnique({
    where: {
      email: user.email as string,
    },
  });
  return {
    tokenBalance: user.tokensUsed,
    promptQuota: user.promptsQuota,
    promptBalance: user.promptsUsed,
  };
};

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // "any" typing used since Next Auth module augmentation not working properly - see issue #5576 on NextAuth GitHub
    async session({ session, user }: { session: Session; user: User }) {
      const {
        tokenBalance: tokenBalanceFromDB,
        promptQuota: promptsQuotaFromDB,
        promptBalance: promptsBalanceFromDB,
      } = await getTokenCountAndQuota(session, user);
      session.user.id = user.id;
      session.user.stripeCustomerId = user.stripeCustomerId;

      const dbUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      const referralCodes = await prisma.referralCode.findMany({
        where: {
          userId: user.id,
        },
        select: {
          code: true,
        },
      });
      const codes = referralCodes.map((code) => code.code);

      session.user.isActive = dbUser!.isActive;
      session.user.stripeSubscriptionId = dbUser!.stripeSubscriptionId;
      session.user.cancelRequested = dbUser!.cancelRequested;
      session.user.offWaitlist = dbUser!.offWaitlist;
      session.user.tokensUsed = tokenBalanceFromDB;
      session.user.promptsQuota = promptsQuotaFromDB;
      session.user.promptsUsed = promptsBalanceFromDB;
      session.user.referralCodes = codes;
      // session.user.tokenQuota = tokenQuotaFromDB;
      console.log("sess", session);
      return session;
    },
  },
  events: {
    createUser: async ({ user }: { user: User }) => {
      // Create stripe API client using the secret key env variable
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-08-01",
      });

      // Create a stripe customer for the user with their email address
      await stripe.customers
        .create({
          email: user.email!,
        })
        .then(async (customer) => {
          // Use the Prisma Client to update the user in the database with their new Stripe customer ID
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
      // generate two referral codes for the user
      try {
        const code1 = (+new Date()).toString(36).slice(-8);
        // make sure the second code is different
        let code2 = (+new Date()).toString(36).slice(-8);
        while (code1 === code2) {
          code2 = (+new Date()).toString(36).slice(-8);
        }
        const newCode1 = await prisma.referralCode.create({
          data: {
            code: code1,
            user: {
              connect: { email: user.email! },
            },
          },
        });
        const newCode2 = await prisma.referralCode.create({
          data: {
            code: code2,
            user: {
              connect: { email: user.email! },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  theme: {
    brandColor: "#e8798a",
    logo: "https://twosd-alpha.vercel.app/laera.svg",
  },
};
