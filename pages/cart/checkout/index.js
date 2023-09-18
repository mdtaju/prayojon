import React from "react";
import Navbar from "../../../src/component/common/Navbar/Navbar";
import Layout from "../../../src/component/containers/Layout";

const Checkout = () => {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default Checkout;
