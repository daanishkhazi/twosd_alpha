import Head from "next/head";
import React from "react";
import styles from "../styles/Interface.module.css";
import { useState, useEffect, useRef } from "react";
import { Prompt, Subject } from "../types/index";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { createImportSpecifier } from "typescript";

export default function Interface() {
<<<<<<< HEAD
=======

>>>>>>> main
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([["", "XYZ"]]);
  const [prompts, setPrompts] = useState<Array<Prompt> | null>();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>();
  const [subjects, setSubjects] = useState<Array<Subject> | null>();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>();
  // TODO - initialize from DB and write back to DB on session close
<<<<<<< HEAD
  const [tokensUsed, setTokensUsed] = useState(0);
=======
  const [tokensUsed, setTokensUsed] = useState(0)
>>>>>>> main

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const getPromptsAndSubjects = async () => {
    const res = await fetch("/api/subjectprompt", {
      method: "GET",
    });
    const data = await res.json();
<<<<<<< HEAD
    return data;
=======
    return data
>>>>>>> main
  };

  // Fetch prompt list and subject list from database on first render
  // TODO: getServerSideProps and getStaticProps -> get props from API route without blocking && SSR
<<<<<<< HEAD
  // If you want to do CSR - use something called SWR
  useEffect(() => {
    async function fetchData() {
      const { result: PromptsAndSubjects } = await getPromptsAndSubjects();
      setPrompts(PromptsAndSubjects.promptList);
      setSubjects(PromptsAndSubjects.subjectList);
    }
    fetchData();
  }, []);
=======
  // If you want to do CSR - use something called SWR 
  useEffect(() => {
    async function fetchData() {
      const {result: PromptsAndSubjects} = await getPromptsAndSubjects() 
      setPrompts(PromptsAndSubjects.promptList)
      setSubjects(PromptsAndSubjects.subjectList)
    }
    fetchData()
  }, [])
>>>>>>> main

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const sendPrompt = async () => {
<<<<<<< HEAD
    const outputLimit = selectedPrompt ? selectedPrompt.outputLimit : 500;
    const prefix = selectedPrompt ? selectedPrompt.gpt3Prefix : "";
    const subjectPrefix = selectedSubject ? selectedSubject.subjectPrefix : "";
=======
    const outputLimit = selectedPrompt ? selectedPrompt.outputLimit : 500
    const prefix = selectedPrompt ? selectedPrompt.gpt3Prefix : ""
    const subjectPrefix = selectedSubject ? selectedSubject.subjectPrefix : ""
>>>>>>> main
    const res = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
<<<<<<< HEAD
      body: JSON.stringify({
        query: subjectPrefix + prefix + query,
        outputLimit: outputLimit,
      }),
    });
    const data = await res.json();
    console.log(outputLimit, data);
    return data;
=======
      body: JSON.stringify({ 
        query: subjectPrefix + prefix + query,
        outputLimit: outputLimit
      }),
    });
    const data = await res.json();
    console.log(outputLimit, data)
    return data
>>>>>>> main
  };

  const handleQueryChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setQuery(e.currentTarget.value);
    setCharCount(e.currentTarget.value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
<<<<<<< HEAD
    const prefix = selectedPrompt ? selectedPrompt.gpt3Prefix : "";
=======
    const prefix = selectedPrompt ? selectedPrompt.gpt3Prefix : ""
>>>>>>> main
    e.preventDefault();
    setHistory([...history, [prefix + query, ""]]);
    const data = await sendPrompt();
    setHistory([...history, [prefix + query, data.result]]);
<<<<<<< HEAD
    setTokensUsed(tokensUsed + data.usage.total_tokens);
=======
    setTokensUsed(tokensUsed + data.usage.total_tokens)
>>>>>>> main
    setQuery("");
    setSelectedPrompt(null);
    setCharCount(0);
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setHistory([]);
  };

  const selectPrompt = (index: number) => {
<<<<<<< HEAD
    if (prompts) {
      setSelectedPrompt(prompts[index]);
    }
=======
    if (prompts) {setSelectedPrompt(prompts[index])}
>>>>>>> main
  };

  const loadingSymbol = () => {
    return (
      <div style={{ justifyContent: "center" }}>
        <div className={styles.loader}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  const subjectSelector = () => {
<<<<<<< HEAD
    if (subjects) {
      return (
=======
      if (subjects) {return (
>>>>>>> main
        <div className={styles.squareContainer}>
          {subjects.map((subject: Subject, index: number) => {
            return (
              <button
                className={styles.square}
                key={index}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject.name}
              </button>
            );
          })}
        </div>
<<<<<<< HEAD
      );
    } else {
      return loadingSymbol();
    }
  };
=======
      )} else {
        return loadingSymbol()
      }
  }
>>>>>>> main

  const historyGenerator = () => {
    return (
      <div>
        {history.map((past_query_output: Array<string>, index: number) => {
          if (past_query_output[0] != "") {
            return (
              <div className={styles.historyEntry} key={index}>
                <p className={styles.historyLabel}> Query </p>
                <div className={styles.query}>{past_query_output[0]}</div>
                <div>
                  <p className={styles.charCount}> Output </p>
                  {past_query_output[1] != "" ? (
                    <div className={styles.output}>{past_query_output[1]}</div>
                  ) : (
                    <div className={styles.output}>{loadingSymbol()}</div>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const promptGenerator = () => {
    if (prompts) {
<<<<<<< HEAD
      return (
        <div className={styles.formdiv}>
          {prompts.map((p: Prompt, index: number) => {
            return (
              <div style={{ padding: "5px" }} key={index}>
                <button
                  className={styles.promptButton}
                  onClick={() => selectPrompt(index)}
                >
                  {p.description}
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };
=======
      return(
      <div className={styles.formdiv}>
            {prompts.map((p: Prompt, index: number) => {
              return (
                <div style={{ padding: "5px" }} key={index}>
                  <button
                    className={styles.promptButton}
                    onClick={() => selectPrompt(index)}
                  >
                    {p.description}
                  </button>
                </div>
              );
            })}
      </div>
    )}
  }
>>>>>>> main

  const queryInput = (selectedPrompt: Prompt) => {
    return (
      <div className={styles.formdiv}>
<<<<<<< HEAD
        <form onSubmit={handleSubmit}>
          <label></label>
          <p>{selectedPrompt.description}</p>
          <p className={styles.charCount}>
            {charCount} / {selectedPrompt.charLimit} Characters
          </p>
          <textarea
            rows={10}
            placeholder={selectedPrompt.placeholder}
            className={styles.input}
            onChange={handleQueryChange}
            value={query}
            maxLength={selectedPrompt.charLimit}
          />
          <div className={styles.buttondiv}>
            <button type="submit" className={styles.submit}>
              {" "}
              Submit{" "}
            </button>
            <button
              className={styles.clear}
              onClick={() => setSelectedPrompt(null)}
            >
              {" "}
              Change Prompt{" "}
            </button>
          </div>
        </form>
=======
          <form onSubmit={handleSubmit}>
            <label></label>
            <p>{selectedPrompt.description}</p>
            <p className={styles.charCount}>
              {charCount} / {selectedPrompt.charLimit} Characters
            </p>
            <textarea
              rows={10}
              placeholder={selectedPrompt.placeholder}
              className={styles.input}
              onChange={handleQueryChange}
              value={query}
              maxLength={selectedPrompt.charLimit}
            />
            <div className={styles.buttondiv}>
              <button type="submit" className={styles.submit}>
                {" "}
                Submit{" "}
              </button>
              <button
                className={styles.clear}
                onClick={() => setSelectedPrompt(null)}
              >
                {" "}
                Change Prompt{" "}
              </button>
            </div>
          </form>
>>>>>>> main
      </div>
    );
  };

  const queryInterface = () => {
    return selectedPrompt ? queryInput(selectedPrompt) : promptGenerator();
  };

  const SubjectSelectedOutput = () => {
    return (
      <div>
        <div>{historyGenerator()}</div>
        <div style={{ display: "inline-block" }}>
          {selectedSubject ? (
            <button
              className={styles.subjectLabel}
              onClick={() => setSelectedSubject(null)}
            >
              Subject: {selectedSubject.name} (Click to change)
            </button>
          ) : null}
        </div>
        <div>{queryInterface()}</div>
        <button className={styles.clear} onClick={handleClear}>
          {" "}
          Clear History{" "}
        </button>
      </div>
    );
  };

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
        {selectedSubject ? SubjectSelectedOutput() : subjectSelector()}
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
