import Head from "next/head";
import React from "react";
import styles from "../styles/Interface.module.css";
import { useState, useEffect, useRef } from "react";
import { Prompt, Subject } from "../types/index";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { createImportSpecifier } from "typescript";

import LoadingSymbol from "../components/LoadingSymbol";
import SubjectSelector from "../components/SubjectSelector";
import HistoryGenerator from "../components/HistoryGenerator";
import PromptGenerator from "../components/PromptGenerator";
import QueryInput from "../components/QueryInput";
import SubjectSelectedInterface from "../components/SubjectSelectedInterface";

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

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { data: session, status } = useSession();

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
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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
        query: subjectPrefix + prefix + query,
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
    setHistory([...history, [prefix + query, ""]]);
    const data = await sendPrompt();
    setHistory([...history, [prefix + query, data.result]]);
    setTokensUsed(tokensUsed + data.usage.total_tokens);
    setQuery("");
    setSelectedPrompt(null);
    setCharCount(0);
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setHistory([]);
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
    handleClear: handleClear
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Tutor</title>
        <meta
          name="Personalized AI-enabled Tutoring"
          content="Personalized AI-enabled Tutoring"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TODO - somehow fix this alignment... */}
      <div style={{ alignContent: "center" }}>
        {selectedSubject ? <SubjectSelectedInterface {...subjectSelectedProps}/> : <SubjectSelector subjects={subjects} setSelectedSubject={setSelectedSubject}/>}
        <br />
        {session ? (
          <button onClick={() => signOut()}>
            Sign out {session?.user?.name}
          </button>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
