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
import QueryOutputAnimation from "../components/QueryOutputAnimation";
import InterfaceAnimation from "../components/InterfaceAnimation";

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

  const sample_query_outputs_0 = [
    [
      "What's the difference between DNA and RNA?               ",
      "DNA is the genetic material that makes up the chromosomes of an organism. It is a double-stranded molecule that contains the instructions for an organism's development and function. RNA is a single-stranded molecule that helps to carry out the instructions of DNA. It is also involved in the process of protein synthesis.",
      "What's the difference between...",
    ],
    [
      "What was the outcome of Gibbons v Ogden?               ",
      "The case of Gibbons v. Ogden was a landmark case in which the Supreme Court of the United States held that the power to regulate interstate commerce was vested exclusively in the federal government, not the states. The case arose from a dispute between two New York City steamboat operators, Aaron Ogden and Thomas Gibbons, over whether Gibbons had the right to operate his steamboat in New York waters. The Court's ruling had far-reaching implications for the development of the American economy and helped to solidify the power of the federal government vis-à-vis the states.",
      "Ask an open ended question",
    ],
    [
      "What are some reasons that ATP breakdown may be inhibited in human cells?               ",
      "There are a few reasons that ATP breakdown may be inhibited in human cells. One reason is if the cell is not getting enough oxygen. Another reason is if the cell is not getting enough nutrients. Lastly, if the cell is under stress, it may also inhibit ATP breakdown.",
      "Ask an open ended question",
    ],
  ];

  const sample_query_outputs_1 = [
    [
      "Was Ancient Athens truly a democracy by modern standards?",
      "No, Ancient Athens was not truly a democracy by modern standards. While Ancient Athens did have some democratic elements, such as allowing all male citizens to vote on laws and decisions, they also had many elements that would not be considered democratic by modern standards. For example, only a small portion of the population was actually allowed to participate in the democratic process, women and slaves were not allowed to vote or hold office, and decisions could be made through majority rule without any minority protections.",
    ],
    [
      "What is the difference between a stack and a heap?",
      "A stack is a data structure that stores data in a last-in, first-out (LIFO) manner. This means that the most recently added data is the first to be removed. A heap is a data structure that stores data in a first-in, first-out (FIFO) manner. This means that the data added to the heap is the first to be removed.",
    ],
    [
      "What is gamete incompatibility?",
      "Gamete incompatibility is when the male and female gametes (sperm and egg) are not compatible with each other and cannot fuse to create a zygote. This can be due to differences in the genetic makeup of the gametes, or differences in their size or structure. Gamete incompatibility can also occur when the gametes are unable to physically attach to each other.",
    ],
  ];

  const sample_query_outputs_2 = [
    [
      "Explain the intuition behind the function of the Golgi Apparatus",
      "The Golgi apparatus is a organelle found in eukaryotic cells. Its function is to modify, package, and transport molecules within the cell. The Golgi apparatus is made up of a series of flattened sacs that are stacked on top of each other. Molecules enter the Golgi apparatus from the endoplasmic reticulum. They then travel through the Golgi apparatus, where they are modified, before being shipped off to their final destination.",
    ],
    [
      "What were the three main causes of the French Revolution?",
      "The three main causes of the French Revolution were the financial crisis caused by the cost of the Seven Years' War, the social inequality between the different classes of French society, and the resentment of the people towards the absolute monarchy.",
    ],
    [
      "Explain the intuition behind why stack overflows can occur during recursion?",
      "A stack overflow can occur during recursion if the stack pointer exceeds the stack limit. This happens when the program calls too many functions without returning from them. When this happens, the program crashes.",
    ],
  ];

  const sample_query_outputs_3 = [
    [
      "The Smoot-Hawley Tariffs worsened the Great Depression by...",
      "The Smoot-Hawley Tariffs worsened the Great Depression by making it more difficult for other countries to trade with the United States. The tariffs also caused prices to increase, which made it difficult for consumers to purchase goods.",
    ],
    [
      "What is dynamic typing and what are some of its associated challenges?",
      "Dynamic typing is a type of type system in which type checking is performed at runtime instead of at compile time. This means that types are not associated with their variables, but with values. This can lead to some challenges, such as type errors being thrown at runtime instead of at compile time, and the need for typecasts in order to perform operations on values of different types.",
    ],
    [
      "What is the difference between a for loop and a while loop?",
      "A for loop is used to iterate over a sequence of items, whereas a while loop is used to execute a block of code repeatedly until a condition is met. Both types of loops can be used to achieve the same results",
    ],
  ];

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
        <div className="w-full justify-center pt-14 min-h-screen flex flex-col px-12 items-center z-10">
          <h1 className="text-6xl font-heading font-bold text-gray-800 text-center">
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
              className="hover:-translate-y-0.5 transition ease-out delay-50 mt-12 mb-2 px-6 py-2 text-lg text-gray-700 italic"
            >
              Sign up or log in to get started now ➞
            </Link>
          )}
          {/* <div className="flex w-[42rem] h-[35rem] border-8 border-secondary-400 items-end bg-white px-16 relative overflow-hidden"> */}
          {/* <Image
              src="https://homegifs.s3.us-west-2.amazonaws.com/image1.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ7TIADCYJFRAZLFB%2F20221122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221122T095317Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a54497e730c96398ed75fb10b309c8b247db17c4e685f0908e21c5a1fb70a2a8"
              fill
              alt="Home Image"
              className="rounded-box shadow-2xl border-4 border-secondary-400 my-2 object-cover"
            /> */}
          <InterfaceAnimation sample_query_outputs={sample_query_outputs_0} />
          {/* </div> */}
        </div>
        <div className="w-full flex flex-col items-center mb-12 p-16">
          <h1 className="text-5xl font-heading font-bold text-gray-800 text-center my-12 px-12">
            Get your grades up with Laera
          </h1>
          <div className="flex justify-center items-center max-w-screen-xl max-h-5/12 md:w-full lg:w-1/2 mb-16 p-8 rounded-2xl border-8 border-primary-400 shadow-xl border-secondary-400">
            <ScrollingBloom scrollProgress={scrollProgress} />
          </div>
          <div className="flex flex-col items-center max-w-screen-lg w-1/5 px-12" />
          <div className="text-2xl max-w-screen-lg text-gray-600 text-left justify-center items-center w-3/5">
            One-on-one instruction is the {"  "}
            <Link
              className="text-primary-500"
              href="https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem"
            >
              single most effective way
            </Link>
            {"  "} for you to improve your performance at school.
            <br></br>
            <br></br>
            Laera offers affordable, personalized tutoring on your own terms.
            Our AI-powered tutors boast an enormous body of knowledge across
            subjects you care about. Let us help you master your coursework -{" "}
            <Link className="text-primary-500" href="/api/auth/signin">
              {" "}
              get started now for free.
            </Link>
          </div>
        </div>
      </div>
      <div className="mask-it">
        <div className="flex flex-col pt-32 pb-48 px-24 items-center z-10 bg-[url('/herobg2.svg')]">
          {/* <View direction="bottom">
            <h1 className="text-5xl font-heading font-bold text-gray-800 text-center my-12 px-12 z-30">
              Knowledgable and Easy to Understand
            </h1>
          </View> */}
          <div className="flex flex-col items-center w-1/5 px-12" />
          <div className="flex flex-col items-center justify-center min-h-1/2 max-w-screen-lg w-4/5">
            <div className="grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-24 items-center">
              <div className="col-span-1">
                <View direction="left">
                  <div className="flex flex-col justify-center items-center px-6">
                    <h1 className="text-5xl font-heading font-bold text-gray-800 text-right">
                      Ask targeted questions
                    </h1>
                    {/* <p className="text-xl mt-2 text-gray-600 text-right italic">
                      &quot;What is the difference between a cell and a
                      tissue?&quot;, &quot;What caused the French
                      Revolution?&quot;, etc.
                    </p> */}
                  </div>
                </View>
              </div>
              <div className="col-span-2">
                <View direction="left">
                  <div className="flex flex-col justify-center self-end px-6 w-full h-full relative">
                    {/* <Image
                      src="https://homegifs.s3.us-west-2.amazonaws.com/image2.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ7TIADCYJFRAZLFB%2F20221122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221122T095423Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f8c78dde0ff7b498bc88ff3f045bd7ed238cba5de84ba65a16fb3368fe2a94d7"
                      fill
                      alt="Home Image"
                      className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6 object-cover"
                    /> */}
                    {scrollTop >= 1240 && (
                      <QueryOutputAnimation
                        sample_query_outputs={sample_query_outputs_1}
                        dynamic={true}
                        textSize={"text-xl"}
                      />
                    )}
                  </div>
                </View>
              </div>
              <div className="col-span-2">
                <View direction="right">
                  <div className="flex flex-col justify-center self-start px-6 w-full h-full relative">
                    {/* {" "}
                    <Image
                      src="https://homegifs.s3.us-west-2.amazonaws.com/image3.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ7TIADCYJFRAZLFB%2F20221122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221122T095446Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=95caa118ae68d009ea410510323e53e5c60501735e9f93bda3fce1855bca980b"
                      fill
                      alt="Home Image"
                      className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6 object-cover"
                    />{" "} */}
                    {scrollTop >= 1240 && (
                      <QueryOutputAnimation
                        sample_query_outputs={sample_query_outputs_2}
                        dynamic={true}
                        textSize={"text-xl"}
                      />
                    )}
                  </div>
                </View>
              </div>
              <div className="col-span-1">
                <View direction="right">
                  <div className="flex flex-col justify-center px-6">
                    <h1 className="text-5xl font-heading font-bold text-gray-800 text-left">
                      Deepen your understanding
                    </h1>
                    {/* <p className="text-xl mt-2 text-gray-600 text-left italic">
                      &quot;Can you explain the intuition behind by cells need
                      ATP?&quot;, &quot;Does DFS always require recursion?&quot;,
                      etc.
                    </p> */}
                  </div>
                </View>
              </div>
              <div className="col-span-1">
                <View direction="left">
                  <div className="flex flex-col justify-center px-6">
                    <h1 className="text-5xl font-heading font-bold text-gray-800 text-right">
                      Clear any doubts
                    </h1>
                    {/* <p className="text-xl mt-2 text-gray-600 text-right italic">
                      &quot;Why don&apos;t all governments use the same
                      currency?&quot;, &apos;Why doesn&apos;t my code work?&apos;,
                      etc.
                    </p> */}
                  </div>
                </View>
              </div>
              <div className="col-span-2">
                <View direction="left">
                  <div className="flex flex-col justify-center self-end px-6 w-full h-full relative">
                    {/* {" "}
                    <Image
                      src="https://homegifs.s3.us-west-2.amazonaws.com/image4.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ7TIADCYJFRAZLFB%2F20221122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221122T095525Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=00a8f1c0cfdf9c5ff28a916ad13421fedd0a30a6512d7fcce001d57978f9e8f1"
                      fill
                      alt="Home Image"
                      className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6 object-cover"
                    />{" "} */}
                    {scrollTop >= 1240 && (
                      <QueryOutputAnimation
                        sample_query_outputs={sample_query_outputs_3}
                        dynamic={true}
                        textSize={"text-xl"}
                      />
                    )}
                  </div>
                </View>
              </div>
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
