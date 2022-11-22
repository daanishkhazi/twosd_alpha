import { SubjectSelectedInterfaceProps } from "../types";
import React, {useState, useEffect} from "react";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

import QueryInput from "./QueryInput";
import PromptGenerator from "./PromptGenerator";
import HistoryGenerator from "./HistoryGenerator";
import SubjectBanner from "./SubjectBanner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UsageBar from "./UsageBar";

const subjectNames: { [key: string]: string } = {
  Biology: "Rachel (Biology)",
  "US History": "Ross (US History)",
  "Computer Science": "Monica (Computer Science)",
  Law: "Phoebe (Law)",
  "World History": "Chandler (World History)",
};

const subjectImages: { [key: string]: string } = {
  Biology: "/rachel.png",
  "US History": "/ross.png",
  "Computer Science": "/monica.png",
  Law: "/phoebe.png",
  "World History": "/chandler.png",
};

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6 inline-block align-top"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

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

  const [collapsed, setCollapsed] = useState(false);

  const { data, status } = useSession();
  const isActive = data?.user?.isActive;

  useEffect(() => {
    window.scrollTo({top: document.body.scrollHeight - 1200, behavior: 'smooth'})
  }, [history]);

  const queryInterface = () => {
    return (
      <div>
      <PromptGenerator
        prompts={prompts}
        setSelectedPrompt={setSelectedPrompt}
        selectedPrompt={selectedPrompt}
      />
      <QueryInput
        handleSubmit={handleSubmit}
        handleQueryChange={handleQueryChange}
        setSelectedPrompt={setSelectedPrompt}
        selectedPrompt={selectedPrompt}
        charCount={charCount}
        query={query}
        history={history}
        handleClear = {handleClear}
      />
    </div>)
  };

  return (
    <div className="flex-col min-h-full justify-center">
      {collapsed ? 
        <div className="flex fixed pointer-events-none h-[4rem] w-screen z-10 bg-gradient-to-b from-white top-[4.5rem] justify-start"></div>
        : <div className="flex fixed pointer-events-none h-[11rem] w-screen z-10 bg-gradient-to-b from-white via-white top-[4.5rem] justify-start"></div>}
      {selectedSubject && <SubjectBanner 
                              selectedSubject={selectedSubject} 
                              setSelectedSubject={setSelectedSubject} 
                              subjectNames={subjectNames}
                              collapsed={collapsed}
                              setCollapsed={setCollapsed}/>}
        <div className={(history.length > 1) ?
                            (collapsed ? "pt-2" : "pt-14") : "pt-3"  
                            }>
          {(history.length > 1) && <HistoryGenerator history={history} />}
        </div>
        <div>{queryInterface()}</div>
        {!isActive && <div className="flex justify-center"><UsageBar /></div>}
        <div className="h-12"></div>
    </div>
  );
};

export default SubjectSelectedInterface;
