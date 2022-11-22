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
