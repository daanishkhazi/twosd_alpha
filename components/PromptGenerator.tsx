import { Prompt, PromptGeneratorProps } from "../types";
import styles from "../styles/Interface.module.css";

const PromptGenerator = (props: PromptGeneratorProps) => {
  const prompts = props.prompts;
  const setSelectedPrompt = props.setSelectedPrompt;
  const selectedPrompt = props.selectedPrompt;
  const size = props.size;
  const animate = props.animate;

  const textConfig = size === "small" ? "text-xs" : "";
  const spacingConfig = size === "small" ? "" : "pt-7";
  const bubbleConfig = size === "small" ? "px-2 py-2" : "px-4 py-3";
  const animateConfig = animate ? "animate-pulser" : "";

  if (prompts) {
    return (
      <div
        className={`flex flex-row flex-wrap justify-center ${spacingConfig} text-[0.5rem] xs:text-[0.8rem] md:text-sm lg:text-md`}
      >
        {prompts.map((p: Prompt, index: number) => {
          if (selectedPrompt && p.description != selectedPrompt.description) {
            return (
              <div
                className="flex justify-center items-center px-2 py-1"
                key={index}
              >
                <button
                  className={`justify-center items-center transition ease-in-out delay-50 inline-block text-md text-gray-500 ${bubbleConfig} leading-none bg-gray-100 border-2 border-primary-300 shadow-md rounded-3xl hover:scale-105`}
                  onClick={() => setSelectedPrompt(p)}
                >
                  {p.description}
                </button>
              </div>
            );
          } else {
            return (
              <div
                className={`flex justify-center items-center px-3 py-1 ${animateConfig}`}
                key={index}
              >
                <button
                  className={`transition ease-in-out delay-50 inline-block text-md font-medium text-gray-900 ${bubbleConfig} leading-none bg-primary-300 border-2 border-primary-300 shadow-md rounded-3xl hover:scale-105`}
                  onClick={() => setSelectedPrompt(p)}
                >
                  {p.description}
                </button>
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    // Should improve error handling strategy at some point..
    return <div>Error: Prompts failed to load</div>;
  }
};

export default PromptGenerator;
