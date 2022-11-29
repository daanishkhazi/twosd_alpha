/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import React from "react";
import styles from "../styles/Interface.module.css";
import { useState, useEffect, useRef } from "react";
import { Prompt, Subject } from "../types/index";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import { createImportSpecifier } from "typescript";

import LoadingSymbol from "../components/LoadingSymbol";
import SubjectSelector from "../components/SubjectSelector";
import HistoryGenerator from "../components/HistoryGenerator";
import PromptGenerator from "../components/PromptGenerator";
import QueryInput from "../components/QueryInput";
import SubjectSelectedInterface from "../components/SubjectSelectedInterface";
import Layout from "../components/Layout";
import { useBalance } from "../Context/balance-context";
import OnWaitlist from "../components/OnWaitlist";
import Image from "next/image";

export default function Interface() {
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState<Array<Array<string>>>([["", "XYZ"]]);
  const [prompts, setPrompts] = useState<Array<Prompt> | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [subjects, setSubjects] = useState<Array<Subject> | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  // store firstExample dictionary in state
  const [firstExample, setFirstExample] = useState<{ [key: string]: string }>({
    Biology:
      "You: What is the difference between DNA and RNA?\nBiology Tutor: DNA is the genetic material that makes up the chromosomes of an organism. It is a double-stranded molecule that contains the instructions for an organism's development and function. RNA is a single-stranded molecule that helps to carry out the instructions of DNA. It is also involved in the process of protein synthesis.\n",
    "US History":
      "You: What was the main purpose of the Declaration of Independence?\nHistory Tutor: The main purpose of the Declaration of Independence was to declare the colonies’ independence from Great Britain and to assert their right to self-governance. The Declaration was written by Thomas Jefferson and adopted by the Second Continental Congress on July 4, 1776. It outlined the grievances of the American colonies against King George III and declared that they were no longer under British rule. The Declaration also asserted that all men are created equal and have certain inalienable rights, including life, liberty, and the pursuit of happiness. Finally, it declared that any government which fails to protect these rights is illegitimate and should be overthrown.\n",
    "Computer Science":
      "You: What is dynamic typing and what are some of its associated challenges?\nComputer Science Tutor: Dynamic typing is a type of type system in which type checking is performed at runtime instead of at compile time. This means that types are not associated with their variables, but with values. This can lead to some challenges, such as type errors being thrown at runtime instead of at compile time, and the need for typecasts in order to perform operations on values of different types.\n",
    "World History":
      "You: What was the main cause of the French Revolution?\nWorld History Tutor: The main cause of the French Revolution was the combination of political, social, and economic issues that had been building up in France for many years. Political issues included the absolute monarchy of Louis XVI, the lack of a representative government, and the privileges enjoyed by the nobility and clergy. Social issues included high taxes on the poor, food shortages, and a lack of civil liberties. Economic issues included high levels of debt, an inefficient taxation system that favored the wealthy, and a weak economy. All these factors led to widespread discontent among the French people which eventually boiled over into revolution.\n",
  });
  const [secondExample, setSecondExample] = useState<{ [key: string]: string }>(
    {
      Biology:
        "You: Explain the intuition behind the function of the Golgi Apparatus\nBiology Tutor: The Golgi apparatus is a organelle found in eukaryotic cells. Its function is to modify, package, and transport molecules within the cell. The Golgi apparatus is made up of a series of flattened sacs that are stacked on top of each other. Molecules enter the Golgi apparatus from the endoplasmic reticulum. They then travel through the Golgi apparatus, where they are modified, before being shipped off to their final destination.\n",
      "US History":
        "You: What was the outcome of Gibbons v Ogden?\nHistory Tutor: The case of Gibbons v. Ogden was a landmark case in which the Supreme Court of the United States held that the power to regulate interstate commerce was vested exclusively in the federal government, not the states. The case arose from a dispute between two New York City steamboat operators, Aaron Ogden and Thomas Gibbons, over whether Gibbons had the right to operate his steamboat in New York waters. The Court's ruling had far-reaching implications for the development of the American economy and helped to solidify the power of the federal government vis-à-vis the states.\n",
      "Computer Science":
        "You:Explain the intuition behind when you would use UDP over TCP?\nWhile TCP is a reliable protocol that ensures that data is delivered in the order in which it is sent, UDP is an unreliable protocol that does not guarantee delivery of data. This is because UDP is a connectionless protocol that does not require acknowledgement from the receiver. UDP is often used for streaming audio and video traffic, where lost packets are less noticeable than with other types of data.\n",
      "World History":
        "You: Can you explain NAFTA and its significance?\nWolrd History Tutor: The North American Free Trade Agreement, often referred to simply as NAFTA, was an agreement signed by Canada, Mexico, and the United States which created a trilateral trade in North America. The agreement came into force on January 1, 1994 and eliminated most tariffs on products traded between the three countries, with a major focus on liberalizing trade in agriculture, textiles, and automobile manufacturing. The deal also sought to protect intellectual property, establish dispute resolution mechanisms, and, through side agreements, implement labor and environmental safeguards. NAFTA is significant because it establishes a commercial link between the countries of North America that would help define commerce during the next decade.",
    }
  );
  // TODO - initialize from DB and write back to DB on session close
  const [tokensUsed, setTokensUsed] = useState(0);
  const [tokenQuota, setTokenQuota] = useState(0);

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const { promptBalance, setPromptBalance } = useBalance();

  const getPromptsAndSubjects = async () => {
    const res = await fetch("/api/subjectprompt", {
      method: "GET",
    });
    const data = await res.json();
    return data;
  };

  // Fetch prompt list and subject list from database on first render
  // TODO: getServerSideProps and getStaticProps -> get props from API route without blocking && SSR
  // If you want to do CSR - use something called SWR
  useEffect(() => {
    async function fetchData() {
      const { result: PromptsAndSubjects } = await getPromptsAndSubjects();
      setPrompts(PromptsAndSubjects.promptList);
      setSubjects(PromptsAndSubjects.subjectList);
      setSelectedPrompt(
        PromptsAndSubjects.promptList[PromptsAndSubjects.promptList.length - 1]
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (session) {
      setTokensUsed(session.user.tokensUsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [history]);

  const sendPrompt = async () => {
    const outputLimit = selectedPrompt ? selectedPrompt.outputLimit : 500;
    const prefix = selectedPrompt ? selectedPrompt.gpt3Prefix : "";
    const subjectPrefix = selectedSubject ? selectedSubject.subjectPrefix : "";
    const res = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: selectedSubject?.name,
        prompt: selectedPrompt?.gpt3Prefix,
        query: query,
        outputLimit: outputLimit,
        firstExample: firstExample[selectedSubject?.name || ""],
        secondExample: secondExample[selectedSubject?.name || ""],
      }),
    });
    const data = await res.json();
    console.log(outputLimit, data);
    return data;
  };

  const handleQueryChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setQuery(e.currentTarget.value);
    setCharCount(e.currentTarget.value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const prefix = selectedPrompt ? selectedPrompt.gpt3Prefix : "";
    const description = selectedPrompt ? selectedPrompt.description : "";
    e.preventDefault();
    let sentQuery = query;
    if (query.slice(0, 2) !== query.slice(0, 2).toUpperCase()) {
      sentQuery = query[0].toLowerCase() + query.substring(1);
    }
    if (query.slice(-1) != "?") {
      sentQuery = query + "?";
    }
    setHistory([...history, [description + " " + sentQuery, ""]]);
    const data = await sendPrompt();
    setHistory([...history, [description + " " + sentQuery, data.result]]);
    setFirstExample((prevState) => {
      return {
        ...prevState,
        [selectedSubject?.name || ""]:
          secondExample[selectedSubject?.name || ""] || "",
      };
    });
    const secondExampleContent =
      "You: " + prefix + "Tutor: " + sentQuery + data.result;
    setSecondExample((prevState) => {
      return {
        ...prevState,
        [selectedSubject?.name || ""]: secondExampleContent,
      };
    });
    setTokensUsed(tokensUsed + data.usage.total_tokens);
    setPromptBalance({ ...promptBalance, balance: promptBalance.balance + 1 });
    setQuery("");
    if (prompts) {
      setSelectedPrompt(prompts[prompts.length - 1]);
    }
    setCharCount(0);
    const historyWriteComplete = await writeUserActivityToDB(
      [prefix + query, data.result],
      data.usage.total_tokens
    );
    const tokenCountComplete = await updateUserTokensInDB(
      tokensUsed + data.usage.total_tokens,
      promptBalance.balance + 1
    );
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setHistory([["", "XYZ"]]);
  };

  const writeUserActivityToDB = async (
    historyItem: Array<string>,
    queryTokens: number
  ) => {
    try {
      if (session && session.user && selectedPrompt && selectedSubject) {
        const res = await fetch("/api/writeUserActivity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
            prompt: selectedPrompt.description,
            subject: selectedSubject.name,
            // TODO - make this write the entire history array on close?
            history: historyItem,
            tokens: queryTokens,
          }),
        });
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateUserTokensInDB = async (
    tokenBalance: number,
    promptBalance: number
  ) => {
    if (session && session.user && session.user.email && selectedPrompt) {
      const res = await fetch("/api/updateUserTokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          tokens: tokenBalance,
          prompts: promptBalance,
        }),
      });
      const data = await res.json();
      return data;
    }
  };

  const subjectSelectedProps = {
    handleSubmit: handleSubmit,
    handleQueryChange: handleQueryChange,
    setSelectedPrompt: setSelectedPrompt,
    selectedPrompt: selectedPrompt,
    charCount: charCount,
    query: query,
    prompts: prompts,
    history: history,
    selectedSubject: selectedSubject,
    setSelectedSubject: setSelectedSubject,
    handleClear: handleClear,
    size: "large",
    animate: false,
  };

  if (status === "unauthenticated") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <p className="text-2xl font-bold">Sign in to use Laera!</p>
        </div>
      </Layout>
    );
  }
  if (session?.user.offWaitlist === false) {
    return <OnWaitlist />;
  }

  return (
    <Layout>
      <div className="flex justify-center">
        {/* <div className="fixed pointer-events-none top-0 bg-white left-0 w-full h-[13.25rem] z-20 ">
          <Image
            src="/meshbgcrop.svg"
            width={2560}
            height={1920}
            alt="Home Background"
            className="opacity-30"
          />
        </div> */}
        <div className="flex justify-center items-center min-h-[calc(100vh-194px)] sm:w-full md:w-5/6 lg: lg:w-7/12 max-w-screen-l px-8">
          {/* TODO - somehow fix this alignment... */}
          <div className="flex">
            {selectedSubject ? (
              <SubjectSelectedInterface {...subjectSelectedProps} />
            ) : (
              <SubjectSelector
                subjects={subjects}
                setSelectedSubject={setSelectedSubject}
              />
            )}
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </Layout>
  );
}
