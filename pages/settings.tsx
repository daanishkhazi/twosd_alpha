// static about page
import React from "react";
import Layout from "../components/Layout";
import Payment from "../components/Payment";

export default function Settings() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Settings</h1>
          <p className="mt-3 text-2xl">
            to be built out
          </p>
          <Payment></Payment>
        </main>
      </div>
    </Layout>
  );
}
