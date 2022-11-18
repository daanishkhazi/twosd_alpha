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
  Law: "Phoebe is an advanced Artifical Intelligence well versed in Law. Ask her for explanations, advice, or just to chat!",
  Medicine:
    "Chandler is an advanced Artifical Intelligence well versed in Medicine. Ask him for explanations, advice, or just to chat!",
};

const subjectNames: { [key: string]: string } = {
  Biology: "Rachel (Biology)",
  History: "Ross (History)",
  "Computer Science": "Monica (Computer Science)",
  Law: "Phoebe (Law)",
  Medicine: "Chandler (Medicine)",
};

const subjectImages: { [key: string]: string } = {
  Biology: "/rachel.png",
  History: "/ross.png",
  "Computer Science": "/monica.png",
  Law: "/phoebe.png",
  Medicine: "/chandler.png",
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
              className="hover:scale-105 transition ease-in-out delay-50 flex flex-row items-center justify-start space-x-8 px-8 py-6 rounded-box shadow-lg bg-white  focus:outline-none focus:shadow-outline"
              key={index}
              onClick={() => setSelectedSubject(subject)}
            >
              <Image
                className="rounded-full"
                src={subjectImages[subject.name]}
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <LoadingSymbol color={"#EE909C"} />
      </div>
    );
  }
};

export default SubjectSelector;
