import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

const HistoryGenerator = (props: {history: Array<Array<string>>}) => {
    const history = props.history;
    return (
        <div>
          {history.map((past_query_output: Array<string>, index: number) => {
            if (past_query_output[0] != "") {
              return (
                <div className={styles.historyEntry} key={index}>
                  <p className={styles.historyLabel}> Query </p>
                  <div className={styles.query}>{past_query_output[0]}</div>
                  <div>
                    <p className={styles.charCount}> Output </p>
                    {past_query_output[1] != "" ? (
                      <div className={styles.output}>{past_query_output[1]}</div>
                    ) : (
                      <div className={styles.output}><LoadingSymbol/></div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
  };
  
export default HistoryGenerator;