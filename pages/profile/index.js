import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
import ProfileHero from "../../src/component/containers/ProfileHero";

const Profile = () => {
  return (
    <Layout>
      <Navbar />
      <ProfileHero />
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

export default Profile;
