import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        // console.log(req.body)
        const tokenBalance = await prisma.user.update({
            where: {email: req.body.email},
            data: {tokensUsed: req.body.tokens, promptsUsed: req.body.prompts}
        })        

        res.status(200).json({ result: {tokenBalance: tokenBalance} });} catch (e) {
            console.error(e)
        }
}
  