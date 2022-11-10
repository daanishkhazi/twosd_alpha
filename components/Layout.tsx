import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
};

// We declare a Props type here to define the type of the props object that
// will be passed to the Layout component. This is a good practice to follow
// when you are writing components in React with TypeScript.

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
