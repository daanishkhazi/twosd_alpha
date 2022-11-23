import { useEffect, useState } from "react";
import CopyButton from "./icons/CopyButton";
import RefreshIcon from "./icons/refreshIcon";
import LoadingSymbol from "./LoadingSymbol";
import QueryInput from "./QueryInput";
import QueryOutputAnimation from "./QueryOutputAnimation";
import Image from "next/image";
import PromptGenerator from "./PromptGenerator";
import { Prompt } from "../types";

const InterfaceAnimation = (props: {
  sample_query_outputs: Array<Array<string>>;
}) => {
  const sample_query_outputs = props.sample_query_outputs;

  const [currentQuery, setCurrentQuery] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");
  const [currExampleIndex, setCurrExampleIndex] = useState(0);
  const [currRenderedIndex, setCurrRenderedIndex] = useState(-1);
  const [endQuery, setEndQuery] = useState(sample_query_outputs[0][0]);
  const [endOutput, setEndOutput] = useState(sample_query_outputs[0][1]);
  const [firstRender, setFirstRender] = useState(true);
  const [sendAnimationTrigger, setSendAnimationTrigger] = useState("");
  const [promptAnimationTrigger, setPromptAnimationTrigger] = useState(true);

  const animationPrompts = [
    { description: "What's the difference between..." },
    { description: "Explain the intuition behind..." },
    { description: "Explain why this is wrong:" },
    { description: "Finish the thought:" },
    { description: "Ask an open ended question" },
  ];
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(
    animationPrompts[4]
  );

  // For query//output pair:
  //  1. type out message in textarea
  //  2. show submit button popping out
  //  3. add history generation element

  useEffect(() => {
    // console.log('curr', currentQuery, 'end', endQuery)
    const effectWrapper = async () => {
      const timeout = setTimeout(() => {
        setCurrentQuery(endQuery.slice(0, currentQuery.length + 1));
      }, 35);
      if (currentQuery.length === endQuery.length - 15) {
        setSendAnimationTrigger("animate-pulser");
      }
      if (currentQuery.length === endQuery.length) {
        setCurrExampleIndex(
          (currExampleIndex + 1) % sample_query_outputs.length
        );
        setCurrRenderedIndex(currExampleIndex);
        setPromptAnimationTrigger(false);
        // setEndQuery(sample_query_outputs[(currExampleIndex + 1) % sample_query_outputs.length][0])
        // setEndOutput(sample_query_outputs[(currExampleIndex + 1) % sample_query_outputs.length][1])
      }
      return () => clearTimeout(timeout);
    };
    currentQuery.length === 0
      ? setTimeout(() => effectWrapper(), 600)
      : effectWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery, endQuery, endOutput]);

  useEffect(() => {
    console.log(currExampleIndex);
    const effectWrapper = async () => {
      if (!firstRender) {
        const timeout2 = setTimeout(
          () => {
            setCurrentQuery("");
            setEndQuery(sample_query_outputs[currExampleIndex][0]);
            setEndOutput(sample_query_outputs[currExampleIndex][1]);
            setPromptAnimationTrigger(true);
            if (currExampleIndex === 0) {
              setCurrRenderedIndex(-1);
            }
            setSendAnimationTrigger("");
            setSelectedPrompt({
              description: sample_query_outputs[currExampleIndex][2],
            });
            return () => clearTimeout(timeout2);
            // if (currExampleIndex === 0) {setTimeout(() => {setCurrRenderedIndex(-1)}, 8000)}
          },
          currExampleIndex === 0 ? 6000 : 6000
        );
      } else {
        setFirstRender(false);
      }
    };
    effectWrapper();
    // if (currExampleIndex === 0) {
    //     console.log('trig')
    //     if (!firstRender) {
    //         setTimeout(() => {setCurrRenderedIndex(-1)}, 8000)
    //     } else {
    //         setFirstRender(false)
    //     }
    // }
    // return () => clearTimeout(timeout2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currExampleIndex]);

  return (
    // <div className={`flex-row h-[35rem] ${currExampleIndex > -10 ? "items-end" : "items-center"} w-full pointer-events-none`}>
    <div
      className={`flex w-[42rem] h-[28rem] border border-gray-300 rounded-box shadow-2xl ${
        currRenderedIndex >= 1 ? "items-end" : "items-center"
      } bg-white px-14 relative overflow-hidden`}
    >
      <div
        className={`flex mask-up ${
          currRenderedIndex >= 1 ? "items-end" : "items-center"
        } w-[42rem] h-[28rem] items-end`}
      >
        <div className={`flex-row w-full relative pointer-events-none z-0`}>
          {currRenderedIndex >= 0 && (
            <QueryOutputAnimation
              sample_query_outputs={[sample_query_outputs[0]]}
              dynamic={false}
              textSize={"text-sm"}
            />
          )}
          {currRenderedIndex >= 1 && (
            <QueryOutputAnimation
              sample_query_outputs={[sample_query_outputs[1]]}
              dynamic={false}
              textSize={"text-sm"}
            />
          )}
          {currRenderedIndex >= 2 && (
            <QueryOutputAnimation
              sample_query_outputs={[sample_query_outputs[2]]}
              dynamic={false}
              textSize={"text-sm"}
            />
          )}
          {/* <QueryOutputAnimation sample_query_outputs={[sample_query_outputs[0]]} dynamic={false} textSize={"text-sm"}/> */}
          <PromptGenerator
            prompts={animationPrompts}
            setSelectedPrompt={setSelectedPrompt}
            selectedPrompt={selectedPrompt}
            size={"small"}
            animate={promptAnimationTrigger}
          />
          <div className="flex flex-col w-full justify-center align-center margin">
            {/* <form> */}
            <label></label>
            <div className="bg-white resize-none border-4 border-secondary-400 rounded-2xl block w-full appearance-none leading-normal mt-3">
              <textarea
                rows={1}
                // placeholder={"Test"}
                className="bg-white text-sm ring-transparent focus:outline-none resize-none rounded-2xl p-5 block w-full appearance-none leading-normal"
                // onChange={handleQueryChange}
                disabled={true}
                value={currentQuery}
                // maxLength={selectedPrompt ? selectedPrompt.charLimit : 0}
                // onKeyDown={enterSubmit}
              />
              <div className="flex justify-end">
                <div
                  // type="submit"
                  className={`${sendAnimationTrigger} inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none rounded-md disabled:bg-slate-400`}
                  // disabled={promptBalance.balance >= promptBalance.quota}
                  // ref={buttonRef}
                >
                  {/* {promptBalance.balance < promptBalance.quota ? ( */}
                  <div>
                    <Image src="/send.svg" alt="logo" height={30} width={30} />
                  </div>
                  {/* // ) : (
                        //     "Monthly Quota Exceeded"
                        // )} */}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-top pt-3 px-6 text-sm text-gray-500 italic">
              {/* <div>
                        {selectedPrompt
                        ? `${charCount} / ${selectedPrompt.charLimit} Characters`
                        : ""}
                    </div> */}
              {/* {history.length > 1 ? (
                        <button
                        className="inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none bg-primary-400 rounded-md hover:bg-red-500"
                        // onClick={handleClear}
                        >
                        {" "}
                        Clear History{" "}
                        </button>
                    ) : null} */}
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceAnimation;
