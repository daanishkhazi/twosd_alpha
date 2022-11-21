import React from "react";
import Layout from "./Layout";
import Link from "next/link";

const OnWaitlist: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-32 text-center">
        <p className="text-2xl font-bold mb-4">
          Thanks for signing up for Laera!
        </p>
        <p className="text-xl text-gray-600">
          We&apos;re currently in beta, so you&apos;ll be on the waitlist for a
          teeny bit. We&apos;ll send you an email when you&apos;re off the
          waitlist and can start using Laera! Ping us on
          <Link href="https://ctt.ac/74ecJ" className="text-primary-500">
            {" "}
            Twitter{" "}
          </Link>
          in the meantime :&#41;
        </p>
      </div>
    </Layout>
  );
};

export default OnWaitlist;
