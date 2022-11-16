import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-08-01",
  });
  try {
    const subscription = await stripe.subscriptions.update(
      session?.user?.stripeSubscriptionId as string,
      {
        cancel_at_period_end: true,
      }
    );
    await prisma.user.update({
      where: {
        id: session?.user?.id as string,
      },
      data: {
        cancelRequested: true,
      },
    });
    res.status(200).json({ subscription });
  } catch (e) {
    console.error(e);
  }
}
