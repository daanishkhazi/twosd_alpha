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
import DynamicLogo from "../components/icons/DyanmicLogo";
import CurlyArrow from "../components/icons/curlyArrow";
import FunkyWindow from "../components/funkyWindow";

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
              0.13) *
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
              0.13) *
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
      "What was the outcome of Gibbons v Ogden?               ",
      "The case of Gibbons v. Ogden was a landmark decision in which the Supreme Court of the United States held that the power to regulate interstate commerce was vested exclusively in the federal government, not the states. The case arose from a dispute between two New York City steamboat operators, Aaron Ogden and Thomas Gibbons, over whether Gibbons had the right to operate his steamboat in New York waters. The Court's ruling had far-reaching implications for the development of the American economy and helped to solidify the power of the federal government vis-à-vis the states. In its ruling, Chief Justice John Marshall wrote that Congress had exclusive authority over interstate commerce under Article I, Section 8 of the Constitution. He further held that state laws which interfered with Congress' power were unconstitutional and thus invalid.",
      "Ask an open ended question",
    ],
    [
      "How this is relevant to how interstate commerce works in the 21st century?               ",
      "The ruling in Gibbons v. Ogden is still relevant to how interstate commerce works in the 21st century. The case established an important precedent for federalism and helped to ensure that interstate commerce would be regulated by one central authority rather than by individual states. This means that businesses can operate across state lines without having to worry about conflicting regulations from different states. It also means that goods and services can be shipped from one state to another without having to worry about being blocked by state laws. Additionally, it ensures that businesses have access to a larger market, which can lead to increased profits and economic growth. Finally, it helps protect consumers by ensuring that they have access to a wide variety of goods and services at competitive prices.",
      "Explain the intuition behind...",
    ],
    [
      "Respiration takes place in the lungs                ",
      "Respiration is a metabolic process that involves the exchange of oxygen and carbon dioxide between an organism and its environment. It takes place in all cells of an organism, including those in the lungs. While the lungs are involved in respiration, they are not where respiration actually takes place. Instead, respiration occurs in the mitochondria of cells, where oxygen is used to break down glucose molecules to produce energy for the cell.",
      "Explain why this is wrong:",
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
      "Gamete incompatibility is a phenomenon in which two gametes (sperm and egg cells) are unable to fuse and form a zygote. This can occur due to differences in the genetic makeup of the two gametes, such as differences in the number of chromosomes or differences in the structure of proteins on their surfaces. Gamete incompatibility can also be caused by environmental factors, such as temperature or pH levels. Gamete incompatibility can lead to infertility, as it prevents fertilization from occurring.",
    ],
  ];

  const sample_query_outputs_2 = [
    [
      "What were the three main causes of the French Revolution?",
      "The three main causes of the French Revolution were political, social, and economic issues. Politically, the absolute monarchy of Louis XVI, the lack of a representative government, and the privileges enjoyed by the nobility and clergy all contributed to discontent among the people. Socially, high taxes on the poor, food shortages, and a lack of civil liberties also caused unrest. Economically, high levels of debt, an inefficient taxation system that favored the wealthy, and a weak economy all played a role in sparking revolution. All these factors combined to create an environment ripe for revolution.",
    ],
    [
      "Explain the intuition behind the function of the Golgi Apparatus",
      "The Golgi Apparatus is a cellular organelle found in eukaryotic cells. It is composed of stacks of flattened membrane-bound sacs called cisternae. The Golgi Apparatus has several functions, including the modification, sorting, and packaging of proteins and lipids. It receives molecules from the endoplasmic reticulum (ER) and modifies them before sending them to their destination. For example, it can modify proteins by adding sugar molecules to them, a process known as glycosylation. Additionally, it sorts molecules into different vesicles and packages them for transport to other parts of the cell or outside the cell. Finally, it also produces lysosomes which are used for intracellular digestion.",
    ],
    [
      "Explain the intuition behind why stack overflows can occur during recursion?",
      "A stack overflow can occur during recursion if the stack pointer exceeds the stack limit. This happens when the program calls too many functions without returning from them. When this happens, the program crashes.",
    ],
  ];

  const sample_query_outputs_3 = [
    [
      "The Smoot-Hawley Tariffs worsened the Great Depression by...",
      "The Smoot-Hawley Tariffs worsened the Great Depression by raising tariffs on imported goods and services to historically high levels. This protectionist policy, enacted in 1930, caused a dramatic decrease in international trade and exacerbated the economic downturn that had already begun. By reducing the amount of goods and services being traded between countries, it caused prices to rise, leading to further economic contraction. Additionally, other countries retaliated with their own tariffs, further reducing global trade and deepening the depression. Ultimately, the Smoot-Hawley Tariffs were a major contributing factor to the severity of the Great Depression.",
    ],
    [
      "What is dynamic typing and what are some of its associated challenges?",
      "Dynamic typing is a type system in which type checking is performed at runtime instead of at compile time. This means that types are not associated with their variables, but with values. This can lead to some challenges, such as type errors being thrown at runtime instead of at compile time, and the need for typecasts in order to perform operations on values of different types. The main challenge associated with dynamic typing is that it can be difficult to debug errors due to the lack of compile-time type checking. Since the types are only checked at runtime, it can be difficult to identify the source of an error since it may not be obvious which variable or value has the wrong type. Additionally, dynamic typing can lead to unexpected behavior since operations may be performed on values of different types without any warning or indication that this could cause an issue.",
    ],
    [
      "What is the difference between a for loop and a while loop?",
      "The main difference between the two is that a for loop is used when you know the exact number of iterations you want to perform, while a while loop is used when you don't know the exact number of iterations you want to perform. A for loop is typically used when you have an array or list of items that need to be iterated over, since it allows you to specify the starting point, ending point, and increment/decrement value for each iteration. A while loop is typically used when you don't know how many times a certain operation needs to be performed, since it will keep executing until a certain condition is met. A for loop typically has three parts: an initialization statement (which sets up the starting point), a condition statement (which defines when the loop should end), and an increment/decrement statement (which defines how much the counter should change each iteration). A while loop only has one part: a condition statement which defines when the loop should end.",
    ],
  ];

  return (
    <Layout hideNavBar={scrollTop <= 700}>
      <div className="flex flex-wrap absolute top-0 min-h-screen max-h-screen w-screen justify-center bg-[#FC5959] items-center">
        <div className="flex-row w-full sm:w-1/3 h-1/4 sm:h-full pt-8 sm:pt-16 pl-12 pr-12 sm:pl-12 sm:pr-4 items-center justify-center">
          {/* <div className="flex w-full justify-left"><Image src="/laera.svg" alt="logo" height={400} width={400} /></div> */}
          <div className="flex w-full justify-center items-center">
            <DynamicLogo color={"white"} />
          </div>
          <div className="flex pl-2 w-full text-white justify-center text-center text-xl sm:text-xl md:text-2xl lg:text-3xl py-1 font-semibold mb-2">
            Learn faster with AI tutors
          </div>
          <div className="flex justify-center text-center">
            {status === "authenticated" ? (
              <Link
                href="/interface"
                className="w-full z-10 text-center hover:-translate-y-0.5 text-[0.5rem] min-[400px]:text-base transition ease-out px-4 py-1 delay-50 bg-secondary-400 border-4 border-black rounded-full shadow-neobrutalism-md-black hover:shadow-lg"
              >
                Hi, {session.user?.name}! Get tutored now ➞
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className="w-full text-center z-10 hover:-translate-y-0.5 transition ease-out delay-50 text-[0.9rem] px-4 min-[320px]:text-sm sm:text-md lg:text-lg  bg-secondary-400 rounded-full shadow-neobrutalism-md-black border-4 border-black italic"
              >
                Sign up or log in now ➞
              </Link>
            )}
          </div>
          <div className="hidden sm:flex justify-end sm:ml-[10vw] lg:ml-[17vw] w-2/3">
            <CurlyArrow color={"white"} />
          </div>
        </div>
        <div className="flex w-[100%] sm:w-2/3 h-[73vh] sm:h-[95vh] sm:py-8 justify-center">
          <div className="absolute w-[72%] sm:w-[48%] mt-[5vh] sm:ml-[1vw] h-[64vh] sm:h-[74vh] z-20">
            <InterfaceAnimation sample_query_outputs={sample_query_outputs_0} />
          </div>
          <div className="relative w-full h-full sm:w-11/12 sm:h-11/12 z-10">
            <FunkyWindow color={"#E3FF7A"} />
          </div>
        </div>
        {/* <div className="flex flex-col basis-1/3 grow-0 shrink-0">
          <InterfaceAnimation sample_query_outputs={sample_query_outputs_0} />
        </div> */}
        {/* <div className="absolute top-0 left-0 w-full h-[70vh] clip-it -z-10">
          <Image
            src="/herobg.svg"
            width={2560}
            height={1920}
            // fill={true}
            alt="Home Background"
          />
        </div>
        <div className="flex flex-col justify-center text-wrap px-4 sm:px-12 items-center z-10">
          <h1 className="text-3xl min-[319px]:text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-800 text-center">
            AI Tutors for AP, IB and More
          </h1> */}
        {/* <div className="flex flex-col basis-1/3 grow-0 shrink-0"> */}
        {/* <InterfaceAnimation sample_query_outputs={sample_query_outputs_0} /> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="flex flex-wrap relative top-0 min-h-[87vh] max-h-[87vh] w-screen justify-center items-center"></div>
      <div className="w-full h-[90vh] bg-[#B69FF6] flex flex-col items-between justify-center px-8">
        <h1 className="text-2xl min-[319px]:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-recoleta font-black text-center my-6">
          Get your grades up with Laera
        </h1>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex bg-[#E6FFDC] w-full max-h-[45vh] sm:w-5/6 md:w-2/3 lg:w-1/2 2xl:w-5/12 mb-8 p-2 sm:p-8 rounded-2xl border-8 border-primary-400 shadow-neobrutalism-lg-black">
            <ScrollingBloom scrollProgress={scrollProgress} />
          </div>
          {/* <div className="flex flex-col items-center max-w-screen-lg w-1/5 sm:px-12" /> */}
          <div className="text-sm min-[319px]:text-base sm:text-base md:text-lg lg:text-xl max-w-screen-lg text-left justify-center items-center w-full lg:w-9/12">
            One-on-one instruction is the {"  "}
            <Link
              className="underline font-semibold"
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
            <Link className="underline font-semibold" href="/api/auth/signin">
              {" "}
              get started now for free.
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="mask-it"> */}
      <div className="flex flex-col 3xl:pt-32 3xl:pb-48 items-center justify-center z-10 bg-[#E3FF7A]">
        <div className="flex flex-col items-center w-1/5 px-12" />
        <div className="flex flex-col items-center justify-center min-h-1/2 max-w-screen-xl w-screen px-4 md:w-11/12">
          {/* <div className="grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-8 lg:gap-y-24 items-center"> */}
          <div className="flex flex-row flex-wrap flex-none h-[130vh] sm:h-[180vh] items-center pt-12 pb-24">
            <div className="flex pb-4 sm:pb-0 w-full h-[5vh] sm:w-1/3 sm:h-1/3 justify-center items-end sm:items-center">
              {/* <View direction="left"> */}
              <div className="flex flex-col justify-center items-center sm:px-6">
                <h1 className="text-2xl md:text-4xl lg:text-5xl  font-recoleta font-black text-gray-800 text-right">
                  Ask targeted questions
                </h1>
              </div>
              {/* </View> */}
            </div>
            <div className="flex h-[35vh] sm:h-[40vh] w-full sm:w-2/3 sm:h-1/3 items-start sm:items-center">
              {/* <View direction="left"> */}
              <div className="flex flex-col justify-start sm:justify-center sm:px-6 w-full h-full relative">
                {scrollTop >= 840 && (
                  <QueryOutputAnimation
                    sample_query_outputs={sample_query_outputs_1}
                    dynamic={true}
                    textSize={"text-xl"}
                  />
                )}
              </div>
              {/* </View> */}
            </div>
            <div className="flex pb-4 sm:pb-0 sm:hidden w-full h-[5vh] sm:w-1/3 sm:h-1/3 justify-center items-end sm:items-center">
              {/* <View direction="right"> */}
              <div className="flex flex-col justify-center items-center sm:px-6">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-recoleta font-black text-gray-800 text-left">
                  Deepen your understanding
                </h1>
              </div>
              {/* </View> */}
            </div>
            <div className="flex h-[35vh] sm:h-[40vh] w-full sm:w-2/3 sm:h-1/3 items-start sm:items-center">
              {/* <View direction="right"> */}
              <div className="flex flex-col justify-start sm:justify-center sm:px-6 w-full h-full relative">
                {scrollTop >= 840 && (
                  <QueryOutputAnimation
                    sample_query_outputs={sample_query_outputs_2}
                    dynamic={true}
                    textSize={"text-xl"}
                  />
                )}
              </div>
              {/* </View> */}
            </div>
            <div className="hidden sm:flex w-full sm:w-1/3 sm:h-1/3 items-center">
              {/* <View direction="right"> */}
              <div className="flex flex-col justify-center sm:px-6">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-recoleta font-black text-gray-800 text-left">
                  Deepen your understanding
                </h1>
              </div>
              {/* </View> */}
            </div>
            <div className="flex pb-4 sm:pb-0 w-full h-[5vh] sm:w-1/3 sm:h-1/3 justify-center items-end sm:items-center">
              {/* <View direction="left"> */}
              <div className="flex flex-col justify-center sm:px-6">
                <h1 className="text-2xl md:text-4xl lg:text-5xl  font-recoleta font-black text-gray-800 text-right">
                  Clear any doubts
                </h1>
              </div>
              {/* </View> */}
            </div>
            <div className="flex h-[35vh] sm:h-[40vh] w-full sm:w-2/3 sm:h-1/3 items-start sm:items-center">
              {/* <View direction="left"> */}
              <div className="flex flex-col justify-start sm:justify-center sm:px-6 w-full h-full relative">
                {scrollTop >= 840 && (
                  <QueryOutputAnimation
                    sample_query_outputs={sample_query_outputs_3}
                    dynamic={true}
                    textSize={"text-xl"}
                  />
                )}
              </div>
              {/* </View> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/5 px-12" />
      </div>
      {/* </div> */}
      <div className="flex flex-row items-center bg-[#FF6868]">
        <div className="flex flex-col items-center w-full my-12">
          <View direction="bottom">
            <h1 className="text-2xl min-[319px]:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-recoleta font-black text-white text-center mb-12 px-12">
              What&apos;s the catch?
            </h1>
          </View>
          <div className="flex flex-col items-center w-1/5 px-12" />
          <div className="flex flex-col items-center max-w-screen-lg w-full px-8 md:w-3/5">
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
