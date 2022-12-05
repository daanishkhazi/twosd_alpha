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
    "Phoebe is an advanced Artifical Intelligence well versed in World History. Ask her for explanations, advice, or just to chat!",
};

const subjectNames: { [key: string]: string } = {
  Biology: "Biology",
  "US History": "US History",
  "Computer Science": "Computer Science",
  Law: "Law",
  "World History": "World History",
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
  const selectedSubject = props.selectedSubject
  const setSelectedSubject = props.setSelectedSubject;
  if (subjects) {
    return (
      <div className="flex flex-wrap justify-around items-center">
        {subjects.map((subject: Subject, index: number) => {
          return (
            <div
              key={index}
              className="flex-row w-full sm:w-5/6 xl:w-4/6 mb-8 items-center justify-center"
            >
              <button
                className={`flex-row w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 justify-center px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline
                            ${subject == selectedSubject ? "bg-secondary-400 rotate-3" : "bg-white"}`}
                onClick={() => setSelectedSubject(subject)}
              >
                {/* <div className="flex-col justify-center">
                  <div className="flex justify-center">
                    <Image
                      className="justify-center rounded-full border shadow"
                      src={subjectImages[subject.name]}
                      alt={subject.name}
                      width={96}
                      height={96}
                    />
                  </div>
                </div> */}
                <div className="flex-col justify-center">
                  {/* <div> */}
                    <h2 className="flex justify-center text-center font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      {subjectNames[subject.name]}
                    </h2>
                    {/* <p className="text-gray-600 text-center text-md">
                      {subjectDescriptions[subject.name]}
                    </p> */}
                  {/* </div> */}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-1/4 py-2">
        <LoadingSymbol color={"#EE909C"} />
      </div>
    );
  }
};

export default SubjectSelector;
