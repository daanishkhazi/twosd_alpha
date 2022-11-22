import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children?: ReactNode;
  direction: string;
};

const View: React.FC<Props> = ({ children, direction }: Props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px",
  });

  //  TODO: fix left & right
  direction = "bottom";

  return (
    <div ref={ref} className={inView ? `flex flex-col w-full animate-${direction} self-center` : ""}>
      {children}
    </div>
  );
};

export default View;
