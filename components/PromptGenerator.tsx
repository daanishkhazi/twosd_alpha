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
        className={`hidden sm:flex  flex-row flex-wrap justify-center ${spacingConfig} text-[0.5rem] xs:text-[0.8rem] md:text-sm lg:text-md`}
      >
        {prompts.map((p: Prompt, index: number) => {
          if (selectedPrompt && p.description != selectedPrompt.description) {
            return (
              <div
                className="flex justify-center items-center px-0 sm:px-1 py-1"
                key={index}
              >
                <button
                  className={`justify-center items-center transition ease-in-out delay-50 inline-block text-md text-gray-600 ${bubbleConfig} leading-none bg-white border-2 border-black rounded-full hover:scale-105`}
                  onClick={() => setSelectedPrompt(p)}
                >
                  {p.description}
                </button>
              </div>
            );
          } else {
            return (
              <div
                className={`flex justify-center items-center px-0 sm:px-2 py-1 ${animateConfig}`}
                key={index}
              >
                <button
                  className={`transition ease-in-out delay-50 inline-block text-md font-medium text-black ${bubbleConfig} leading-none bg-secondary-400 border-2 border-black rounded-full hover:scale-105`}
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
