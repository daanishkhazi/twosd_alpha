import { SubjectSelectedInterfaceProps } from "../types";
import React from "react";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

import QueryInput from "./QueryInput";
import PromptGenerator from "./PromptGenerator";
import HistoryGenerator from "./HistoryGenerator";

const SubjectSelectedInterface = (props: SubjectSelectedInterfaceProps) => {
    const handleSubmit = props.handleSubmit;
    const handleQueryChange = props.handleQueryChange;
    const setSelectedPrompt = props.setSelectedPrompt;
    const selectedPrompt = props.selectedPrompt;
    const charCount = props.charCount;
    const query = props.query;
    const prompts = props.prompts;
    const history = props.history;
    const selectedSubject = props.selectedSubject;
    const setSelectedSubject = props.setSelectedSubject;
    const handleClear = props.handleClear;
    
    const queryInterface = () => {
        return selectedPrompt ? <QueryInput handleSubmit={handleSubmit} 
                                            handleQueryChange={handleQueryChange} 
                                            setSelectedPrompt={setSelectedPrompt} 
                                            selectedPrompt={selectedPrompt} 
                                            charCount={charCount}
                                            query={query}/> : 
                                              <PromptGenerator prompts={prompts} setSelectedPrompt={setSelectedPrompt}/>;
      };

    return (
    <div>
        <div><HistoryGenerator history={history}/></div>
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
  
export default SubjectSelectedInterface;