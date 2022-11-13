import { Prompt, PromptGeneratorProps } from "../types";
import styles from "../styles/Interface.module.css";

const PromptGenerator = (props: PromptGeneratorProps) => {
  const prompts = props.prompts;
  const setSelectedPrompt = props.setSelectedPrompt;
  if (prompts) {
    return (
      <div className="flex flex-row">
        {prompts.map((p: Prompt, index: number) => {
          return (
            <div className="space-x-4" key={index}>
              <button
                className="transition ease-in-out delay-50 inline-block text-md font-medium text-gray-900 px-4 py-3 leading-none bg-white border border-gray-100 shadow-md rounded-xl hover:scale-105 mt-4 mr-4 lg:mt-6"
                onClick={() => setSelectedPrompt(p)}
              >
                {p.description}
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    // Should improve error handling strategy at some point..
    return <div>Error: Prompts failed to load</div>;
  }
};

export default PromptGenerator;
