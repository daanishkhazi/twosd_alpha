import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Cancel = () => {
  const { data, status } = useSession();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const goToCancel = async () => {
    console.log("cancel");
  };
  return (
    <>
      {data && (
        <div>
          <button
            onClick={() => {
              if (isCheckoutLoading) return;
              else goToCancel();
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 mt-4 rounded-lg"
          >
            {isCheckoutLoading ? "Loading..." : "Cancel Premium"}
          </button>
        </div>
      )}
    </>
  );
};

export default Cancel;
