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
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt:
      "Biology Tutor: Explain like I'm five why mitochondria is the powerhouse of the cell.",
    temperature: 0.4,
    max_tokens: 100,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
