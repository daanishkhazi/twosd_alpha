import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link
              href="/terms"
              className="text-base text-gray-700 hover:text-gray-800"
            >
              Terms and Conditions
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/privacy"
              className="text-base text-gray-700 hover:text-gray-800"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="mailto:hello@gettala.com"
              className="text-base text-gray-700 hover:text-gray-800"
            >
              Contact
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="https://www.greenhouse.io/"
              className="text-base text-gray-700 hover:text-gray-800"
            >
              Careers (We&apos;re Hiring!)
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;