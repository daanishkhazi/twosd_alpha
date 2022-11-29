import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SignOut from "./icons/signOut";
import Settings from "./icons/settings";
import { useBalance } from "../Context/balance-context";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { NavbarProps } from "../types";

const Navbar = (props: NavbarProps) => {
  const route = props.route;
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) => {
    return router.pathname === pathname;
  };

  const { data: session, status } = useSession();
  const { promptBalance, setPromptBalance } = useBalance();

  // Can hide navbar if at top of page
  const [visible, setVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 25) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // const visible = true;

  useEffect(() => {
    if (session && promptBalance.balance === -1) {
      setPromptBalance({
        balance: session.user.promptsUsed,
        quota: session.user.promptsQuota,
        name: session.user.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <nav
      className={
        route === "/"
          ? `flex items-center w-full justify-between flex-wrap bg-white shadow-md sticky top-0 px-6 xl:px-12 py-2 ${
              visible ? "z-50" : "-z-20"
            }`
          : "flex items-center w-full justify-between flex-wrap bg-white shadow-md sticky top-0 z-50 px-6 xl:px-12 py-2"
      }
      // className="flex items-center w-full justify-between flex-wrap bg-white shadow-md sticky top-0 z-50 px-6 xl:px-12 py-2"
    >
      <div className="flex w-full h-full justify-between items-center">
      {/* <div className="flex w-full items-center mr-6"> */}
      <div className="flex items-center mr-6">
        <Link href="/">
          {/* <div className="flex items-center mr-6"> */}
            <Image src="/laera.svg" alt="logo" 
              height={150} width={150} 
              // fill={true}
            />
          {/* </div> */}
        </Link>
      </div>
      {/* </div> */}
      <div className="w-auto flex items-center justify-end">
        {/* <div className=""> */}
          {/* <Link
            href="/interface"
            className={
              "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
            }
          >
            Tutor
          </Link>
          {isActive("/") ? (
            <div className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              <ScrollLink
                activeClass="activeScrollElement"
                to="features"
                spy={true}
                smooth={true}
                duration={500}
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 active:border-b-4 active:border-primary-400 mr-4"
                }
              >
                Features
              </ScrollLink>
              <ScrollLink
                activeClass="activeScrollElement"
                to="testimonials"
                spy={true}
                smooth={true}
                duration={500}
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
                }
              >
                Testimonials
              </ScrollLink>
              <ScrollLink
                activeClass="activeScrollElement"
                to="faqs"
                spy={true}
                smooth={true}
                duration={500}
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
                }
              >
                FAQs
              </ScrollLink>
              <ScrollLink
                activeClass="activeScrollElement"
                to="pricing"
                spy={true}
                smooth={true}
                duration={500}
                className={
                  "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
                }
              >
                Pricing
              </ScrollLink>
            </div>
          ) : null} */}
        {/* </div> */}
        <div className="flex items-center">
          {status === "loading" && <div>Loading...</div>}
          {status === "unauthenticated" && (
            // <div>
              <Link
                href="/api/auth/signin"
                className="inline-block text-xs sm:text-sm font-semibold text-gray-700 px-4 py-2 leading-none bg-slate-200 rounded-full hover:bg-slate-300 lg:mt-0"
              >
                Sign In
              </Link>
            // </div>
          )}
          {status === "authenticated" && (
            <div className="flex items-center">
              <div className="dropdown dropdown-end space-y-2">
                <div
                  tabIndex={0}
                  className="w-10 h-10 border-4 border-black rounded-full"
                >
                  {session.user.image ? (
                    <div>
                      <Image
                        src={session.user.image}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                        className="shadow-md rounded-full cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div>{session.user.name}</div>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-2xl border bg-base-100 rounded-box w-52"
                >
                  <li className="mx-4 my-2">{promptBalance.name}</li>
                  <li>
                    <div
                      className="tooltip tooltip-left lg:mt-0 text-sm text-gray-700 hover:text-primary-500 flex items-center"
                      data-tip="Your monthly usage so far"
                    >
                      <progress
                        className="progress justify-right h-4"
                        value={
                          (promptBalance.balance / promptBalance.quota) * 100
                        }
                        max="100"
                      >{`${Math.round(
                        (promptBalance.balance / promptBalance.quota) * 100
                      )}%`}</progress>
                      <a className="text-xs">{`${Math.round(
                        100 * (promptBalance.balance / promptBalance.quota)
                      )}%`}</a>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="hover:text-primary-500 text-sm text-gray-700 flex flex-row mt-1"
                    >
                      <div className="flex flex-col w-1/4">
                        <Settings />
                      </div>
                      <div className="flex flex-col w-3/4">Settings</div>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="flex flex-row bg-slate-200 hover:bg-slate-300 mt-1"
                    >
                      <div className="flex flex-col w-1/4">
                        <SignOut />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <a className="text-sm font-semibold text-gray-700 text-left">
                          Sign out
                        </a>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
