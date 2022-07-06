import { Contact } from "components/Contact";
import { Hero } from "components/Hero";
import { Profiel } from "components/Profiel";
import { Werkervaring } from "components/Werkervaring";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Samar Hatroum</title>
      </Head>
      <Hero />
      <Contact />
      <Profiel />
      <Werkervaring />
    </div>
  );
};

export default Home;
