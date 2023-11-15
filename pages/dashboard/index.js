import {
  faDollarSign,
  faHammer,
  faTableCellsLarge,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
import GraphChart from "../../src/component/dashboard/Dashboard/Chart";
import TopCart from "../../src/component/dashboard/Dashboard/TopCart";
import DashboardLayout from "../../src/component/dashboard/DashboardLayout";
import TitleArea from "../../src/component/dashboard/TitleArea";
import axiosInstance from "../../src/config/axios";
import { useGetUserOrdersQuery } from "../../src/features/cart/cartApi";
import { useGetProductPostsForPersonalQuery } from "../../src/features/userPost/userPostApi";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data: getProducts } = useGetProductPostsForPersonalQuery(
    session.user.email
  );
  const [products, setProducts] = useState([]);
  const { data: orders } = useGetUserOrdersQuery(session?.user?.email);
  const [totalDeliver, setTotalDeliver] = useState([]);
  const [earningWithMonth, setEarningWithMonth] = useState([]);
  const [spentWithMonth, setSpentWithMonth] = useState([]);
  const [earningYear, setEarningYear] = useState(new Date().getFullYear());
  const [spentYear, setSpentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (getProducts) {
      const userProducts = getProducts?.filter(
        (p) => p?.user_id == session?.user?.email
      );
      setProducts(userProducts);
    }
  }, [getProducts, session]);

  useEffect(() => {
    if (orders) {
      const getDeliver = orders?.filter(
        (o) => o.delivery_status === "Delivered"
      );

      setTotalDeliver(getDeliver);
    }
  }, [orders]);

  // user total earning calculating process
  useEffect(() => {
    async function getEarning() {
      const res = await axiosInstance.get(
        `/user_earning?year=${earningYear}&id=${session.user.email}`
      );
      let earningArray = [];
      for (const element in res?.data) {
        earningArray.push(+res?.data[element]);
      }
      setEarningWithMonth(earningArray);
    }
    getEarning();
  }, [earningYear, session.user.email]);

  // user total spent calculating process
  useEffect(() => {
    async function getSpent() {
      const res = await axiosInstance.get(
        `/user_spent?year=${spentYear}&id=${session.user.email}`
      );
      let spentArray = [];
      for (const element in res?.data) {
        spentArray.push(+res?.data[element]);
      }
      setSpentWithMonth(spentArray);
    }
    getSpent();
  }, [spentYear, session.user.email]);

  const handleChange = (event) => {
    setEarningYear(event.target.value);
  };

  const handleSpentYearChange = (event) => {
    setSpentYear(event.target.value);
  };
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faTableCellsLarge}
          title="DASHBOARD"
          subtitle="Dashboard subtitle here"
        />
        <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <TopCart
            Icon={faTag}
            amount={products?.length}
            title={"Products"}
            subtitle={"Your total products"}
            bg={"bg-orange-200"}
            text={"text-orange-500"}
          />
          <TopCart
            Icon={faHammer}
            amount={orders?.length}
            title={"Orders"}
            subtitle={"Your total orders yet"}
            bg={"bg-blue-200"}
            text={"text-primary"}
          />
          <TopCart
            Icon={faTruck}
            amount={totalDeliver?.length}
            title={"Delivered"}
            subtitle={"Total successfully delivered"}
            bg={"bg-lime-200"}
            text={"text-lime-500"}
          />
        </div>
        {/* money status */}
        <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
          {/* chart one */}
          <div className="w-full">
            {/* total earing title area */}
            <div className="flex items-center gap-4">
              <div className="py-2 px-4 bg-white text-orange-500 rounded-sm dashboard_cart_shadow">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <h1 className="text-xl font-medium text-gray-800">EARNING</h1>
            </div>
            {/* total earning chart container */}
            <div className="space-y-4">
              <div className="common_shadow dashboard_cart_shadow mt-2">
                <GraphChart money={earningWithMonth} label="BDT" />
              </div>
              <div className="common_shadow">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={earningYear}
                    label="Age"
                    size="small"
                    onChange={handleChange}>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2027}>2027</MenuItem>
                    <MenuItem value={2028}>2028</MenuItem>
                    <MenuItem value={2029}>2029</MenuItem>
                    <MenuItem value={2031}>2031</MenuItem>
                    <MenuItem value={2032}>2032</MenuItem>
                    <MenuItem value={2033}>2033</MenuItem>
                    <MenuItem value={2034}>2034</MenuItem>
                    <MenuItem value={2035}>2035</MenuItem>
                    <MenuItem value={2036}>2036</MenuItem>
                    <MenuItem value={2037}>2037</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          {/* chart two */}
          {/* total earing title area */}
          <div className="w-full">
            <div className="flex items-center gap-4">
              <div className="py-2 px-4 bg-white text-orange-500 rounded-sm dashboard_cart_shadow">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <h1 className="text-xl font-medium text-gray-800">SPENT</h1>
            </div>
            {/* total spent chart container */}
            <div className="space-y-4">
              <div className="common_shadow dashboard_cart_shadow mt-2">
                <GraphChart money={spentWithMonth} label="BDT" />
              </div>
              <div className="common_shadow">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={spentYear}
                    label="Age"
                    size="small"
                    onChange={handleSpentYearChange}>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                    <MenuItem value={2027}>2027</MenuItem>
                    <MenuItem value={2028}>2028</MenuItem>
                    <MenuItem value={2029}>2029</MenuItem>
                    <MenuItem value={2031}>2031</MenuItem>
                    <MenuItem value={2032}>2032</MenuItem>
                    <MenuItem value={2033}>2033</MenuItem>
                    <MenuItem value={2034}>2034</MenuItem>
                    <MenuItem value={2035}>2035</MenuItem>
                    <MenuItem value={2036}>2036</MenuItem>
                    <MenuItem value={2037}>2037</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
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

export default Dashboard;
