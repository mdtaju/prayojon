import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import EditProfileHero from "../../src/component/containers/EditProfileHero";
import Layout from "../../src/component/containers/Layout";

const Edit = () => {
  return (
    <Layout>
      <Navbar />
      <EditProfileHero />
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

export default Edit;
