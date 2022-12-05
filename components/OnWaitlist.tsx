import React from "react";
import Layout from "./Layout";
import { useSession } from "next-auth/react";
import { useState } from "react";

const OnWaitlist: React.FC = () => {
  const { data, status } = useSession();
  const [code, setCode] = useState("");
  const [justRequested, setJustRequested] = useState(false);

  const useCode = async () => {
    const res = await fetch("/api/useCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });
    const result = await res.json();
    if (result.error) {
      console.log(result.error);
    }
    return result;
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-32 text-center">
        <p className="text-2xl font-bold mb-4">
          Thanks for signing up for Laera!
        </p>
        <p className="text-xl text-gray-600">
          We&apos;re currently in beta, so you&apos;ll need a referral code to
          speak with a tutor. If you have one, enter it below.
        </p>
        <div className="flex flex-row items-center justify-center mt-6">
          <input
            className="border-2 border-gray-300 p-2 rounded focus focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            type="text"
            placeholder="Referral Code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className="hover:scale-105 transition ease-in-out delay-50 bg-primary-500 border-primary-500 border text-white font-bold py-2 px-4 rounded ml-2"
            onClick={useCode}
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OnWaitlist;
