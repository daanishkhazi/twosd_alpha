import { QueryInputProps } from "../types";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";
import UsageBar from "./UsageBar";
import { useBalance } from "../Context/balance-context";

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3.5}
    stroke="currentColor"
    className="w-4 h-4 inline-block"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />
  </svg>
);

const QueryInput = (props: QueryInputProps) => {
  const handleSubmit = props.handleSubmit;
  const handleQueryChange = props.handleQueryChange;
  const setSelectedPrompt = props.setSelectedPrompt;
  const selectedPrompt = props.selectedPrompt;
  const charCount = props.charCount;
  const query = props.query;

  const {promptBalance, setPromptBalance} = useBalance();

  return (
    <div className="flex flex-col justify-center align-center margin">
      <form onSubmit={handleSubmit}>
        <label></label>
        <h2 className="mt-8 font-semibold text-2xl text-gray-900">
          <button
            className="inline-block text-4xl font-bold text-gray-900"
            onClick={() => setSelectedPrompt(null)}
          >
            {icon}
          </button>{" "}
          {selectedPrompt.description}
        </h2>

        <textarea
          rows={10}
          placeholder={selectedPrompt.placeholder}
          className="bg-white focus:outline-none resize-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-3"
          onChange={handleQueryChange}
          value={query}
          maxLength={selectedPrompt.charLimit}
        />
        <div className="grid grid-cols-6 gap-4 p-4">
          <div className="col-span-2 col-start-1 text-sm text-gray-500 italic">
            <div>{charCount} / {selectedPrompt.charLimit} Characters</div>
            <div>
              <button
                type="submit"
                className="inline-block text-sm font-semibold text-gray-900 px-4 py-2 mt-3 leading-none bg-green-300 rounded-md hover:bg-green-400 disabled:bg-slate-400"
                disabled={promptBalance.balance>=promptBalance.quota}
              >
                {promptBalance.balance<promptBalance.quota ? "Submit" : "Monthly Quota Exceeded"}
              </button>
            </div>
          </div>
          <div className="col-span-4 col-end-7" >
            <UsageBar/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;
