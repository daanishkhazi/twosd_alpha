import { useBalance } from "../Context/balance-context";
import Link from "next/link";

const UsageBar: React.FC = () => {
  const { promptBalance, setPromptBalance } = useBalance();

  return (
    <div className="lg:mt-0 flex text-gray-700 py-1 px-3 border-4 border-primary-400">
      {/* <div className="col-span-1">
                        
                        <div className="flex flex-row items-center space-x-2">
                            <a className="text-sm">{`You have used ${promptBalance.balance} out of ${promptBalance.quota} free prompts available this month`}</a>
                            
                        </div>
                    </div> */}
      <div className=" w-full justify-center">
        <div
          className="tooltip tooltip-top tooltip-primary flex text-sm justify-between items-center py-1"
          data-tip="Prompts used out of available monthly balance"
        >
          <div className="pr-3 pl-1">{`${promptBalance.balance}/${promptBalance.quota}`}</div>
          <progress
            className="progress h-3 justify-center"
            value={(promptBalance.balance / promptBalance.quota) * 100}
            max="100"
          >
            {`${Math.round(
              (promptBalance.balance / promptBalance.quota) * 100
            )}%`}
          </progress>
        </div>
        <Link href="/settings" className="justify-center">
          <button className="btn btn-xs text-sm text-black w-full bg-primary-400 hover:bg-primary-700 border-0 justify-center">
            Want more?
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UsageBar;
