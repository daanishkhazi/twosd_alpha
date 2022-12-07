import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dbWrite = await prisma.queryOutputPair.create({
      data: {
        subject: {
          connect: { name: req.body.subject },
        },
        prompt: {
          connect: { description: req.body.prompt },
        },
        author: {
          connect: { email: req.body.email },
        },
        query: req.body.history[0],
        output: req.body.history[1],
        tokens: req.body.tokens,
      },
    });

    res.status(200).json({ result: { writeOutput: dbWrite } });
  } catch (e) {
    console.error(e);
  }
}
