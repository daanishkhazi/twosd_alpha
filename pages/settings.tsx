// Settings page
// Uses a state variable to determine which tab is selected
// Available tabs are: "Account", "Billing", "Help"

import React from "react";
import Layout from "../components/Layout";
import Payment from "../components/Payment";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useBalance } from "../Context/balance-context";
import EditIcon from "../components/icons/editIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import Cancel from "../components/Cancel";
import Image from "next/image";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("Account");
  const { data: session, status } = useSession();
  const { promptBalance, setPromptBalance } = useBalance();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

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

  console.log(promptBalance);
  return (
    <Layout>
      <div className="flex flex-col py-2 bg-primary-50 mask-it pb-32">
        <div className="absolute top-0 left-0 w-full h-screen -z-10 ">
          <Image
            src="/meshbg.svg"
            width={2560}
            height={1920}
            alt="Home Background"
            className="opacity-30"
          />
        </div>
        <main className="flex flex-col w-full flex-1 px-24 py-20 text-center">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/5 pt-8">
              <button
                className={
                  selectedTab === "Account"
                    ? "translate-x-1 transition ease-in-out delay-50 bg-primary-300 font-semibold py-1 px-4 mb-2 text-left shadow rounded-r-full min-w-max"
                    : "hover:translate-x-1 transition ease-in-out delay-50 bg-gray-100 py-1 px-4 mb-2 border border-gray-200 shadow text-left rounded-r-full  min-w-max"
                }
                onClick={() => setSelectedTab("Account")}
              >
                Account
              </button>
              <button
                className={
                  selectedTab === "Billing"
                    ? "translate-x-1 transition ease-in-out delay-50 bg-primary-300 font-semibold py-1 px-4 mb-2 text-left shadow rounded-r-full min-w-max"
                    : "hover:translate-x-1 transition ease-in-out delay-50 bg-gray-100 py-1 px-4 mb-2 border border-gray-200 shadow text-left rounded-r-full  min-w-max"
                }
                onClick={() => setSelectedTab("Billing")}
              >
                Billing
              </button>
              <button
                className={
                  selectedTab === "Help"
                    ? "translate-x-1 transition ease-in-out delay-50 bg-primary-300 font-semibold py-1 px-4 mb-2 text-left shadow rounded-r-full min-w-max"
                    : "hover:translate-x-1 transition ease-in-out delay-50 bg-gray-100 py-1 px-4 mb-2 border border-gray-200 shadow text-left rounded-r-full  min-w-max"
                }
                onClick={() => setSelectedTab("Help")}
              >
                Help
              </button>
            </div>
            <div className="flex flex-col w-4/5 px-24 py-12 bg-base-100 border-4 min-h-[50vh] border-primary-400 mx-6 rounded-3xl shadow-2xl">
              {selectedTab === "Account" && (
                // Account menu with simple features. Allow user to edit their name and view their email
                <div className="flex flex-col w-full">
                  <h1 className="text-4xl font-bold mb-12">Account</h1>
                  <div className="flex flex-row w-full">
                    <p className="text-lg font-bold">Name</p>
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
                  <div className="flex flex-row w-full">
                    <p className="text-lg font-bold">Email</p>
                    <p className="text-lg ml-4">{session?.user?.email}</p>
                  </div>
                  <button
                    className="hover:translate-x-1 transition ease-in-out delay-50 inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none bg-red-400 rounded-md mt-4 max-w-fit"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              )}
              {selectedTab === "Billing" && (
                <div className="flex flex-col w-full">
                  <h1 className="text-4xl font-bold mb-12">Billing</h1>
                  <div className="flex flex-row w-full mb-4">
                    <p className="text-lg font-bold align-top ">Balance</p>
                    <progress
                      className="progress justify-right h-6 mx-12"
                      value={
                        (promptBalance.balance / promptBalance.quota) * 100
                      }
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
                        <p className="text-lg text-left italic">
                          You have {promptBalance.quota - promptBalance.balance}{" "}
                          prompts remaining. Upgrade to premium to increase your
                          monthly quote to 500. Premium users also get access to
                          our prompt library!
                        </p>
                      ) : (
                        <p className="text-lg text-left italic">
                          {" "}
                          You have {promptBalance.quota -
                            promptBalance.balance}{" "}
                          prompts remaining. Thanks for being a premium user!
                        </p>
                      )}
                      <div className="self-start">
                        {promptBalance.quota == 25 ? <Payment /> : <Cancel />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedTab === "Help" && (
                <div className="flex flex-col w-full">
                  <h1 className="text-4xl font-bold mb-12">Help</h1>
                  <div className="flex flex-row justify-center w-full">
                    <p className="text-lg mt-4 italic">
                      Laera is currently in beta and under active development.
                      We aim to provide the best personalized education services
                      in the world. Learn more about how to use Laera on our{" "}
                      <Link href="/" className="text-primary-500">
                        home page.
                      </Link>{" "}
                      If you have any specific questions, please contact us at
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
        </main>
      </div>
    </Layout>
  );
}
