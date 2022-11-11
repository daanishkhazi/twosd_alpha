import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
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
          <Link
            href="/api/auth/signin"
            className="inline-block text-lg shadow-md font-semibold text-white px-6 py-4 leading-none bg-primary-500 rounded-lg hover:bg-primary-600 mt-4 lg:mt-0"
          >
            Sign In
          </Link>
          <Link
            href="/about"
            className="inline-block text-lg shadow-md font-semibold text-gray-900 mx-4 px-6 py-4 leading-none bg-slate-200 rounded-lg hover:bg-slate-300 mt-4 lg:mt-0"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
