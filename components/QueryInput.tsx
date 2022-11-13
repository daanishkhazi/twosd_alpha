import { QueryInputProps } from "../types";
import styles from "../styles/Interface.module.css";
import LoadingSymbol from "./LoadingSymbol";

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
        <p className="flex justify-right text-sm text-gray-500 italic">
          {charCount} / {selectedPrompt.charLimit} Characters
        </p>
        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="inline-block text-sm font-semibold text-gray-900 px-4 py-2 mt-3 leading-none bg-green-300 rounded-md hover:bg-green-400"
          >
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;
