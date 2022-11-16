import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Hero: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse px-20">
        <Image
          src="/hero.png"
          className="max-w-sm rounded-lg shadow-2xl"
          alt={"Hero Image"}
          width={800}
          height={800}
        />
        <div>
          <h1 className="text-5xl font-bold">The Indomitable AI Spirit</h1>
          <p className="py-6 text-xl text-gray-600">
            Bream boasts the most advanced set of AI tutors on any planet in the
            solar system. Get personalized instruction, feedback and guidance on
            topics ranging from Biology to Computer Science.{" "}
          </p>
          {status === "loading" && (
            <Link
              href="/api/auth/signin"
              className="hover:scale-105 transition ease-in-out delay-50 inline-block text-lg shadow-md font-semibold text-white px-6 py-4 leading-none bg-primary-500 rounded-lg mt-4 lg:mt-0"
            >
              Sign Up
            </Link>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/api/auth/signin"
              className="hover:scale-105 transition ease-in-out delay-50 inline-block text-lg shadow-md font-semibold text-white px-6 py-4 leading-none bg-primary-500 rounded-lg mt-4 lg:mt-0"
            >
              Sign Up
            </Link>
          )}
          {status === "authenticated" && (
            <Link
              href="/interface"
              className="hover:scale-105 transition ease-in-out delay-50 inline-block text-lg shadow-md font-semibold text-white px-6 py-4 leading-none bg-primary-500 rounded-lg mt-4 lg:mt-0"
            >
              Speak With A Tutor
            </Link>
          )}
          <ScrollLink
            activeClass="activeScrollElement"
            to="features"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:scale-105 transition ease-in-out delay-50 inline-block cursor-pointer text-lg shadow-md font-semibold text-gray-900 mx-4 px-6 py-4 leading-none bg-slate-200 rounded-lg  mt-4 lg:mt-0"
          >
            Learn More ↓
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
