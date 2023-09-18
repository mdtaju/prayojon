import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
import ProductDetailsHero from "../../src/component/containers/ProductDetailsHero";
import axiosInstance from "../../src/config/axios";

const Product = () => {
  const router = useRouter();
  const [productData, setProductData] = useState("");

  // get product with product id
  useEffect(() => {
    if (router?.query?.id) {
      async function getProduct() {
        const res = await axiosInstance.get(
          `/single_product/${router?.query?.id}`
        );
        setProductData(res?.data);
      }
      getProduct();
    }
  }, [router]);
  return (
    <div>
      <Head>
        <title>{productData?.product_title}</title>
        <meta name="description" content={productData?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <ProductDetailsHero product={productData} />
      </Layout>
      {/* <Script src="https://kit.fontawesome.com/4b71bb4dff.js" crossorigin="anonymous" /> */}
    </div>
  );
};

export default Product;
