import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
// import SinglePostHero from "../../src/component/containers/SinglePostHero";
const SinglePostHero = dynamic(
  () => import("../../src/component/containers/SinglePostHero"),
  {
    ssr: false,
  }
);

function GeneralPost() {
  const router = useRouter();
  const { id, posttype } = router.query;
  return (
    <div>
      <Head>
        <title>Your Ultimate Destination for Online Shopping & Services.</title>
        <meta
          name="description"
          content="Prayojon.com offers a wide range of products and Services to cater to your needs. Shop for latest Fashion, Electronics, Jobs, Rental, home essentials and more. Avail reliable trusted service providers for your everyday needs. Find everything you need in one place."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        {/* <HomeHero /> */}
        <SinglePostHero type={posttype} id={id} />
      </Layout>
      <Script
        src="https://kit.fontawesome.com/4b71bb4dff.js"
        crossorigin="anonymous"
      />
    </div>
  );
}

export default GeneralPost;
