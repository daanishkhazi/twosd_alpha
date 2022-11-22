import { Subject, SubjectSelectorProps } from "../types";
import React from "react";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";
import Image from "next/image";

const subjectDescriptions: { [key: string]: string } = {
  Biology:
    "Rachel is an advanced Artifical Intelligence well versed in Biology. Ask her for explanations, advice, or just to chat!",
  "US History":
    "Ross is an advanced Artifical Intelligence well versed in US History. Ask him for explanations, advice, or just to chat!",
  "Computer Science":
    "Monica is an advanced Artifical Intelligence well versed in CS. Ask her for explanations, advice, or just to chat!",
  Law: "Phoebe is an advanced Artifical Intelligence well versed in Law. Ask her for explanations, advice, or just to chat!",
  "World History":
    "Chandler is an advanced Artifical Intelligence well versed in World History. Ask him for explanations, advice, or just to chat!",
};

const subjectNames: { [key: string]: string } = {
  Biology: "Rachel (Biology)",
  "US History": "Ross (US History)",
  "Computer Science": "Monica (CS)",
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

const SubjectSelector = (props: SubjectSelectorProps) => {
  const subjects = props.subjects;
  const setSelectedSubject = props.setSelectedSubject;
  if (subjects) {
    return (
      <div className="flex flex-wrap justify-around items-center">
        {subjects.map((subject: Subject, index: number) => {
          return (
            <div
              key={index}
              className="flex-col xl:w-[45%] lg:w-full mb-8 items-center justify-center"
            >
              <button
                className="flex-row justify-center items-center hover:scale-105 border-4 border-primary-300 transition ease-in-out delay-50 justify-center px-8 py-6 rounded-box shadow-2xl bg-white  focus:outline-none focus:shadow-outline"
                onClick={() => setSelectedSubject(subject)}
              >
                <div className="flex-row justify-center">
                  <div className="flex justify-center">
                    <Image
                      className="justify-center rounded-full"
                      src={subjectImages[subject.name]}
                      alt={subject.name}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-center text-left font-semibold text-xl pt-4 pb-2">
                      {subjectNames[subject.name]}
                    </h2>
                    <p className="text-gray-600 text-center text-md">
                      {subjectDescriptions[subject.name]}
                    </p>
                  </div>
                </div>
              </button>
            </div>
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
