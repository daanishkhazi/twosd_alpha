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

  useEffect(() => {
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
          },
          currExampleIndex === 0 ? 6000 : 6000
        );
      } else {
        setFirstRender(false);
      }
    };
    effectWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currExampleIndex]);

  return (
    <div
      className={`flex h-[65vh] w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] border border-gray-300 rounded-box shadow-2xl ${
        currRenderedIndex >= 1 ? "items-end" : "items-center"
      } bg-white px-6 sm:px-14 relative overflow-hidden justify-center`}
    >
      <div
        className={`flex mask-up ${
          currRenderedIndex >= 1 ? "items-end" : "items-center"
        } h-[65vh] w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]`}
      >
        <div className={`flex flex-col w-full relative pointer-events-nonez-0`}>
          {currRenderedIndex >= 0 && (
          // {true && (
            <QueryOutputAnimation
              sample_query_outputs={[sample_query_outputs[0]]}
              dynamic={false}
              textSize={"text-sm"}
            />
          )}
          {currRenderedIndex >= 1 && (
          //  {true && (
            <QueryOutputAnimation
              sample_query_outputs={[sample_query_outputs[1]]}
              dynamic={false}
              textSize={"text-sm"}
            />
          )}
          {currRenderedIndex >= 2 && (
          // {true && (
            <QueryOutputAnimation
              sample_query_outputs={[sample_query_outputs[2]]}
              dynamic={false}
              textSize={"text-sm"}
            />
          )}
          <PromptGenerator
            prompts={animationPrompts}
            setSelectedPrompt={setSelectedPrompt}
            selectedPrompt={selectedPrompt}
            size={"small"}
            animate={promptAnimationTrigger}/>
          <div className="flex flex-col w-full h-full justify-center align-center margin">
            <label></label>
            <div className="bg-white w-full resize-none border-4 border-secondary-400 rounded-2xl appearance-none leading-normal mt-2 sm:mt-4">
              {/* <textarea
                rows={1}
                className="flex bg-white text-[0.5rem] sm:text-sm ring-transparent focus:outline-none resize-none rounded-2xl p-2 sm:p-5 w-full appearance-none leading-normal z-10"
                disabled={true}
                value={currentQuery}
              /> */}
              <div className="flex w-full bg-white text-[0.5rem] sm:text-sm ring-transparent focus:outline-none resize-none rounded-2xl p-2 sm:p-5 appearance-none leading-normal z-10">
                {currentQuery}
              </div>
              <div className="flex justify-end py-1 z-0">
                <div
                  className={`${sendAnimationTrigger} relative inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none rounded-md disabled:bg-slate-400`}
                >
                  {/* <div> */}
                    <Image src="/send.svg" alt="logo" 
                      // height={30} width={30} 
                      fill={true}
                    />
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-top pt-3 px-6 text-sm text-gray-500 italic">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceAnimation;
