import React from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import ProductUploadHero from "../src/component/containers/ProductUploadHero";

function UploadProduct() {
  return (
    <Layout>
      <Navbar />
      <ProductUploadHero />
    </Layout>
  );
}

export default UploadProduct;
