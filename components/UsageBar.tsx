import { useBalance } from "../Context/balance-context";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UsageBar: React.FC = () => {
  const { promptBalance, setPromptBalance } = useBalance();

  return (
    <div className="items-center w-4/6 mt-10 px-5 py-3 border-4 border-slate-300 justify-center shadow-2xl rounded-xl">
      <div className=" w-full justify-center">
        <div
          className="tooltip tooltip-top tooltip-primary flex text-sm justify-between items-center py-1"
          data-tip="Prompts used out of available monthly balance"
        >
          <div className="pr-3 pl-1">{`${promptBalance.balance}/${promptBalance.quota}`}</div>
          <progress
            className="progress bg-slate-100 h-3 justify-center"
            value={(promptBalance.balance / promptBalance.quota) * 100}
            max="100"
          >
            {`${Math.round(
              (promptBalance.balance / promptBalance.quota) * 100
            )}%`}
          </progress>
        </div>
        <div className="flex justify-center items-center italic">
          <div className="flex flex-col px-4">
            Want to ask more questions?{" "}
          </div>
          <Link href="/settings" className="flex w-1/4">
            <button className="hover:scale-105 transition ease-in-out delay-50 text-sm px-1 py-1 rounded-xl text-black w-full bg-teal-400 border-0 justify-center min-w-max">
              Upgrade
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UsageBar;
