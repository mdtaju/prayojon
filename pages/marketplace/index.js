import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
import MarketPlaceHero from "../../src/component/containers/MarketPlaceHero";
// const Navbar = dynamic(() => import('../src/component/csr/Navbar/Navbar'), {
//   ssr: false,
// })

export default function Marketplace() {
  const { data } = useSession();

  return (
    <div>
      <Head>
        <title>Prayojon Marketplace</title>
        <meta name="description" content="Prayojon is a social app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <MarketPlaceHero />
      </Layout>
      {/* <Script src="https://kit.fontawesome.com/4b71bb4dff.js" crossorigin="anonymous" /> */}
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
