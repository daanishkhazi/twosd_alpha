import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Faqs from "../components/Faqs";
import Pricing from "../components/Pricing";

export default function Home() {
  return (
    <Layout>
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
        <Hero></Hero>
        <Features id="features"></Features>
        <Testimonials id="testimonials"></Testimonials>
        <Faqs id="faqs"></Faqs>
        <Pricing id="pricing"></Pricing>
      </div>
    </Layout>
  );
}
