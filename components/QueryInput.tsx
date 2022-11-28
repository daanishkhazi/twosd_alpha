import { QueryInputProps } from "../types";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";
import UsageBar from "./UsageBar";
import Image from "next/image";
import { useBalance } from "../Context/balance-context";
import { useSession } from "next-auth/react";
import React, { useRef, useEffect } from "react";

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3.5}
    stroke="currentColor"
    className="w-4 h-4 inline-block"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />
  </svg>
);

const QueryInput = (props: QueryInputProps) => {
  const handleSubmit = props.handleSubmit;
  const handleQueryChange = props.handleQueryChange;
  const setSelectedPrompt = props.setSelectedPrompt;
  const selectedPrompt = props.selectedPrompt;
  const charCount = props.charCount;
  const query = props.query;
  const history = props.history;
  const handleClear = props.handleClear;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, status } = useSession();
  const isActive = data?.user?.isActive;

  const { promptBalance, setPromptBalance } = useBalance();

  const enterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code && e.code === "Enter" && !e.shiftKey) {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center align-center margin">
      <form onSubmit={handleSubmit}>
        <label></label>
        <div className="bg-white resize-none border-4 border-secondary-400 rounded-2xl block w-full appearance-none leading-normal mt-3">
          <textarea
            rows={6}
            placeholder={
              promptBalance.balance < promptBalance.quota ? (selectedPrompt
                                                                  ? selectedPrompt.placeholder
                                                                  : "Please select prompt") 
                                                          : "Monthly Quota Exceeded"
            }
            className="bg-white ring-transparent focus:outline-none resize-none rounded-2xl p-5 block w-full appearance-none leading-normal"
            onChange={handleQueryChange}
            disabled={selectedPrompt === null}
            value={query}
            maxLength={selectedPrompt ? selectedPrompt.charLimit : 0}
            onKeyDown={enterSubmit}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="hover:scale-125 transition ease-in-out delay-50 inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none rounded-md disabled:bg-slate-400"
              disabled={promptBalance.balance >= promptBalance.quota}
              ref={buttonRef}
            >
              {promptBalance.balance < promptBalance.quota ? (
                <div>
                  <Image src="/send.svg" alt="logo" height={30} width={30} />
                </div>
              ) : (
                <div></div>
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-top pt-3 px-6 text-sm text-gray-500 italic">
          <div ref={bottomRef}>
            {selectedPrompt
              ? `${charCount} / ${selectedPrompt.charLimit} Characters`
              : ""}
          </div>
          {history.length > 1 ? (
            <button
              className="inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none bg-primary-400 rounded-md hover:bg-red-500"
              onClick={handleClear}
            >
              {" "}
              Clear History{" "}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default QueryInput;
