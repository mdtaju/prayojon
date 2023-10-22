// import dynamic from "next/dynamic";
import React from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import NotificationHero from "../src/component/containers/NotificationHero";
// import CartHero from dynamic(() => "../../src/component/cart/CartHero");
// const CartHero = dynamic(() => import("../../src/component/cart/CartHero"), {
//   ssr: false,
// });
const Notification = () => {
  return (
    <Layout>
      <Navbar />
      <NotificationHero />
    </Layout>
  );
};

export default Notification;
