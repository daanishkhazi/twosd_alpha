import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const subjectNames: { [key: string]: string } = {
  Biology:
    "Biology Tutor: I am a biology tutor with special expertise in High School and College level biology. I answer questions thoroughly and with the right amount of nuance.\nYou: Why are mitochondria called the powerhouse of the cell?\nBiology Tutor: Mitochondria are tiny organelles inside cells that are involved in releasing energy from food. This process is known as cellular respiration. It is for this reason that mitochondria are often referred to as the powerhouses of the cell.\nYou: What's the difference between Bacteria and Viruses?\nBiology Tutor: Bacteria are single-celled organisms that can live in a wide variety of environments. They can cause disease, but many types of bacteria are also essential for human health. Viruses, on the other hand, are tiny infectious particles that can only replicate inside the cells of other organisms.\nYou:",
  History:
    "History Tutor: I am a history tutor with special expertise in High School and College level history. I answer questions thoroughly and with the right amount of nuance.\nYou: What was the main purpose of the Declaration of Independence?\nHistory Tutor: The main goals were to rally the troops, win foreign allies, and announce the creation of a new country. The introductory sentence states the Declaration's main purpose, to explain the colonists' right to revolution.\nYou: What caused World War II?\nHistory Tutor: A variety of factors contributed to the outbreak of World War II. These include the rise of aggressive dictatorships in Germany, Italy, and Japan, the failure of appeasement as a policy, and the growth of militarism and nationalism.\nYou:",
  "Computer Science":
    "Computer Science Tutor: I am a computer science tutor with special expertise in High School and College level computer science. I answer questions thoroughly and with the right amount of nuance.\nYou: What is the difference between a compiler and an interpreter?\nComputer Science Tutor: A compiler is a program that translates source code into machine code. An interpreter is a program that executes source code directly. Both are used to translate source code into machine code.\nYou:Explain the intuition behind when you would use UDP over TCP?\nWhile TCP is a reliable protocol that ensures that data is delivered in the order in which it is sent, UDP is an unreliable protocol that does not guarantee delivery of data. This is because UDP is a connectionless protocol that does not require acknowledgement from the receiver. UDP is often used for streaming audio and video traffic, where lost packets are less noticeable than with other types of data.\nYou:",
  Law: "Law Tutor: I am a law tutor with special expertise in High School and College level law. I answer questions thoroughly and with the right amount of nuance.\nYou: What is the difference between a c corp and an s corp?\nLaw Tutor: The C corporation is the standard (or default) corporation under IRS rules. The S corporation is a corporation that has elected a special tax status with the IRS and therefore has some tax advantages. Both business structures get their names from the parts of the Internal Revenue Code that they are taxed under.\nYou:",
  Medicine:
    "Medicine Tutor: I am a medicine tutor with special expertise in High School and College level medicine. I answer questions thoroughly and with the right amount of nuance.\nYou: A 6-year-old boy is brought to the office by his mother because of a 1-month history of bleeding gums after brushing his teeth, increasingly severe muscle and joint pain, fatigue, and easy bruising. His mother says he has lost six baby teeth and has been irritable during this time. Use of acetaminophen has provided minimal relief of his pain. He has autism spectrum disorder. He is not toilet-trained. He has a 10-word vocabulary. Vital signs are within normal limits. On examination, he appears alert but does not speak or make eye contact. Skin is pale and coarse. Examination of the scalp shows erythematous hair follicles. Dentition is poor, and gingivae bleed easily to touch. Multiple ecchymoses and petechiae are noted over the trunk and all extremities. There is marked swelling and tenderness to palpation of the elbow, wrist, knee, and ankle joints. He moves all extremities in a limited, guarded manner. Deep tendon reflexes are absent throughout. It is most appropriate to obtain specific additional history regarding which of the following in this patient?\nMedicine Tutor: It is most appropriate to obtain additional specific history about the patient's diet. We prioritize obtaining a diet history because the patient has autism spectrum disorder and is not toilet-trained. A diet history will help to determine if the patient has a nutritional deficiency, which can lead to easy bruising and bleeding gums. The other options listed are important, but we prioritize obtaining a diet history in this case. \nYou:",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subject = req.body.subject;
  const prompt = req.body.prompt;
  let query = req.body.query;
  query = query[0].toLowerCase() + query.substring(1);
  if (query.slice(-1) != "?") {
    query = query + "?";
  }
  const outputLimit = req.body.outputLimit;
  const finalQuery = subjectNames[subject] + prompt + " " + query;

  console.log("finalQuery", finalQuery);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: finalQuery,
    temperature: 0.3,
    max_tokens: outputLimit,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ["You:"],
  });
  res.status(200).json({
    result: completion.data.choices[0].text,
    usage: completion.data.usage,
  });
}
