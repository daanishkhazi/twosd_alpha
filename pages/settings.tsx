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
import Edit from "../components/icons/edit";
import Link from "next/link";
import { useRouter } from "next/router";

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
      <div className="flex flex-col min-h-screen py-2">
        <main className="flex flex-col w-full flex-1 px-24 py-20 text-center">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/5">
              <button
                className={
                  selectedTab === "Account"
                    ? "bg-gray-300 font-semibold py-2 px-4 mb-2 text-left shadow rounded-r-lg min-w-max"
                    : "bg-gray-100 hover:bg-gray-200 py-2 px-4 mb-2 border border-gray-200 shadow text-left rounded-r-lg  min-w-max"
                }
                onClick={() => setSelectedTab("Account")}
              >
                Account
              </button>
              <button
                className={
                  selectedTab === "Billing"
                    ? "bg-gray-300 font-semibold py-2 px-4 mb-2 text-left shadow rounded-r-lg min-w-max"
                    : "bg-gray-100 hover:bg-gray-200 py-2 px-4 mb-2 border border-gray-200 shadow text-left rounded-r-lg  min-w-max"
                }
                onClick={() => setSelectedTab("Billing")}
              >
                Billing
              </button>
              <button
                className={
                  selectedTab === "Help"
                    ? "bg-gray-300 font-semibold py-2 px-4 mb-2 text-left shadow rounded-r-lg min-w-max"
                    : "bg-gray-100 hover:bg-gray-200 py-2 px-4 mb-2 border border-gray-200 shadow text-left rounded-r-lg  min-w-max"
                }
                onClick={() => setSelectedTab("Help")}
              >
                Help
              </button>
            </div>
            <div className="flex flex-col w-4/5 px-6">
              {selectedTab === "Account" && (
                // Account menu with simple features. Allow user to edit their name and view their email
                <div className="flex flex-col w-full">
                  <h1 className="text-2xl font-bold">Account</h1>
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
                          <Edit />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row w-full">
                    <p className="text-lg font-bold">Email</p>
                    <p className="text-lg ml-4">{session?.user?.email}</p>
                  </div>
                  <button
                    className="inline-block text-sm font-semibold text-gray-900 px-4 py-2 leading-none bg-red-400 rounded-md hover:bg-red-500 mt-4 max-w-fit"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              )}
              {selectedTab === "Billing" && (
                <div className="flex flex-col w-full">
                  <h1 className="text-2xl font-bold">Billing</h1>
                  <div className="flex flex-row w-full">
                    <p className="text-lg font-bold">Balance</p>
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
                  <div className="flex flex-row w-full">
                    <p className="text-lg font-bold">Upgrade to Premium</p>
                    <Payment />
                  </div>
                </div>
              )}
              {selectedTab === "Help" && (
                <div className="flex flex-col w-full">
                  <h1 className="text-2xl font-bold">Help</h1>
                  <div className="flex flex-row justify-center w-full">
                    <p className="text-lg mt-4">
                      Bream is currently in beta and under active development.
                      If you have any specific questions, please contact us at
                      <Link
                        href="mailto:hello@bream.ai"
                        className="text-primary-500"
                      >
                        {" "}
                        hello@bream.ai
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
