import { Subject, SubjectSelectorProps } from "../types";
import React from "react";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";
import Image from "next/image";

const subjectDescriptions: { [key: string]: string } = {
  Biology:
    "Rachel is an advanced Artifical Intelligence well versed in Biology. Ask her for explanations, advice, or just to chat!",
  History:
    "Ross is an advanced Artifical Intelligence well versed in History. Ask him for explanations, advice, or just to chat!",
  "Computer Science":
    "Monica is an advanced Artifical Intelligence well versed in Computer Science. Ask her for explanations, advice, or just to chat!",
  "SAT / ACT":
    "Phoebe is an advanced Artifical Intelligence well versed in SAT / ACT. Ask her for explanations, advice, or just to chat!",
  Medicine:
    "Chandler is an advanced Artifical Intelligence well versed in Medicine. Ask him for explanations, advice, or just to chat!",
};

const subjectNames: { [key: string]: string } = {
  Biology: "Rachel (Biology)",
  History: "Ross (History)",
  "Computer Science": "Monica (Computer Science)",
  "SAT / ACT": "Phoebe (SAT / ACT)",
  Medicine: "Chandler (Medicine)",
};

const SubjectSelector = (props: SubjectSelectorProps) => {
  const subjects = props.subjects;
  const setSelectedSubject = props.setSelectedSubject;
  if (subjects) {
    return (
      <div className="flex flex-col space-y-8 mx-80 my-20">
        {subjects.map((subject: Subject, index: number) => {
          return (
            <button
              className="flex flex-row items-center justify-start space-x-8 px-8 py-6 rounded-lg shadow-lg bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline"
              key={index}
              onClick={() => setSelectedSubject(subject)}
            >
              <Image
                className="rounded-full"
                src="/hero.png"
                alt={subject.name}
                width={96}
                height={96}
              />
              <div>
                <h2 className="text-left font-semibold text-xl">
                  {subjectNames[subject.name]}
                </h2>
                <p className="text-gray-600 text-left">
                  {subjectDescriptions[subject.name]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    );
  } else {
    return <LoadingSymbol />;
  }
};

export default SubjectSelector;