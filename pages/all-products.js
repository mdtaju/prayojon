import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import ProductCard from "../src/component/dashboard/Products/ProductCard";
import TitleArea from "../src/component/dashboard/TitleArea";
import { useGetProductPostsForPersonalQuery } from "../src/features/userPost/userPostApi";

const AllProducts = () => {
  const { data: session } = useSession();
  const { data: getProducts } = useGetProductPostsForPersonalQuery(
    session?.user?.email
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState("");

  // products filtering
  useEffect(() => {
    if (getProducts) {
      const userProducts = getProducts?.filter(
        (p) => p?.user_id == session?.user?.email
      );
      setProducts(userProducts);
    }
  }, [getProducts, session]);

  // filter with categories
  // useEffect(() => {
  //   if (getProducts) {
  //     setProducts
  //   }
  // }, [categories])

  const handleChange = (event) => {
    if (event.target.value === "All Product") {
      const userProducts = getProducts?.filter(
        (p) => p?.user_id == session?.user?.email
      );
      setProducts(userProducts);
      setCategories(event.target.value);
      return;
    }
    setCategories(event.target.value);
    const getProductWithCategories = getProducts.filter(
      (p) =>
        p?.category === event.target.value && p?.user_id == session?.user?.email
    );
    setProducts(getProductWithCategories);
  };
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <div className="flex items-center w-full justify-between">
          <TitleArea
            Icon={faTag}
            title={categories ? categories?.toUpperCase() : "ALL PRODUCTS"}
            subtitle="All products subtitle here"
          />
          <div>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                background: "#fff",
                borderRadius: "5px",
              }}
              size="small">
              <InputLabel id="demo-select-small-label">Category</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={categories}
                label="Age"
                onChange={handleChange}>
                <MenuItem value={"All Product"}>All Product</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Fashion"}>Fashion</MenuItem>
                <MenuItem value={"Home & Garden"}>Home & Garden</MenuItem>
                <MenuItem value={"Vehaicle"}>Vehaicle</MenuItem>
                <MenuItem value={"Jewllery & Watches"}>
                  Jewllery & Watches
                </MenuItem>
                <MenuItem value={"Health &  Beauty"}>Health & Beauty</MenuItem>
                <MenuItem value={"Business Office & Industrial"}>
                  Business Office & Industrial
                </MenuItem>
                <MenuItem value={"Sporting"}>Sporting</MenuItem>
                <MenuItem value={"Toyes & Games"}>oyes & Games</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products?.map((p, i) => (
            <ProductCard key={i} product={p} isDialogStay={false} />
          ))}
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default AllProducts;
