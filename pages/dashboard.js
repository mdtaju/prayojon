import {
  faDollarSign,
  faHammer,
  faTableCellsLarge,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import GraphChart from "../src/component/dashboard/Dashboard/Chart";
import TopCart from "../src/component/dashboard/Dashboard/TopCart";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import TitleArea from "../src/component/dashboard/TitleArea";
import { useGetUserOrdersQuery } from "../src/features/cart/cartApi";
import { useGetProductPostsQuery } from "../src/features/userPost/userPostApi";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data: getProducts } = useGetProductPostsQuery();
  const [products, setProducts] = useState([]);
  const { data: orders } = useGetUserOrdersQuery(session?.user?.email);
  const [totalDeliver, setTotalDeliver] = useState([]);

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
            {/* chart container */}
            <div className="common_shadow dashboard_cart_shadow mt-2">
              <GraphChart />
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
            {/* chart container */}
            <div className="common_shadow dashboard_cart_shadow mt-2">
              <GraphChart />
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
