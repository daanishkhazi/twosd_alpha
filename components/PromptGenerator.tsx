import { Prompt, PromptGeneratorProps } from "../types";
import styles from "../styles/Interface.module.css";

const PromptGenerator = (props: PromptGeneratorProps) => {
  const prompts = props.prompts;
  const setSelectedPrompt = props.setSelectedPrompt;
  const selectedPrompt = props.selectedPrompt;
  if (prompts) {
    return (
      <div className="flex flex-row flex-wrap justify-center pt-7">
        {prompts.map((p: Prompt, index: number) => {
          if (p != selectedPrompt) {
            return (
              <div
                className="flex justify-center items-center px-3 py-1"
                key={index}
              >
                <button
                  className="justify-center items-center transition ease-in-out delay-50 inline-block text-md text-gray-500 px-4 py-3 leading-none bg-gray-100 border-2 border-primary-300 shadow-md rounded-3xl hover:scale-105"
                  onClick={() => setSelectedPrompt(p)}
                >
                  {p.description}
                </button>
              </div>
            );
          } else {
            return (
              <div
                className="flex justify-center items-center px-3 py-1"
                key={index}
              >
                <button
                  className="transition ease-in-out delay-50 inline-block text-md font-medium text-gray-900 px-4 py-3 leading-none bg-primary-300 border-2 border-primary-300 shadow-md rounded-3xl hover:scale-105"
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
