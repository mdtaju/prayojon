import Link from "next/link";
import React from "react";
import Navbar from "../../../src/component/common/Navbar/Navbar";
import Layout from "../../../src/component/containers/Layout";

const Failed = () => {
  return (
    <Layout>
      <Navbar />
      <div className="w-screen h-screen grid place-items-center">
        <div className="common_shadow text-center space-y-3">
          <h1 className="text-lg font-bold text-gray-800">
            OH No! Your payment has been failed.
          </h1>
          <Link href={"/cart"}>
            <p className="text-primary underline">Try again</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Failed;
