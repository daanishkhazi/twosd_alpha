import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";
import Image from "next/image";
import CopyButton from "./icons/CopyButton";
import { useState, useEffect } from "react";

const HistoryGenerator = (props: { history: Array<Array<string>> }) => {
  const history = props.history;

  // TODO - check whether this is going to blow up memory
  const [copiedIndex, setCopiedIndex] = useState<number | null>(-1)

  const handleCopy = (index: number, text: string) => {
    setCopiedIndex(index);
    navigator.clipboard.writeText(text.trim())
  }

  return (
    <div className="pt-10 z-10">
      {history.map((past_query_output: Array<string>, index: number) => {
        if (past_query_output[0] != "") {
          return (
            <div
              className="animate-fade-in flex flex-col items-start rounded-xl shadow-lg border-4 border-primary-400 bg-white mb-6 hover:bg-gray-100 focus:outline-none focus:shadow-outline"
              key={index}
            >
              <div className="flex justify-between w-full bg-primary-400 px-4">
                  <div className="flex items-center max-w-5/6 pr-3"> 
                    <div className="flex break-words font-medium text-xl py-4">
                      {past_query_output[0]}
                    </div>
                  </div>
                  {past_query_output[1] === "" ?
                    <div className="flex justify-end w-1/6 max-h-12 pt-2 pl-2">
                      <LoadingSymbol color={"#FFFFFF"} />
                    </div> 
                   : <div className="flex justify-end w-1/6 max-h-14 py-3">
                        <button className="flex w-full justify-end" onClick={() => handleCopy(index, past_query_output[1])}>
                          <CopyButton copied={copiedIndex===index}/>
                        </button>
                      </div>}
              </div>
              {past_query_output[1] !== "" ? 
                <div className="flex pt-6 p-4 italic items-center">
                  {past_query_output[1] != "" ? (
                    <div className="flex items-center break-words">{past_query_output[1]}</div>
                  ) : (
                    <div className="flex items-center justify-center h-16">
                      <LoadingSymbol color={"#EE909C"} />
                    </div>
                  )}
                </div> : null}
            </div>
          );
        }
      })}
    </div>
  );
};

export default HistoryGenerator;
