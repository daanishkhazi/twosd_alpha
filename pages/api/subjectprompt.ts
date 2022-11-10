import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 
    const promptList = await prisma.prompt.findMany({})
    const subjectList = await prisma.subject.findMany({})
    res.status(200).json({ result: {promptList: promptList, subjectList: subjectList} });
}