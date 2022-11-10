// static about page
import React from "react";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Guide</h1>
          <p className="mt-3 text-2xl">
            Some more info about what this shit is and how to best use it
          </p>
        </main>
      </div>
    </Layout>
  );
}
