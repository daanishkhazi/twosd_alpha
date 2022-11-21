import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import Catch from "../components/Catch";
import View from "../components/View";
import { useSession } from "next-auth/react";
import ScrollingBloom from "../components/scrollingBloom";
import { useState, useEffect } from "react";



export default function Home() {
  const { data: session, status } = useSession();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  // const [scrolling, setScrolling] = useState(false);
  
  // useEffect(() => {
  //   setScrollProgress(Math.max(0, ((window.pageYOffset / (document.body.offsetHeight - window.innerHeight))-0.2)*6.5))
  // }, [])

  

  useEffect(() => {
    const onScroll = (e: any) => {
      // const target: EventTarget = e.target;
      // const targetDiv: HTMLDivElement = target as HTMLDivElement;
      setScrollTop(e.target.documentElement.scrollTop);
      setScrollProgress(Math.min(Math.max(0, ((window.pageYOffset / (document.body.offsetHeight - window.innerHeight))-0.2)*6.5),1))
      document.body.style.setProperty('--scroll', `${Math.min(Math.max(0, ((window.pageYOffset / (document.body.offsetHeight - window.innerHeight))-0.2)*6.5),1)}`);

      // setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  console.log('parent', scrollProgress)
  

  return (
    <Layout>
      <div>
        <div className="absolute top-0 left-0 w-full h-[50vh] mask-head -z-10">
          <Image
            src="/herobg.svg"
            width={2560}
            height={1920}
            alt="Home Background"
          />
        </div>
        <div className="w-full h-full min-h-screen flex flex-col pt-48 px-12 items-center z-10">
          <h1 className="text-7xl font-heading font-bold text-gray-800 text-center mb-12">
            AI Tutors That Don&apos;t Suck
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
          <Image
            src="/banner.gif"
            width={750}
            height={500}
            alt="Home Image"
            className="flex flex-col items-start rounded-box shadow-2xl border-4 border-secondary-400 my-2 "
          />
        </div>
        <div className="flex flex-col items-center justify-items-center w-full min-h-screen my-12">
          <h1 className="text-5xl font-heading font-bold text-gray-800 text-center mt-12 mb-6 px-12">
            Ok what is an AI tutor?
          </h1>
          <div className="flex flex-col items-center w-1/5 px-12" />
          <p className="text-lg text-gray-600 text-left items-center w-3/5 mb-18">
            Laera is what you get if your smart friend and Google had a baby. It
            is a personalized AI tutor backed by an enormous body of knowledge
            across Biology, History, Computer Science, Medicine, Law and more.
            <br />
            <br />
            In 1984, educational psychologist Benjamin Bloom famously discovered
            what would be called{" "}
            <Link
              className="text-primary-500"
              href="https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem"
            >
              Bloom&apos;s 2 Sigma Problem
            </Link>
            : one-on-one tutors improve student performance by upwards of 2
            standard deviations 🤯. We built Laera to make personalized
            education accessible to any student on the planet.
          </p>
          <div className="flex flex-col items-center w-1/5 px-12" />
          {/* <View direction="bottom"> */}
            {/* <Image
              src="/bloom2sig.svg"
              width={900}
              height={546}
              alt="Home Image"
              className="flex flex-col p-6 items-start rounded-box shadow-lg border-4 border-primary-400 my-6"
            /> */}
            <div className="flex w-7/12 my-24">
            <ScrollingBloom scrollProgress={scrollProgress}/>
            </div>
          {/* </View> */}
        </div>
      </div>
      <div className="mask-it">
        <div className="flex flex-col py-32 px-24 items-center z-10 bg-[url('/herobg2.svg')] mask-up">
          <View direction="bottom">
            <h1 className="text-5xl font-heading font-bold text-gray-800 text-center mt-12 mb-6 px-12 z-30">
              With Laera, you can...
            </h1>
          </View>
          <div className="grid grid-cols-2 gap-4">
            <View direction="left">
              <div className="flex flex-col justify-center px-6">
                <h1 className="text-3xl font-heading font-bold text-gray-800 text-left">
                  Ask targeted questions...
                </h1>
              </div>
            </View>
            <View direction="left">
              <div className="flex flex-col justify-center px-6">
                <Image
                  src="/banner.gif"
                  width={400}
                  height={400}
                  alt="Home Image"
                  className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6"
                />
              </div>
            </View>
            <View direction="right">
              <div className="flex flex-col justify-center px-6">
                {" "}
                <Image
                  src="/banner.gif"
                  width={400}
                  height={400}
                  alt="Home Image"
                  className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6"
                />{" "}
              </div>
            </View>
            <View direction="right">
              <div className="flex flex-col justify-center px-6">
                <h1 className="text-3xl font-heading font-bold text-gray-800 text-left">
                  ...deepen your understanding.
                </h1>
              </div>
            </View>
            <View direction="left">
              <div className="flex flex-col justify-center px-6">
                <h1 className="text-3xl font-heading font-bold text-gray-800 text-left">
                  And clear any doubts...
                </h1>
              </div>
            </View>
            <View direction="left">
              <div className="flex flex-col justify-center px-6">
                {" "}
                <Image
                  src="/banner.gif"
                  width={400}
                  height={400}
                  alt="Home Image"
                  className="flex flex-col items-start rounded-box shadow-lg border-4 border-secondary-400 my-6"
                />{" "}
              </div>
            </View>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center w-full my-12">
          <View direction="bottom">
            <h1 className="text-5xl font-heading font-bold text-gray-800 text-center mb-12 px-12">
              What&apos;s the catch?
            </h1>
          </View>
          <div className="flex flex-col items-center w-1/5 px-12" />
          <div className="flex flex-col items-center w-3/5">
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
