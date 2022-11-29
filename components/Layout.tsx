import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  children?: ReactNode;
  hideNavBar?: boolean;
};

// We declare a Props type here to define the type of the props object that
// will be passed to the Layout component. This is a good practice to follow
// when you are writing components in React with TypeScript.

const Layout: React.FC<Props> = ({ children, hideNavBar }: Props) => {
  const router = useRouter();
  return (
    <div className="w-screen">
      <Head>
        <title>Laera — Your personalized AI tutor for AP, IB and more</title>
        <meta
          name="description"
          content="Laera — Your personalized AI tutor for AP, IB and more. History, Biology, Computer Science."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar route={router.pathname} />
      {/* {!hideNavBar && <Navbar route={router.pathname} />} */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
