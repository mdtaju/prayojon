import bodyParser from "body-parser";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../../src/component/common/Navbar/Navbar";
import Layout from "../../../src/component/containers/Layout";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const CheckoutSuccess = () => {
  const router = useRouter();
  return (
    <Layout>
      <Navbar />
      <div
        className="w-screen h-screen grid place-items-center"
        style={{ backgroundImage: "url('/images/fireworks.gif')" }}>
        <div className="common_shadow text-center space-y-3">
          <h1 className="text-lg font-bold text-gray-800">
            Congratulations your order was successful.
          </h1>
          <h4 className="text-sm text-bold text-gray-600">
            Your order id is: {router.query.id}
          </h4>
          <Link href={`/dashboard/track-purchase/${router.query.id}`}>
            <p className="text-primary underline">See your order</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await urlencodedParser(context.req, context.res, () => {});
  const { data } = await context.req.body;

  // Do something with the data
  // console.log(data);
  return {
    props: {},
  };
}

export default CheckoutSuccess;
