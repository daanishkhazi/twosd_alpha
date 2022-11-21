import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Cancel = () => {
  const { data, status } = useSession();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [justCancelled, setJustCancelled] = useState(false);

  const cancelPremium = async () => {
    const res = await fetch("/api/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data?.user.stripeCustomerId,
      }),
    });
    const result = await res.json();
    if (result.error) {
      console.log(result.error);
    } else {
      setJustCancelled(true);
    }
    return result;
  };

  if (justCancelled) {
    return (
      <div className="text-left  mt-4">
        <p className="text-lg italic">
          Thanks for being a Laera Premium subscriber! Your subscription will be
          cancelled at the end of your current billing period.
        </p>
      </div>
    );
  }

  return (
    <>
      {data?.user.cancelRequested ? (
        <div className="text-left mt-4">
          <p className="text-lg italic">
            Your cancellation request has been received. Your premium
            subscription will be cancelled at the end of your current billing
            period.
          </p>
        </div>
      ) : (
        <div>
          <button
            onClick={cancelPremium}
            className="hover:scale-105 transition ease-in-out delay-50 bg-red-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg"
          >
            {isCheckoutLoading ? "Loading..." : "Cancel Premium"}
          </button>
        </div>
      )}
    </>
  );
};

export default Cancel;
