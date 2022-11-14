import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        console.log('t1', req.query.email)
        const user = await prisma.user.findUnique({
            where: {
                email: req.query.email as string,
              },
        })
        res.status(200).json({ result: {tokenBalance: user?.tokensUsed, tokenQuota: user?.tokenQuota} });
    } catch(e) {
        console.error(e)
    }
}