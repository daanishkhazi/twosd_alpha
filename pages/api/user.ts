import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // update user name to new name from settings.tsx
    console.log("user post", req.body);
    const user = await prisma.user.update({
      where: { email: req.body.email },
      data: { name: req.body.name },
    });
    res.status(200).json({ result: { user: user } });
  } catch (e) {
    console.error(e);
  }
}
