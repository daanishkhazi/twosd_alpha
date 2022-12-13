// Settings page
// Uses a state variable to determine which tab is selected
// Available tabs are: "Account", "Billing", "Help"

import React from "react";
import Layout from "../components/Layout";
import Payment from "../components/Payment";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useBalance } from "../Context/balance-context";
import EditIcon from "../components/icons/editIcon";
import Link from "next/link";
import Cancel from "../components/Cancel";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("Account");
  const { data: session, status } = useSession();
  const { promptBalance, setPromptBalance } = useBalance();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const handleCopy = (code: string) => () => {
    navigator.clipboard.writeText(code);
  };

  const handleEditName = () => {
    if (isEditing && name !== "") {
      setPromptBalance({ ...promptBalance, name });

      // save new name
      fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email, name }),
      });
    }
    setIsEditing(!isEditing);
  };
  const handleGenerateReferralCode = async () => {
    const res = await fetch("/api/generateCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        id: session?.user?.id,
      }),
    });
    const result = await res.json();
    if (result.error) {
      alert("You already have two referral codes");
    } else {
      console.log("result", result);
      const newReferralCodes = [
        ...promptBalance.referralCodes,
        result.newCode.code,
      ];
      setPromptBalance({ ...promptBalance, referralCodes: newReferralCodes });
    }
    return result;
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-[75vh] w-[75%] lg:w-[50%] xl:w-[35%] m-auto">
        <div className="flex flex-row items-center justify-center sticky flex-grow px-12 mt-12">
          <button
            className={
              // flex-row w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 justify-center px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline
              selectedTab === "Account"
                ? "mr-8 w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline text-xl lg:text-3xl font-recoleta rotate-3 bg-secondary-400 "
                : "mr-8 w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline text-xl lg:text-3xl font-recoleta"
            }
            onClick={() => setSelectedTab("Account")}
          >
            Account
          </button>
          <button
            className={
              selectedTab === "Billing"
                ? "mr-8 w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline text-xl lg:text-3xl font-recoleta rotate-3 bg-secondary-400 "
                : "mr-8 w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline text-xl lg:text-3xl font-recoleta"
            }
            onClick={() => setSelectedTab("Billing")}
          >
            Billing
          </button>
          <button
            className={
              selectedTab === "Help"
                ? "mr-8 w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline text-xl lg:text-3xl font-recoleta rotate-3 bg-secondary-400 "
                : "mr-8 w-full justify-center items-center hover:scale-105 border-4 border-black transition ease-in-out delay-50 px-1 py-4 shadow-neobrutalism-lg-black focus:outline-none focus:shadow-outline text-xl lg:text-3xl font-recoleta"
            }
            onClick={() => setSelectedTab("Help")}
          >
            Help
          </button>
        </div>

        <div className="flex flex-col py-12 bg-base-100 min-h-[50vh] mx-6 items-center">
          {selectedTab === "Account" && (
            <div className="flex flex-col w-full justify-center items-center">
              <h1 className="text-5xl font-bold mb-12 font-recoleta">
                Account
              </h1>
              <div className="flex flex-row w-full justify-start">
                <span className="text-lg font-bold">Edit name:</span>
                {isEditing ? (
                  <>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 px-2 text-gray-900 text-lg rounded mx-1 focus:ring-blue-500 focus:border-blue-500 block "
                    ></input>
                    <button
                      className="bg-gray-100 px-4 rounded border-gray-300 border"
                      onClick={handleEditName}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-lg ml-4">{promptBalance.name} </p>
                    <button onClick={handleEditName} className="ml-2">
                      <EditIcon />
                    </button>
                  </>
                )}
              </div>

              {session?.user?.offWaitlist ? (
                <>
                  <div className="w-full mt-6">
                    <p className="text-lg font-bold">Referral codes:</p>
                    <p className="text-lg italic">
                      {" "}
                      We&apos;re starting you off with 2 referral codes 😎.
                      Click on a code below to copy it to your clipboard and get
                      one of your friends on Laera. Keep on learning for more
                      codes soon!
                    </p>
                  </div>
                  <div className="flex flex-row mt-4">
                    {promptBalance.referralCodes?.map((code) => (
                      <div
                        className="flex flex-row w-full justify-center"
                        key={code.toString()}
                        onClick={handleCopy(code)}
                      >
                        <p className="hover:border-b-2 border-black transition ease-in-out delay-50 text-xl ml-4  my-1 cursor-pointer">
                          {code}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col w-full mt-6">
                  <p className="text-lg mb-2">
                    You&apos;re on the waitlist! Head to our tutoring space to
                    enter a referral code and get started with learning.
                  </p>
                  <Link
                    href="/interface"
                    className="hover:translate-x-1 transition ease-in-out delay-50 text-primary-400 text-lg font-bold"
                  >
                    {" "}
                    Tutoring Space →
                  </Link>
                </div>
              )}

              {/* <button
                className="hover:translate-x-1 transition ease-in-out delay-50 inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none bg-red-400 rounded-md mt-4 max-w-fit"
                onClick={() => signOut()}
              >
                Sign Out
              </button> */}
            </div>
          )}

          {selectedTab === "Billing" && (
            <div className="flex flex-col w-full justify-center items-center">
              <h1 className="text-5xl font-bold mb-12 font-recoleta">
                Billing
              </h1>
              <div className="flex flex-row w-full mb-8 max-sm:hidden">
                <p className="text-lg font-bold align-top ">Balance</p>
                <progress
                  className="progress justify-right h-6 mx-12"
                  value={(promptBalance.balance / promptBalance.quota) * 100}
                  max="100"
                >{`${Math.round(
                  (promptBalance.balance / promptBalance.quota) * 100
                )}%`}</progress>
                <a className="text">{`${Math.round(
                  100 * (promptBalance.balance / promptBalance.quota)
                )}%`}</a>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col self-start">
                  {promptBalance.quota == 25 ? (
                    <p className="text-lg italic">
                      You have {promptBalance.quota - promptBalance.balance}{" "}
                      prompts remaining. Upgrade to premium to increase your
                      monthly quote to 500. Premium users also get access to our
                      prompt library!
                    </p>
                  ) : (
                    <p className="text-lg italic">
                      {" "}
                      You have {promptBalance.quota -
                        promptBalance.balance}{" "}
                      prompts remaining. Thanks for being a premium user!
                    </p>
                  )}
                  <div className="">
                    {promptBalance.quota == 25 ? <Payment /> : <Cancel />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "Help" && (
            <div className="flex flex-col w-full justify-center items-center">
              <h1 className="text-5xl font-bold mb-12 font-recoleta">Help</h1>
              <div className="flex flex-row justify-center w-full">
                <p className="text-lg mt-4 italic">
                  Laera is currently in beta and under active development. We
                  aim to provide the best personalized education services in the
                  world. Learn more about how to use Laera on our{" "}
                  <Link href="/" className="text-primary-500">
                    home page.
                  </Link>{" "}
                  If you have any specific questions related to your account,
                  please contact us at
                  <Link
                    href="mailto:hello@laera.xyz"
                    className="text-primary-500"
                  >
                    {" "}
                    hello@laera.xyz
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
