import { Prompt, PromptGeneratorProps } from "../types";
import styles from "../styles/Interface.module.css";

const PromptGenerator = (props: PromptGeneratorProps) => {
    const prompts = props.prompts;
    const setSelectedPrompt = props.setSelectedPrompt
    if (prompts) {
        return (
          <div className={styles.formdiv}>
            {prompts.map((p: Prompt, index: number) => {
              return (
                <div style={{ padding: "5px" }} key={index}>
                  <button
                    className={styles.promptButton}
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
        return (<div>Error: Prompts failed to load</div>)
      }
  };
  
export default PromptGenerator;