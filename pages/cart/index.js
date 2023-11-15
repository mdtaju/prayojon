import dynamic from "next/dynamic";
import React from "react";
// import CartHero from "../../src/component/cart/CartHero";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
const CartHero = dynamic(() => import("../../src/component/cart/CartHero"), {
  ssr: false,
});
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Cart = () => {
  return (
    <Layout>
      <Navbar />
      <CartHero />
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   // const session = await getSession({ req: context.req });
//   await urlencodedParser(context.req, context.res, () => {});
//   const { data } = await context.req.body;

//   // Do something with the data
//   // console.log(context.req);
//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: "/",
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   return {
//     props: {},
//   };
// }

export default Cart;
