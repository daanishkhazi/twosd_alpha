/* eslint-disable @next/next/no-sync-scripts */
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import Catch from "../components/Catch";
import View from "../components/View";
import { useSession } from "next-auth/react";
import ScrollingBloom from "../components/scrollingBloom";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function Home() {
  const { data: session, status } = useSession();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrollProgress(
        Math.min(
          Math.max(
            0,
            (window.pageYOffset /
              (document.body.offsetHeight - window.innerHeight) -
              0.2) *
              6.5
          ),
          1
        )
      );
      document.body.style.setProperty(
        "--scroll",
        `${Math.min(
          Math.max(
            0,
            (window.pageYOffset /
              (document.body.offsetHeight - window.innerHeight) -
              0.2) *
              6.5
          ),
          1
        )}`
      );
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  console.log("parent", scrollProgress);

  return (
    <Layout hideNavBar={scrollTop <= 700}>
      <div className="min-h-screen justify-center items-center">
        <div className="absolute top-0 left-0 w-full h-[70vh] clip-it -z-10">
          <Image
            src="/herobg.svg"
            width={2560}
            height={1920}
            alt="Home Background"
          />
          {/* <canvas id="gradient-canvas" data-js-darken-top></canvas>
          <Script id="show-banner">
            {`var gradient = new Gradient();
              gradient.initGradient("#gradient-canvas", "#ef008f","#6ec3f4", "#7038ff", "#ffba27")`}
          </Script> */}
        </div>
        <div className="w-full justify-center min-h-screen flex flex-col px-12 items-center z-10">
          <h1 className="text-7xl font-heading font-bold text-gray-800 text-center mb-12">
            AI Tutors for AP, IB and More
          </h1>
          {status === "authenticated" ? (
            <Link
              href="/interface"
              className="hover:-translate-y-0.5 transition ease-out delay-50 my-4 px-4 py-2 text-gray-600 bg-base-100 border rounded-full shadow-md hover:shadow-lg"
            >
              Welcome back, {session.user?.name}! Enter the app to speak with a
              tutor now ➞
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="hover:-translate-y-0.5 transition ease-out delay-50 mt-4 px-4 py-2 text-gray-600"
            >
              Sign up or log in to get started now ➞
            </Link>
          )}
          <div className="w-[42rem] h-[40rem] flex justify-center relative">
            <Image
              src="/banner.gif"
              fill
              alt="Home Image"
              className="rounded-box shadow-2xl border-4 border-secondary-400 my-2 object-cover"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center mb-12 p-16">
          <h1 className="text-5xl font-heading font-bold text-gray-800 text-center my-12 px-12">
            Tutors Drastically Improve Outcomes
          </h1>
          <div className="flex justify-center items-center max-h-5/12 md:w-full lg:w-1/2 mb-16 p-8 rounded-2xl border-8 border-primary-400 shadow-xl border-secondary-400">
            <ScrollingBloom scrollProgress={scrollProgress} />
          </div>
          <div className="flex flex-col items-center max-w-screen-lg w-1/5 px-12" />
          <div className="text-2xl max-w-screen-lg text-gray-600 text-left justify-center items-center w-3/5">
            The {"  "}
            <Link
              className="text-primary-500"
              href="https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem"
            >
              single most effective thing
            </Link>
            {"  "} that you can do to improve your grades at school is learn
            from a personal tutor.
            <br></br>
            <br></br>
            Unfortunately, they are usually crazy expensive. Get personalized
            instruction without breaking the bank from Laera. Our AI-powered
            tutors boast an enormous body of knowledge across Biology, History,
            Computer Science, and more. AP and IB courses are hard -{" "}
            <Link className="text-primary-500" href="/api/auth/signin">
              {" "}
              get started now for free.
            </Link>
          </div>
        </div>
      </div>
      <div className="mask-it">
        <div className="flex flex-col pt-32 pb-48 px-24 items-center z-10 bg-[url('/herobg2.svg')] mask-up">
          <View direction="bottom">
            <h1 className="text-5xl font-heading font-bold text-gray-800 text-center my-12 px-12 z-30">
              Knowledgable and Easy to Understand
            </h1>
          </View>
          <div className="flex flex-col items-center w-1/5 px-12" />
          <div className="flex flex-col items-center max-w-screen-lg w-3/5">
            <div className="grid grid-cols-2 gap-4">
              <View direction="left">
                <div className="flex flex-col justify-center px-6">
                  <h1 className="text-3xl font-heading font-bold text-gray-800 text-left">
                    Ask targeted questions
                  </h1>
                  <p className="text-xl mt-2 text-gray-600 text-left italic">
                    &quot;What is the difference between a cell and a
                    tissue?&quot;, &quot;What caused the French
                    Revolution?&quot;, etc.
                  </p>
                </div>
              </View>
              <View direction="left">
                <div className="flex flex-col justify-center self-end px-6 w-[20rem] h-[20rem] relative">
                  <Image
                    src="/banner.gif"
                    fill
                    alt="Home Image"
                    className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6 object-cover"
                  />
                </div>
              </View>
              <View direction="right">
                <div className="flex flex-col justify-center self-start px-6 w-[20rem] h-[20rem] relative">
                  {" "}
                  <Image
                    src="/banner.gif"
                    fill
                    alt="Home Image"
                    className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6 object-cover"
                  />{" "}
                </div>
              </View>
              <View direction="right">
                <div className="flex flex-col justify-center px-6">
                  <h1 className="text-3xl font-heading font-bold text-gray-800 text-right">
                    Deepen your understanding
                  </h1>
                  <p className="text-xl mt-2 text-gray-600 text-right italic">
                    &quot;Can you explain the intuition behind by cells need
                    ATP?&quot;, &quot;Does DFS always require recursion?&quot;,
                    etc.
                  </p>
                </div>
              </View>
              <View direction="left">
                <div className="flex flex-col justify-center px-6">
                  <h1 className="text-3xl font-heading font-bold text-gray-800 text-left">
                    Clear any doubts
                  </h1>
                  <p className="text-xl mt-2 text-gray-600 text-left italic">
                    &quot;Why don&apos;t all governments use the same
                    currency?&quot;, &apos;Why doesn&apos;t my code work?&apos;,
                    etc.
                  </p>
                </div>
              </View>
              <View direction="left">
                <div className="flex flex-col justify-center self-end px-6 w-[20rem] h-[20rem] relative">
                  {" "}
                  <Image
                    src="/banner.gif"
                    fill
                    alt="Home Image"
                    className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6 object-cover"
                  />{" "}
                </div>
              </View>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/5 px-12" />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center w-full my-12">
          <View direction="bottom">
            <h1 className="text-5xl font-heading font-bold text-gray-800 text-center mb-12 px-12">
              What&apos;s the catch?
            </h1>
          </View>
          <div className="flex flex-col items-center w-1/5 px-12" />
          <div className="flex flex-col items-center max-w-screen-lg w-3/5">
            <View direction="bottom">
              <Catch />
            </View>
          </div>
          <div className="flex flex-col items-center w-1/5 px-12" />
        </div>
      </div>
    </Layout>
  );
}
