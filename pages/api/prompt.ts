import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.body.query,
    temperature: 0.4,
    max_tokens: req.body.output_limit,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
