import { useBalance } from "../Context/balance-context";
import Link from "next/link";

const UsageBar: React.FC = () => {
    const {promptBalance, setPromptBalance} = useBalance();
    // console.log('usage', promptBalance)
    return (
                <div className="lg:mt-0 text-gray-700 bg-pink-100 py-1 px-3 border-4 border-primary-400">
                    <div>
                        <progress className="progress h-3" value={(promptBalance.balance/promptBalance.quota)*100} max="100">{`${Math.round((promptBalance.balance/promptBalance.quota)*100)}%`}</progress>
                        <div className="flex flex-row items-center space-x-2">
                            <a className="text-sm">{`You have used ${promptBalance.balance} out of ${promptBalance.quota} free prompts available this month`}</a>
                            <Link href="/settings">
                                <button className="btn btn-xs text-sm">Want more?</button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
  };
  
export default UsageBar;