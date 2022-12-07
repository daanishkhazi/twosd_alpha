import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  try {
    const code = await prisma.referralCode.findUnique({
      where: {
        code: req.body.code,
      },
    });
    if (code && !code.used) {
      await prisma.user.update({
        where: {
          email: req.body.email,
        },
        data: {
          offWaitlist: true,
          referred: {
            connect: { code: req.body.code },
          },
        },
      });
      await prisma.referralCode.update({
        where: {
          code: req.body.code,
        },
        data: {
          used: true,
        },
      });
      res.status(200).json({ result: { offWaitlist: true } });
    } else {
      // return an error if the code is not found or has already been used
      res.status(405).json({ error: "Invalid Code" });
    }
  } catch (e) {
    console.error(e);
  }
}
