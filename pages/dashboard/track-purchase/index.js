import { faRoute } from "@fortawesome/free-solid-svg-icons";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../../src/component/common/Navbar/Navbar";
import Layout from "../../../src/component/containers/Layout";
import DashboardLayout from "../../../src/component/dashboard/DashboardLayout";
import TitleArea from "../../../src/component/dashboard/TitleArea";
import { useGetUserPurchaseOrdersMutation } from "../../../src/features/userPost/userPostApi";
import thousandFormate from "../../../src/utils/thousandFormate";

const TrackPurchase = () => {
  const { data: session } = useSession();
  const [getUserPurchaseOrders, { data }] = useGetUserPurchaseOrdersMutation();
  const [trackId, setTrackId] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const handleGetPurchase = () => {
    if (trackId) {
      getUserPurchaseOrders({ id: trackId });
    }
  };
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faRoute}
          title="Track Purchase"
          subtitle="MANAGE ORDERS subtitle here"
        />
        <div className="w-full overflow-hidden h-auto mt-4 p-4 rounded-md dashboard_cart_shadow grid place-items-center">
          <div className="flex flex-col gap-1">
            <label htmlFor="track-id" className="font-semibold text-gray-700">
              Track Your Purchase
            </label>
            <input
              type="text"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              name=""
              className="outline-none border border-gray-400 px-4 py-2 bg-gray-100 rounded-md"
              id="track-id"
              placeholder="Enter your purchase/order id"
            />
          </div>
          <button onClick={handleGetPurchase} className="btn_primary mt-4">
            Submit
          </button>
          <div className="w-full">
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}>
              {orders?.map((or, i) => (
                <TimelineItem key={i}>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 ${
                        orders.length !== i + 1 ? "pb-10" : ""
                      }`}>
                      <ul className="flex flex-col items-start gap-4 text-sm font-semibold text-gray-800">
                        <li className="text-primary font-bold">
                          Order Id:{" "}
                          <span className="text-gray-700">
                            {or?.order_query_id}
                          </span>
                        </li>
                        <li className="text-primary font-bold">
                          Product Id:{" "}
                          <span className="text-gray-700">
                            {or?.product_query_id}
                          </span>
                        </li>
                      </ul>
                      <ul className="flex flex-col items-start gap-4 text-sm font-semibold text-gray-800">
                        <li className="text-primary font-bold">
                          Product Price:{" "}
                          <span className="text-gray-700">
                            {`${thousandFormate(+or?.product_price)} BDT`}
                          </span>
                        </li>
                        <li className="text-primary font-bold">
                          Product Quantity:{" "}
                          <span className="text-gray-700">{or?.quantity}</span>
                        </li>
                      </ul>
                      <ul className="flex flex-col items-start gap-4 text-sm font-semibold text-gray-800">
                        <li className="text-primary font-bold">
                          Total Price:{" "}
                          <span className="text-gray-700">
                            {`${thousandFormate(+or?.total_amount)} BDT`}
                          </span>
                        </li>
                        <li className="text-primary font-bold">
                          Payment Status:{" "}
                          <span className="text-gray-700">
                            {or?.payment_status}
                          </span>
                        </li>
                      </ul>
                      <ul className="flex flex-col items-start gap-4 text-sm font-semibold text-gray-800">
                        <li className="text-primary font-bold">
                          Acceptance:{" "}
                          <span className="text-gray-700">
                            {or?.acceptance}
                          </span>
                        </li>
                        <li className="text-primary font-bold">
                          Delivery Status:{" "}
                          <span className="text-gray-700">
                            {or?.delivery_status}
                          </span>
                        </li>
                        <li className="text-primary font-bold">
                          Order Date:{" "}
                          <span className="text-gray-700">
                            {or?.created_at}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
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

export default TrackPurchase;
