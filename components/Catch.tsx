import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "Do I have to pay?",
    answer:
      "Laera is free to start! Get going with 25 free interactions per month with any of our accomplished tutors. Artificial intelligence is expensive though 🥴, so we offer a paid plan to our extra motivated students with up to 500 interactions per month.",
  },
  {
    question: "How do I know the answers are correct?",
    answer:
      "Laera has ingested nearly all of the information on the internet and has a strong foundation in the subjects we've specially prepared it for. That being said, we encourage you to fact check any answer a Laera tutor gives you, as this is meant to be a study guide and not a tool to replace your own work. Do not use Laera to do anything that violates your school's code of conduct.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Not yet! We're working on it, but for now you can use Laera on your phone's browser. To get the most out of Laera, we recommend using Chrome on your desktop or laptop.",
  },
];

const Catch: React.FC = () => {
  const [active, setActive] = useState(-1);
  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          onClick={() => {
            index === active ? setActive(-1) : setActive(index);
          }}
          className="hover:scale-105 transition ease-in-out delay-50 flex flex-col justify-between rounded-box shadow-lg border-4 border-primary-400 py-4 px-8 cursor-pointer"
        >
          {active == index ? (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="font-heading font-bold text-2xl mt-2">
                  {faq.question}
                </h1>
                <p className="text-gray-600 mt-1 mb-2 italic">{faq.answer}</p>
              </div>
              <div className="flex text-primary-500 font-extrabold text-5xl leading-9">
                -
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <h1 className="flex justify-start font-heading font-bold text-2xl">
                {faq.question}
              </h1>
              <div className="text-primary-500 font-extrabold text-4xl leading-7">
                +
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Catch;
