import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Rating } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import SnackMessage from "../../src/component/common/SnackMessage";
import Layout from "../../src/component/containers/Layout";
import DashboardLayout from "../../src/component/dashboard/DashboardLayout";
import ProductTable from "../../src/component/dashboard/Products/ProductTable";
import TitleArea from "../../src/component/dashboard/TitleArea";
import {
  useGetUserOrdersQuery,
  useUpdateOrderMutation,
} from "../../src/features/cart/cartApi";
import { useAddNotificationMutation } from "../../src/features/notification/notificationApi";
import thousandFormate from "../../src/utils/thousandFormate";

const ManageOrders = () => {
  const { data: session } = useSession();
  const { data: orders, refetch } = useGetUserOrdersQuery(session?.user?.email);
  const [addNotification] = useAddNotificationMutation();
  const [selectionModel, setSelectionModel] = useState([]);
  const [updateOrder] = useUpdateOrderMutation();
  const [orderAcceptance, setOrderAcceptance] = useState("Hold-On");
  const [deliveryStatus, setDeliveryStatus] = useState("Not-Delivered");
  const [paymentStatus, setPaymentStatus] = useState("Not-Paid");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    error: false,
    message: "",
  });

  const date = new Date().toUTCString();

  const handleOrderAcceptanceChange = (e) => {
    setOrderAcceptance(e.target.value);
  };

  const handleDeliveryStatus = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const handlePaymentStatus = (e) => {
    setPaymentStatus(e.target.value);
  };

  const paymentStatusHandler = () => {
    setLoading(true);
    selectionModel?.map((id) => {
      const getIndex = orders?.findIndex((item) => item?.id === id);
      const makeData = {
        index: getIndex,
        userId: session?.user?.email,
        id,
        paymentStatus,
        deliveryStatus: "",
        acceptance: "",
      };
      updateOrder(makeData)
        .unwrap()
        .then((d) => {
          setMessage({
            error: false,
            message: "Data successfully updated.",
          });
          setLoading(false);
          setOpen(true);
          refetch(session?.user?.email);
        })
        .catch((e) => {
          setMessage({
            error: false,
            message: "Something went wrong. Please, try again.",
          });
          setLoading(false);
          setOpen(true);
        });
    });
  };
  const deliveryStatusHandler = () => {
    setLoading(true);
    selectionModel?.map((id) => {
      const getIndex = orders?.findIndex((item) => item?.id === id);
      const makeData = {
        index: getIndex,
        userId: session?.user?.email,
        id,
        paymentStatus: "",
        deliveryStatus,
        acceptance: "",
      };
      updateOrder(makeData)
        .unwrap()
        .then((d) => {
          setMessage({
            error: false,
            message: "Data successfully updated.",
          });
          addNotification({
            sender_id: session?.user?.email,
            receiver_id: orders[getIndex]?.buyer_id,
            message: `mark as ${deliveryStatus} your order`,
            link: `/profile/${session?.user?.email}`,
            date: date,
          });
          setLoading(false);
          setOpen(true);
          refetch(session?.user?.email);
        })
        .catch((e) => {
          setMessage({
            error: false,
            message: "Something went wrong. Please, try again.",
          });
          setLoading(false);
          setOpen(true);
        });
    });
  };
  const acceptanceHandler = () => {
    setLoading(true);
    selectionModel?.map((id) => {
      const getIndex = orders?.findIndex((item) => item?.id === id);
      const makeData = {
        index: getIndex,
        userId: session?.user?.email,
        id,
        paymentStatus: "",
        deliveryStatus: "",
        acceptance: orderAcceptance,
      };
      updateOrder(makeData)
        .unwrap()
        .then((d) => {
          setMessage({
            error: false,
            message: "Data successfully updated.",
          });
          addNotification({
            sender_id: session?.user?.email,
            receiver_id: orders[getIndex]?.buyer_id,
            message: `${orderAcceptance} your order`,
            link: `/profile/${session?.user?.email}`,
            date: date,
          });
          setLoading(false);
          setOpen(true);
          refetch(session?.user?.email);
        })
        .catch((e) => {
          setMessage({
            error: false,
            message: "Something went wrong. Please, try again.",
          });
          setLoading(false);
          setOpen(true);
        });
    });
  };

  // console.log(orders);
  return (
    <Layout>
      <Navbar />
      <SnackMessage open={open} setOpen={setOpen} message={message} />
      <DashboardLayout>
        <TitleArea
          Icon={faHammer}
          title="MANAGE ORDERS"
          subtitle="MANAGE ORDERS subtitle here"
        />
        {loading ? (
          <div className="w-full grid place-items-center py-4 mt-4">
            <CircularProgress color="primary" size={30} />
          </div>
        ) : (
          <div className="w-full sm:w-fit mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            {/* payment status start */}
            <div className="space-y-4 p-4 border border-primary rounded-lg bg-white">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Payment Status
                </p>
                <select
                  disabled={selectionModel?.length ? false : true}
                  className={`outline-none border-2 border-gray-400 rounded-lg px-2 py-1 border-opacity-60 w-[200px]`}
                  name=""
                  id=""
                  value={paymentStatus}
                  onChange={handlePaymentStatus}>
                  <option value="Not-Paid">Not-Paid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <button
                onClick={paymentStatusHandler}
                disabled={selectionModel?.length ? false : true}
                className={`btn_primary w-full ${
                  !selectionModel?.length
                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                    : ""
                }`}>
                Submit
              </button>
            </div>
            {/* payment status end */}

            {/* delivery status start */}
            <div className="space-y-4 p-4 border border-primary rounded-lg bg-white">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Delivery Status
                </p>
                <select
                  disabled={selectionModel?.length ? false : true}
                  className={`outline-none border-2 border-gray-400 rounded-lg px-2 py-1 border-opacity-60 w-[200px]`}
                  name=""
                  id=""
                  value={deliveryStatus}
                  onChange={handleDeliveryStatus}>
                  <option value="Delivered">Delivered</option>
                  <option value="Not-Delivered">Not-Delivered</option>
                </select>
              </div>
              <button
                onClick={deliveryStatusHandler}
                disabled={selectionModel?.length ? false : true}
                className={`btn_primary w-full ${
                  !selectionModel?.length
                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                    : ""
                }`}>
                Submit
              </button>
            </div>
            {/* delivery status end */}

            {/* order acceptance start */}
            <div className="space-y-4 p-4 border border-primary rounded-lg bg-white">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Order Acceptance
                </p>
                <select
                  disabled={selectionModel?.length ? false : true}
                  className={`outline-none border-2 border-gray-400 rounded-lg px-2 py-1 border-opacity-60 w-[200px]`}
                  name=""
                  id=""
                  value={orderAcceptance}
                  onChange={handleOrderAcceptanceChange}>
                  <option value="Hold-On">Hold On</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button
                onClick={acceptanceHandler}
                disabled={selectionModel?.length ? false : true}
                className={`btn_primary w-full ${
                  !selectionModel?.length
                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                    : ""
                }`}>
                Submit
              </button>
            </div>
            {/* order acceptance end */}
          </div>
        )}

        <div className="w-full overflow-hidden h-auto mt-4 p-4 rounded-md dashboard_cart_shadow">
          <ProductTable
            rows={orders ? orders : []}
            columns={[
              {
                field: "star",
                minWidth: 200,
                headerName: "Review",
                renderCell: (params) => {
                  // console.log(params);
                  if (params?.value) {
                    return (
                      <Rating name="read-only" value={params?.value} readOnly />
                    );
                  } else {
                    return (
                      <span className="text-sm font-bold text-orange-600">
                        No Review
                      </span>
                    );
                  }
                },
              },
              {
                field: "order_query_id",
                minWidth: 150,
                headerName: "Order ID",
              },
              {
                field: "product_query_id",
                minWidth: 150,
                headerName: "Product ID",
              },
              {
                field: "payment_status",
                minWidth: 150,
                headerName: "Payment Status",
                renderCell: (params) => {
                  let statusColor = "";
                  if (params?.value === "Not-Paid") {
                    statusColor = "text-white bg-orange-400";
                  } else {
                    statusColor = "text-white bg-green-400";
                  }
                  return (
                    <button
                      className={`outline-none ${statusColor} rounded-lg px-2 py-1`}>
                      {params?.value}
                    </button>
                  );
                },
              },
              {
                field: "delivery_status",
                minWidth: 150,
                headerName: "Delivery Status",
                renderCell: (params) => {
                  let statusColor = "";
                  if (params?.value === "Not-Delivered") {
                    statusColor = "text-white bg-orange-400";
                  } else {
                    statusColor = "text-white bg-green-400";
                  }
                  return (
                    <button
                      className={`outline-none ${statusColor} rounded-lg px-2 py-1`}>
                      {params?.value}
                    </button>
                  );
                },
              },
              {
                field: "acceptance",
                minWidth: 150,
                headerName: "Acceptance",
                renderCell: (params) => {
                  let statusColor = "";
                  if (params?.value === "Hold-On") {
                    statusColor = "text-white bg-orange-400";
                  } else if (params?.value === "Accepted") {
                    statusColor = "text-white bg-green-400";
                  } else {
                    statusColor = "text-white bg-red-400";
                  }
                  return (
                    <button
                      className={`outline-none ${statusColor} rounded-lg px-2 py-1`}>
                      {params?.value}
                    </button>
                  );
                },
              },
              {
                field: "buyer_id",
                minWidth: 150,
                headerName: "Buyer ID",
              },
              {
                field: "buyer_name",
                minWidth: 150,
                headerName: "Buyer Name",
              },
              {
                field: "buyer_phone",
                minWidth: 150,
                headerName: "Buyer Phone",
              },
              {
                field: "buyer_address",
                minWidth: 150,
                headerName: "Buyer Address",
              },
              {
                field: "quantity",
                minWidth: 150,
                headerName: "Quantity",
              },
              {
                field: "product_price",
                minWidth: 150,
                headerName: "Product Price",
                renderCell: (params) => (
                  <span>{`${thousandFormate(+params?.value)} BDT`}</span>
                ),
              },
              {
                field: "total_amount",
                minWidth: 150,
                headerName: "Total Price",
                renderCell: (params) => (
                  <span>{`${thousandFormate(+params?.value)} BDT`}</span>
                ),
              },
              {
                field: "created_at",
                minWidth: 150,
                headerName: "Order Date",
              },
            ]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            getRowHeight={() => "auto"}
            selectionModel={selectionModel}
          />
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

export default ManageOrders;
