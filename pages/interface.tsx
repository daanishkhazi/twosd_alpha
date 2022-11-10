import Head from "next/head";
import React from "react";
import styles from "../styles/Interface.module.css";
import { useState, useEffect, useRef } from "react";
import { Prompt, Subject } from "../types/index";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Interface() {
  // TODO - migrate the below to the DB
  const dummyPrompts = [
    { description: "What's the difference between...", 
      gpt3_prefix: "What's the difference between ",
      placeholder_text: "E.g. dogs and cats",
      char_limit: 75,
      output_limit: 1500,
    },
    { description: "Explain the intuition behind...", 
      gpt3_prefix: "Explain the intuition behind ",
      placeholder_text: "E.g. why cells need ATP",
      char_limit: 250,
      output_limit: 1500,  
    },
    { description: "Explain why this is wrong:", 
      gpt3_prefix: "Explain why this is wrong: ",
      placeholder_text: "E.g. the civil war was not fought over slavery",
      char_limit: 250,
      output_limit: 1500,  
    },
    { description: "Finish the thought:", 
      gpt3_prefix: "Finish the thought: ",
      placeholder_text: "E.g. the most effective treatments for sickle cell anemia are...",
      char_limit: 250,
      output_limit: 1500,  
    },
    { description: "Ask an open ended question", 
      gpt3_prefix: "",
      placeholder_text: "E.g. Why does Louisiana have lower educational outcomes than other US states?",
      char_limit: 500,
      output_limit: 4000,  
    },
  ];

  const dummySubjects = [
    { name: "Biology", 
      subject_prefix: "The following is a question posed by a student to their Biology teacher. "
    },
    { name: "History",
      subject_prefix: "The following is a question posed by a student to their History teacher. "
    },
    { name: "Medicine",
      subject_prefix: "The following is a question posed by a student to their Physician. "
    },
    { name: "Computer Science",
      subject_prefix: "The following is a question posed by a student to their Computer Science Teacher. "
    },
    { name: "SAT / ACT",
      subject_prefix: "The following is a question posed by a student to their SAT Tutor. "
    },
  ];

  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState([["", "XYZ"]]);
  const [prompts, setPrompts] = useState<Array<Prompt>>(dummyPrompts);
  // const [output, setOutput] = useState("");
  // const [responseLoading, setResponseLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>();
  const [subjects, setSubjects] = useState<Array<Subject>>(dummySubjects);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>();

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const sendPrompt = async () => {
    const output_limit = selectedPrompt ? selectedPrompt.output_limit : 500
    const prefix = selectedPrompt ? selectedPrompt.gpt3_prefix : ""
    const subject_prefix = selectedSubject ? selectedSubject.subject_prefix : ""
    const res = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        // TODO - subj hardcoded - to change
        query: subject_prefix + prefix + query,
        output_limit: output_limit
      }),
    });
    const data = await res.json();
    return data
  };

  const handleQueryChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setQuery(e.currentTarget.value);
    setCharCount(e.currentTarget.value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const prefix = selectedPrompt ? selectedPrompt.gpt3_prefix : ""
    e.preventDefault();
    // TODO - Add API request here
    setHistory([...history, [prefix + query, ""]]);
    const data = await sendPrompt()
    setHistory([...history, [prefix + query, data.result]]);
    setQuery("");
    setSelectedPrompt(null);
    setCharCount(0);
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setHistory([]);
  };

  const selectPrompt = (index: number) => {
    setSelectedPrompt(prompts[index]);
  };

  const loadingSymbol = () => {
    return (
    <div style={{justifyContent: "center"}}>
      <div className={styles.loader}>
        <div></div><div></div><div></div>
      </div>
    </div>
    );
  };

  const subjectSelector = () => {
      return (
        <div className={styles.squareContainer}>
          {
            subjects.map(
              (subject: Subject, index: number) => {
                return (
                  <button className={styles.square} key={index} onClick={() => setSelectedSubject(subject)}>
                      {subject.name}
                  </button>
                )
              }
            )
          }
        </div>
      )
  }

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
                      <div className={styles.output}>
                        {past_query_output[1]}
                      </div>
                    ) : (
                      <div className={styles.output}>{loadingSymbol()}</div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
    )
  }

  const promptGenerator = () => {
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
    )
  }

  const queryInput = (selectedPrompt: Prompt) => {
    return (
      <div className={styles.formdiv}>
          <form onSubmit={handleSubmit}>
            <label></label>
            <p>{selectedPrompt.description}</p>
            <p className={styles.charCount}>
              {charCount} / {selectedPrompt.char_limit} Characters
            </p>
            <textarea
              rows={10}
              placeholder={selectedPrompt.placeholder_text}
              className={styles.input}
              onChange={handleQueryChange}
              value={query}
              maxLength={selectedPrompt.char_limit}
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
      </div>
    )
  }

  const queryInterface = () => {
    return (selectedPrompt ? queryInput(selectedPrompt) : promptGenerator())
  }

  const SubjectSelectedOutput = () => {
    return (
      <div>
        <div>
          {historyGenerator()}
        </div>
        <div style={{display: "inline-block"}}>
        {selectedSubject ? 
          <button className={styles.subjectLabel} onClick={() => setSelectedSubject(null)}> 
            Subject: {selectedSubject.name} (Click to change) 
          </button> : null}
        </div>
        <div>
          {queryInterface()}
        </div>
        <button className={styles.clear} onClick={handleClear}>
          {" "}
          Clear History{" "}
        </button>
      </div>
    )
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
