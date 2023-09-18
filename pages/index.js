import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../src/component/common/Navbar/Navbar";
import HomeHero from "../src/component/containers/HomeHero";
import Layout from "../src/component/containers/Layout";
// const Navbar = dynamic(() => import('../src/component/csr/Navbar/Navbar'), {
//   ssr: false,
// })

export default function Home() {
  const { data } = useSession();

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
        <HomeHero />
      </Layout>
      <Script
        src="https://kit.fontawesome.com/4b71bb4dff.js"
        crossorigin="anonymous"
      />
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: { session }
//   }
// }
