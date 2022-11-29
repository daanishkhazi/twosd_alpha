import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const subjectNames: { [key: string]: string } = {
  Biology:
    "Biology Tutor: I am a biology tutor with special expertise in High School and College level biology. I answer questions precisely, making sure that the specific topic or doubt you raise is directly addressed. Additionally, I provide the right amount of nuance, detail and concrete examples to support my answers.\n",
  "US History":
    "US History Tutor: I am a history tutor with special expertise in High School and College level history. I answer questions precisely, making sure that the specific topic or doubt you raise is directly addressed. Additionally, I provide the right amount of nuance, detail and concrete examples to support my answers.\n",
  "Computer Science":
    "Computer Science Tutor: I am a computer science tutor with special expertise in High School and College level computer science. I answer questions precisely, making sure that the specific topic or doubt you raise is directly addressed. Additionally, I provide the right amount of nuance, detail and concrete examples to support my answers.\n",
  "World History":
    "World History Tutor: I am a World History tutor with special expertise in High School and College level medicine. I answer questions precisely, making sure that the specific topic or doubt you raise is directly addressed. Additionally, I provide the right amount of nuance, detail and concrete examples to support my answers.\n",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const firstExample = req.body.firstExample;
    const secondExample = req.body.secondExample;
    const subject = req.body.subject;
    const prompt = req.body.prompt;
    let query = req.body.query;
    // if first two characters are not uppercase
    if (query.slice(0, 2) !== query.slice(0, 2).toUpperCase()) {
      query = query[0].toLowerCase() + query.substring(1);
    }
    if (query.slice(-1) != "?") {
      query = query + "?";
    }
    const outputLimit = req.body.outputLimit;
    const finalQuery =
      subjectNames[subject] +
      firstExample +
      secondExample +
      "You: " +
      prompt +
      query;

    console.log("finalQuery", finalQuery);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: finalQuery,
      temperature: 0.35,
      max_tokens: outputLimit,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ["You:"],
    });
    let answer = completion.data.choices[0].text;
    answer = answer?.replace("Biology Tutor: ", "");
    answer = answer?.replace("World History Tutor: ", "");
    answer = answer?.replace("US History Tutor: ", "");
    answer = answer?.replace("Computer Science Tutor: ", "");
    answer = answer?.replace("History Tutor: ", "");
    res.status(200).json({
      result: answer,
      usage: completion.data.usage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
