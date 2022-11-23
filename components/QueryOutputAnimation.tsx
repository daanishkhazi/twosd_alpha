import { useEffect, useState } from "react";
import CopyButton from "./icons/CopyButton";
import RefreshIcon from "./icons/refreshIcon";
import LoadingSymbol from "./LoadingSymbol";

const QueryOutputAnimation = (props: {sample_query_outputs: Array<Array<string>>}) => {
    const sample_query_outputs = props.sample_query_outputs;
    // const endQuery = props.sample_query_output[0];
    // const endOutput = props.sample_query_output[1];
    

    const [currentQuery, setCurrentQuery] = useState("")
    const [currentOutput, setCurrentOutput] = useState("")
    const [currExampleIndex, setCurrExampleIndex] = useState(0)
    const [endQuery, setEndQuery] = useState(sample_query_outputs[0][0])
    const [endOutput, setEndOutput] = useState(sample_query_outputs[0][1])


    useEffect(() => {
        const timeout = setTimeout(() => {
          setCurrentQuery(endQuery.slice(0, currentQuery.length + 1));
        }, 50);
        if (currentQuery.length === endQuery.length) {setCurrentOutput(endOutput)}
        return () => clearTimeout(timeout);
      }, [currentQuery, endQuery, endOutput]);

    const refresh = () => {
        const new_i = (currExampleIndex + 1) % (sample_query_outputs.length)
        setCurrExampleIndex(new_i)
        setEndQuery(sample_query_outputs[new_i][0])
        setEndOutput(sample_query_outputs[new_i][1])
        setCurrentQuery("")
        setCurrentOutput("")
    }

    return (
        <div
            className="animate-fade-in flex flex-col items-start rounded-xl shadow-lg border-4 border-primary-400 bg-white mb-6 hover:bg-gray-100 focus:outline-none focus:shadow-outline"
        >
            <div className="flex justify-between w-full bg-primary-400 px-4">
                <div className="flex items-center max-w-5/6 pr-3"> 
                <div className="flex break-words font-medium text-xl py-4">
                    {currentQuery}
                </div>
                </div>
                {currentOutput === "" ?
                <div className="flex justify-end w-1/6 max-h-12 pt-2 pl-2">
                    <LoadingSymbol color={"#FFFFFF"} />
                </div> 
                : <div className="flex tooltip tooltip-right justify-end w-1/6 max-h-14 py-3" data-tip="Click to see another example!" >
                    <button className="flex w-full justify-end hover:scale-110" onClick={() => refresh()}>
                        <RefreshIcon/>
                    </button>
                    {/* </div> */}
                    </div>}
            </div>
            {currentOutput !== "" ? 
            <div className="flex pt-6 p-4 italic items-center">
                {/* {sample_query_output[1] != "" ? ( */}
                <div className="flex items-center break-words">{currentOutput}</div>
                {/* ) 
                : (
                <div className="flex items-center justify-center h-16">
                    <LoadingSymbol color={"#EE909C"} />
                </div>
                )} */}
            </div> : null}
        </div>
        );
  };
  
  export default QueryOutputAnimation;