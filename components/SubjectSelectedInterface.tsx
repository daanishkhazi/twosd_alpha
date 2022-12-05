import { SubjectSelectedInterfaceProps } from "../types";
import React, { useState, useEffect } from "react";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

import QueryInput from "./QueryInput";
import PromptGenerator from "./PromptGenerator";
import HistoryGenerator from "./HistoryGenerator";
import SubjectBanner from "./SubjectBanner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UsageBar from "./UsageBar";
import PromptSelector from "./PromptSelector";
import Arrow from "./icons/curvyArrow";

const subjectNames: { [key: string]: string } = {
  Biology: "Biology",
  "US History": "US History",
  "Computer Science": "Computer Science",
  Law: "Law",
  "World History": "World History",
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
  const animate = props.animate;

  const [collapsed, setCollapsed] = useState(false);

  const { data, status } = useSession();
  const isActive = data?.user?.isActive;

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight - 1200,
      behavior: "smooth",
    });
  }, [history]);

  const queryInterface = () => {
    return (
      <div>
        <PromptGenerator
          prompts={prompts}
          setSelectedPrompt={setSelectedPrompt}
          selectedPrompt={selectedPrompt}
          size={"large"}
          animate={animate}
        />
        <PromptSelector 
          prompts={prompts}
          setSelectedPrompt={setSelectedPrompt}
          selectedPrompt={selectedPrompt}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <QueryInput
          handleSubmit={handleSubmit}
          handleQueryChange={handleQueryChange}
          setSelectedPrompt={setSelectedPrompt}
          selectedPrompt={selectedPrompt}
          charCount={charCount}
          query={query}
          history={history}
          handleClear={handleClear}
        />
      </div>
    );
  };

  return (
    <div className="flex-col min-h-full w-full ml-1 pr-4 justify-center">
      {/* <div className="flex-row w-full h-full border-8 border-primary-800"> */}
        <div className="flex fixed pointer-events-none h-[4rem] w-screen z-10 bg-gradient-to-b from-[#E7F0D6] top-[4.5rem] justify-start"></div>
        {/* {collapsed ? (
          <div className="max-sm:hidden flex fixed pointer-events-none h-[4rem] w-screen z-10 bg-gradient-to-b from-[#E7F0D6] top-[4.5rem] justify-start"></div>
        ) : (
          <div className="max-sm:hidden flex fixed pointer-events-none h-[11rem] w-screen z-10 bg-gradient-to-b from-[#E7F0D6] via-[#E7F0D6] top-[4.5rem] justify-start"></div>
        )} */}
        {/* {selectedSubject && (
          <SubjectBanner
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            subjectNames={subjectNames}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        )} */}
        <div
          className={history.length > 1 ? (collapsed ? "pt-2" : "pt-14") : "pt-3"}
        >
          {history.length > 1 && <HistoryGenerator history={history} />}
        </div>
        <div>{queryInterface()}</div>
        {!isActive && (
          <div className="flex pl-12 justify-center">
            <UsageBar />
            <div className="align-right w-[14%] sm:w-[12%] md:w-[10%] lg:w-[8%] xl:w-[6%] max-w-screen-lg ml-2"><Arrow/></div>
            
          </div>
        )}
        <div className="h-12"></div>
      {/* </div> */}
    </div>
  );
};

export default SubjectSelectedInterface;
