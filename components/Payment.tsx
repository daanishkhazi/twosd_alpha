import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Payment = () => {
  const { data, status } = useSession();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const goToCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { redirectUrl } = await res.json();
    console.log("redirect:", redirectUrl);
    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else {
      setIsCheckoutLoading(false);
      console.log("Error creating checkout session");
    }
  };
  return (
    <>
      {data && (
        <div>
          <button
            onClick={() => {
              if (isCheckoutLoading) return;
              else goToCheckout();
            }}
            className="hover:scale-105 transition ease-in-out delay-50 border-4 border-black font-semibold py-2 px-4 mt-4 rounded-l shadow-neobrutalism-lg-black"
          >
            {isCheckoutLoading ? "Loading..." : "Upgrade Account"}
          </button>
        </div>
      )}
    </>
  );
};

export default Payment;
