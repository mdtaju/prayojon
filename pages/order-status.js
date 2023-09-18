import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import TitleArea from "../src/component/dashboard/TitleArea";

const OrderStatus = () => {
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faHammer}
          title="ORDER STATUS"
          subtitle="ORDER STATUS subtitle here"
        />
      </DashboardLayout>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default OrderStatus;
