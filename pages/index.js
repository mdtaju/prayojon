import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import Navbar from '../src/component/common/Navbar/Navbar';
import HomeHero from '../src/component/containers/HomeHero';
import Layout from '../src/component/containers/Layout';
// const Navbar = dynamic(() => import('../src/component/csr/Navbar/Navbar'), {
//   ssr: false,
// })

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      <Head>
        <title>Prayojon</title>
        <meta name="description" content="Prayojon is a social app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <HomeHero />
      </Layout>
      <Script src="https://kit.fontawesome.com/4b71bb4dff.js" crossorigin="anonymous" />
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}