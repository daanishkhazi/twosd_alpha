import { Subject, SubjectSelectorProps } from "../types";
import React from "react";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

const SubjectSelector = (props: SubjectSelectorProps) => {
    const subjects = props.subjects;
    const setSelectedSubject = props.setSelectedSubject;
    if (subjects) {
        return (
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
        );
      } else {
        return <LoadingSymbol/>
      }
  };
  
export default SubjectSelector;