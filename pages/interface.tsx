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

export default function Interface() {
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([["", "XYZ"]]);
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
    e.preventDefault();
    let sentQuery = query;
    sentQuery = query[0].toLowerCase() + query.substring(1);
    if (query.slice(-1) != "?") {
      sentQuery = query + "?";
    }
    setHistory([...history, [prefix + " " + sentQuery, ""]]);
    const data = await sendPrompt();
    setHistory([...history, [prefix + " " + sentQuery, data.result]]);
    setTokensUsed(tokensUsed + data.usage.total_tokens);
    setPromptBalance({ ...promptBalance, balance: promptBalance.balance + 1 });
    setQuery("");
    setSelectedPrompt(null);
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
    setHistory([]);
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
          <p className="text-2xl font-bold">Sign in to use Bream!</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex justify-center min-h-screen sm:w-full md:w-5/6 lg: lg:w-7/12 max-w-screen-l px-8">
            <Head>
              <title>AI Tutor</title>
              <meta
                name="Personalized AI-enabled Tutoring"
                content="Personalized AI-enabled Tutoring"
              />
              <link rel="icon" href="/favicon.png" />
            </Head>
            {/* TODO - somehow fix this alignment... */}
            <div className="grow">
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
