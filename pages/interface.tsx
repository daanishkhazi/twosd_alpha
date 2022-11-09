import Head from 'next/head';
import React from 'react';
import styles from '../styles/Interface.module.css';
import { useState, useEffect, useRef } from 'react';
import {Prompt} from '../types/index';
// import axios from 'axios';

export default function Interface() {

    const dummyPrompts = [{description: "Short-form", char_limit: 75}, {description: "Long-form", char_limit: 250}]
    
    const [query, setQuery] = useState("")
    const [charCount, setCharCount] = useState(0)
    const [history, setHistory] = useState([["", "XYZ"]])
    const [prompts, setPrompts] = useState<Array<Prompt>>(dummyPrompts)
    const [output, setOutput] = useState("")
    const [responseLoading, setResponseLoading] = useState(false)
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>()

    const bottomRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [history]);
    
    const handleQueryChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setQuery(e.currentTarget.value)
        setCharCount(e.currentTarget.value.length)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO - Add API request here
        setOutput("Output")
        setHistory([...history, [query, ""]])
        setQuery("")
        setSelectedPrompt(null)
        setCharCount(0)
    }

    const handleClear = (e: React.FormEvent) => {
        e.preventDefault();
        setHistory([])
    }

    const selectPrompt = (index: number) => {
        setSelectedPrompt(prompts[index])
    }

    const loadingSymbol = () => {
        // TODO - make this actually look good
        return (<div>Loading...</div>)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>AI Tutor</title>
                <meta name="Personalized AI-enabled Tutoring" content="Personalized AI-enabled Tutoring" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                {/* TODO - somehow fix this alignment... */}
                <div style={{alignContent: "center"}}> 
                    <div>
                        {history.map((past_query_output: Array<string>, index: number) => 
                            {if (past_query_output[0] != "") {
                                return (
                                    <div className={styles.historyEntry} key = {index}>
                                        <p className={styles.historyLabel}> Query </p>
                                        <div className={styles.query}>
                                            {past_query_output[0]}
                                        </div>
                                            <div>
                                                <p className={styles.charCount}> Output </p>
                                                {past_query_output[1] != "" ?
                                                    <div className={styles.output}>
                                                        {past_query_output[1]}
                                                    </div> :
                                                    <div className={styles.output}>
                                                        {loadingSymbol()}
                                                    </div>
                                                }
                                                
                                            </div>
                                    </div>
                                )}
                            }
                        )}
                    </div>
                    {selectedPrompt ?
                        <div className = {styles.formdiv}>
                            <form onSubmit={handleSubmit}>
                                <label ></label>
                                <p className={styles.charCount}>{charCount} / {selectedPrompt.char_limit} Characters</p>
                                <textarea 
                                    rows={10}
                                    placeholder={`Enter ${selectedPrompt.description} Query`} 
                                    className={styles.input}
                                    onChange={handleQueryChange}
                                    value={query}
                                    maxLength = {selectedPrompt.char_limit}
                                    />
                                <div className={styles.buttondiv}>
                                    <button type = "submit" className = {styles.submit}> Submit </button>
                                    <button className = {styles.clear} onClick={() => setSelectedPrompt(null)}> Change Prompt </button>
                                </div>
                            </form>
                        </div> :
                        <div className = {styles.formdiv}>
                            {prompts.map((p: Prompt, index: number) => {
                                return (
                                <div style={{padding: "5px"}} key={index}>
                                    <button className={styles.promptButton} onClick={() => selectPrompt(index)}> 
                                        {p.description}
                                    </button>
                                </div>)
                            })}
                        </div>
                    }
                    <button className = {styles.clear} onClick = {handleClear}> Clear History </button>
                </div>
            <div ref={bottomRef} />
        </div>)
}

