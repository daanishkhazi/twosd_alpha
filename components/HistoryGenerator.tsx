import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

const HistoryGenerator = (props: { history: Array<Array<string>> }) => {
  const history = props.history;
  return (
    <div>
      {history.map((past_query_output: Array<string>, index: number) => {
        if (past_query_output[0] != "") {
          return (
            <div
              className="animate-fade-in flex flex-col items-start space-y-6 px-12 py-8 my-6 rounded-lg shadow-lg bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline"
              key={index}
            >
              <div className="break-words font-medium text-xl">
                {past_query_output[0]}
              </div>
              <div className="border-t border-gray-400 pt-6 italic">
                {past_query_output[1] != "" ? (
                  <div className="break-words">{past_query_output[1]}</div>
                ) : (
                  <div className="break-words">
                    <LoadingSymbol />
                  </div>
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
