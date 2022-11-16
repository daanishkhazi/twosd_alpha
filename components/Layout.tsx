import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  children?: ReactNode;
};

// We declare a Props type here to define the type of the props object that
// will be passed to the Layout component. This is a good practice to follow
// when you are writing components in React with TypeScript.

const Layout: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>
          Bream — Your personalized AI tutor for Biology, History and more
        </title>
        <meta
          name="description"
          content="Bream AI Tutor: Biology, History, Computer Science, SAT, ACT, Medicine, Mathematics"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar route={router.pathname} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
