import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import TitleArea from "../src/component/dashboard/TitleArea";

const Help = () => {
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faCircleQuestion}
          title="HELP"
          subtitle="HELP subtitle here"
        />
        <div className="w-full common_shadow mt-6">
          <h1 className="text-center">Support email: support@prayojon.com</h1>
        </div>
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

export default Help;
