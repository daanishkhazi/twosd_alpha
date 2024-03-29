import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";

const createCheckout = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-08-01",
  });

  const session = await getSession({ req });
  console.log("session", session);

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  let success_url = `http://laera.xyz/?session_id={CHECKOUT_SESSION_ID}`;
  let cancel_url = "http://laera.xyz/?cancelledPayment=true";

  // Check if local
  if (process.env.NODE_ENV === "development") {
    success_url = `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`;
    cancel_url = "http://localhost:3000/?cancelledPayment=true";
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.user.stripeCustomerId,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: success_url,
    cancel_url: cancel_url,
    subscription_data: {
      metadata: {
        payingUserId: session.user.id,
      },
    },
  });

  if (!checkoutSession) {
    return res.status(500).send("Error creating checkout session");
  }

  return res.status(200).json({ redirectUrl: checkoutSession.url });
};

export default createCheckout;
