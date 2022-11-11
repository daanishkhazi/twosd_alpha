import { QueryInputProps } from "../types";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

const QueryInput = (props: QueryInputProps) => {

    const handleSubmit = props.handleSubmit;
    const handleQueryChange = props.handleQueryChange;
    const setSelectedPrompt = props.setSelectedPrompt;
    const selectedPrompt = props.selectedPrompt;
    const charCount = props.charCount;
    const query = props.query;

    return (
        <div className={styles.formdiv}>
          <form onSubmit={handleSubmit}>
            <label></label>
            <p>{selectedPrompt.description}</p>
            <p className={styles.charCount}>
              {charCount} / {selectedPrompt.charLimit} Characters
            </p>
            <textarea
              rows={10}
              placeholder={selectedPrompt.placeholder}
              className={styles.input}
              onChange={handleQueryChange}
              value={query}
              maxLength={selectedPrompt.charLimit}
            />
            <div className={styles.buttondiv}>
              <button type="submit" className={styles.submit}>
                {" "}
                Submit{" "}
              </button>
              <button
                className={styles.clear}
                onClick={() => setSelectedPrompt(null)}
              >
                {" "}
                Change Prompt{" "}
              </button>
            </div>
          </form>
        </div>
    );

    
  };
  
export default QueryInput;