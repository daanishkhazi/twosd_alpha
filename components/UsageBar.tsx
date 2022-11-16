import { useBalance } from "../Context/balance-context";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UsageBar: React.FC = () => {
  const { promptBalance, setPromptBalance } = useBalance();

  return (
    <div className="lg:mt-0 flex text-gray-700 py-2 px-6 border bg-base-100 shadow-md rounded-xl min-w-max">
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
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-3/4">
            Want to ask more questions?{" "}
          </div>
          <Link href="/settings" className="flex flex-col w-1/4">
            <button className="hover:scale-105 transition ease-in-out delay-50 text-sm px-1 py-1 rounded-xl text-black w-full bg-primary-300 border-0 justify-center min-w-max">
              Upgrade
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UsageBar;
