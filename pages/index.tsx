import type { NextPage } from "next";
import Head from "next/head";
import { DirSection } from "../components/DirSection";
import { Footer } from "../components/Footer";
import { Heading } from "../components/Heading";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>DirCmt</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mt-2 text-center">
        <Heading title="DirCmt" />
      </header>
      <main className="container mx-auto max-w-5xl mt-6">
        <div>
          <DirSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
