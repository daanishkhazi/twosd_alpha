import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const subjectNames: { [key: string]: string } = {
  Biology:
    "Biology Tutor: I am a biology tutor with special expertise in High School and College level biology. I answer questions thoroughly and with the right amount of nuance.\nYou: Why are mitochondria called the powerhouse of the cell?\nBiology Tutor: Mitochondria are tiny organelles inside cells that are involved in releasing energy from food. This process is known as cellular respiration. It is for this reason that mitochondria are often referred to as the powerhouses of the cell.\nYou: What's the difference between Bacteria and Viruses?\nBiology Tutor: Bacteria are single-celled organisms that can live in a wide variety of environments. They can cause disease, but many types of bacteria are also essential for human health. Viruses, on the other hand, are tiny infectious particles that can only replicate inside the cells of other organisms.\nYou:",
  "US History":
    "US History Tutor: I am a history tutor with special expertise in High School and College level history. I answer questions thoroughly and with the right amount of nuance.\nYou: What was the main purpose of the Declaration of Independence?\nHistory Tutor: The main goals were to rally the troops, win foreign allies, and announce the creation of a new country. The introductory sentence states the Declaration's main purpose, to explain the colonists' right to revolution.\nYou: What caused the Civil War?\nHistory Tutor: The reasons for the Civil War were disagreements over slavery, states vs. federal rights, the election of Abraham Lincoln, and the economy. After the inauguration of Lincoln in 1861, the South seceded and the Civil War officially started with the Battle at Fort Sumter.\nYou:",
  "Computer Science":
    "Computer Science Tutor: I am a computer science tutor with special expertise in High School and College level computer science. I answer questions thoroughly and with the right amount of nuance.\nYou: What is the difference between a compiler and an interpreter?\nComputer Science Tutor: A compiler is a program that translates source code into machine code. An interpreter is a program that executes source code directly. Both are used to translate source code into machine code.\nYou:Explain the intuition behind when you would use UDP over TCP?\nWhile TCP is a reliable protocol that ensures that data is delivered in the order in which it is sent, UDP is an unreliable protocol that does not guarantee delivery of data. This is because UDP is a connectionless protocol that does not require acknowledgement from the receiver. UDP is often used for streaming audio and video traffic, where lost packets are less noticeable than with other types of data.\nYou:",
  "World History":
    "World History Tutor: I am a World History tutor with special expertise in High School and College level medicine. I answer questions thoroughly and with the right amount of nuance.\nYou: What was the main cause of the French Revolution?\nWorld History Tutor: The main cause of the French Revolution was the disputes between the different types of social classes in French society. The French Revolution of 1789-1799 was one of the most important events in the history of the world. The revolution led to the end of the monarchy, and to the rise of democracy.\nYou: Can you explain NAFTA and its significance?\nWolrd History Tutor: The North American Free Trade Agreement, often referred to simply as NAFTA, was an agreement signed by Canada, Mexico, and the United States which created a trilateral trade in North America. The agreement came into force on January 1, 1994 and eliminated most tariffs on products traded between the three countries, with a major focus on liberalizing trade in agriculture, textiles, and automobile manufacturing. The deal also sought to protect intellectual property, establish dispute resolution mechanisms, and, through side agreements, implement labor and environmental safeguards. NAFTA is significant because it establishes a commercial link between the countries of North America that would help define commerce during the next decade.\nYou:",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
    const finalQuery = subjectNames[subject] + prompt + " " + query;

    console.log("finalQuery", finalQuery);

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: finalQuery,
      temperature: 0.35,
      max_tokens: outputLimit,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ["You:"],
    });
    let answer = completion.data.choices[0].text;
    answer = answer?.replace(
      /(^|\s)(Biology Tutor|World History Tutor|Computer Science Tutor|US History Tutor):\s?/g,
      " "
    );
    res.status(200).json({
      result: completion.data.choices[0].text,
      usage: completion.data.usage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
