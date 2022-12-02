import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = (+new Date()).toString(36).slice(-8);
  try {
    // first check if the user already has two codes
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.id,
      },
      include: {
        referralCodes: true,
      },
    });
    console.log("user", user);
    console.log("codes", user?.referralCodes);
    if (user!.referralCodes.length >= 2) {
      // if they have two or more already return an error
      res.status(405).json({ error: "You already have two codes" });
    } else {
      // if not, create a new code

      const newCode = await prisma.referralCode.create({
        data: {
          code: code,
          user: {
            connect: { email: req.body.email },
          },
        },
      });
      res.status(200).json({ newCode: newCode });
    }
  } catch (e) {
    console.error(e);
  }
}
