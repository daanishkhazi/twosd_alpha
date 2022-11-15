import React, {useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SignOut from "./icons/signOut";
import Settings from "./icons/settings";
import { useBalance } from "../Context/balance-context";

const Navbar: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => {
    return router.pathname === pathname;
  };

  const { data: session, status } = useSession();
  const {promptBalance, setPromptBalance} = useBalance();

  useEffect(() => {
    if (session && promptBalance.balance === -1) {
      setPromptBalance({
        balance: session.user.promptsUsed,
        quota: session.user.promptsQuota
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white shadow-md sticky top-0 z-50 px-6 xl:px-12 py-2">
      <div className="flex items-center mr-6">
        <Link href="/">
          <Image src="/bream.svg" alt="logo" height={150} width={150} />
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm font-semibold lg:flex-grow">
          <Link
            href="/interface"
            className={
              "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
            }
          >
            Tutor
          </Link>
          <Link
            href="/about"
            className={
              "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
            }
          >
            Guide
          </Link>
        </div>
        <div>
          {status === "loading" && <div>Loading...</div>}
          {status === "unauthenticated" && (
            <div>
              <Link
                href="/api/auth/signin"
                className="inline-block text-sm font-semibold text-gray-700 px-4 py-2 leading-none bg-slate-200 rounded-full hover:bg-slate-300 mt-4 lg:mt-0"
              >
                Sign In
              </Link>
            </div>
          )}
          {status === "authenticated" && (
            <div>
              <p className="inline-block text-sm px-4 py-2 leading-none text-gray-900 mt-4 lg:mt-0">
                {session.user?.name}
              </p>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">Account</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 border-4 border-primary-400 shadow-2xl bg-base-100 rounded-box w-52">
                  <li>
                    <div className="lg:mt-0 text-sm text-gray-700 hover:text-primary-500">
                      <progress className="progress justify-right h-4" value={(promptBalance.balance/promptBalance.quota)*100} max="100">{`${Math.round((promptBalance.balance/promptBalance.quota)*100)}%`}</progress>
                      <a className="text-xs">{`${Math.round(100*(promptBalance.balance/promptBalance.quota))}%`}</a>
                    </div>
                  </li>
                  <li>
                    <Link href="/settings">
                      <div className="items-center flex lg:mt-0 text-sm text-gray-700 hover:text-primary-500">
                        <Settings/>
                        Account Settings
                      </div>
                    </Link>
                  </li>
                  <li>  
                    <button
                      onClick={() => signOut()}
                      className="items-center justify-left px-4 py-2 leading-none bg-slate-200 rounded-full hover:bg-slate-300"
                    >
                        <SignOut/>
                        <a className="text-sm font-semibold text-gray-700">Sign out</a>
                    </button>
                  </li>
                </ul> 

              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
