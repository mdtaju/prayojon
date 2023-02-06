import Script from 'next/script';
import Navbar from '../src/component/common/Navbar/Navbar';
import HomeHero from '../src/component/containers/HomeHero';
import Layout from '../src/component/containers/Layout';
// const Navbar = dynamic(() => import('../src/component/csr/Navbar/Navbar'), {
//   ssr: false,
// })

export default function Home() {
  return (
    <div>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Layout>
        <Navbar />
        <HomeHero />
      </Layout>
      <Script src="https://kit.fontawesome.com/4b71bb4dff.js" crossorigin="anonymous" />
    </div>
  )
}
