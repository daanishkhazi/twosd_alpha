import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "../../../lib/prisma";

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripeHook = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const requestBuffer = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-08-01",
    });

    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret!
      );
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook signature verification failed.`);
    }
    // Handle the event
    // All the types are here: https://stripe.com/docs/api/events/types
    switch (event.type) {
      // Handle successful subscription creation
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("created", subscription);
        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: true,
            promptsQuota: 500,
            stripeSubscriptionId: subscription.id as string,
          },
        });
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("updated", subscription);
        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: true,
            promptsQuota: 500,
            stripeSubscriptionId: subscription.id as string,
          },
        });
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("deleted", subscription);
        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: false,
            promptsQuota: 25,
          },
        });
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err) {
    // Return a 500 error
    console.log(err);
    res.status(500).end();
  }
};

export default stripeHook;
