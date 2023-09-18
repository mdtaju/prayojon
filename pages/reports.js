import { faChartLine, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import GraphChart from "../src/component/dashboard/Dashboard/Chart";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import TitleArea from "../src/component/dashboard/TitleArea";

const Reports = () => {
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faChartLine}
          title="REPORTS"
          subtitle="REPORTS subtitle here"
        />
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

export default Reports;
