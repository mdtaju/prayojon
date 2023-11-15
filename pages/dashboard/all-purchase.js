import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
import DashboardLayout from "../../src/component/dashboard/DashboardLayout";
import ProductTable from "../../src/component/dashboard/Products/ProductTable";
import TitleArea from "../../src/component/dashboard/TitleArea";
// import { useGetUserOrdersQuery } from "../src/features/cart/cartApi";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Rating } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAddProductReviewMutation } from "../../src/features/cart/cartApi";
import { useAddNotificationMutation } from "../../src/features/notification/notificationApi";
import { useGetUserPurchaseQuery } from "../../src/features/userPost/userPostApi";
import thousandFormate from "../../src/utils/thousandFormate";

const AllPurchase = () => {
  const { data: session } = useSession();
  const { data: orders, refetch } = useGetUserPurchaseQuery(
    session?.user?.email
  );
  const [selectionModel, setSelectionModel] = useState({});
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [addProductReview] = useAddProductReviewMutation();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [addNotification] = useAddNotificationMutation();

  const date = new Date().toUTCString();
  // console.log(orders);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReview = (row) => {
    setSelectionModel(row);
    handleClickOpen(true);
  };
  const reviewSubmit = () => {
    if (!value) {
      return setError("Please, select the rating value out of 5.");
    }
    addProductReview({
      product_id: selectionModel?.product_id,
      order_id: selectionModel?.order_query_id,
      message,
      star: value,
    })
      .unwrap()
      .then((d) => {
        setError("");
        addNotification({
          sender_id: session?.user?.email,
          receiver_id: selectionModel?.seller_id,
          message: `has rated your product.`,
          link: `/marketplace/${selectionModel?.product_query_id}`,
          date: date,
        });
        refetch(session?.user?.email);
        setOpen(false);
      })
      .catch((e) => {
        setError("Your rating not submitted. Please, try again or later.");
      });
  };
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faCartShopping}
          title="All Purchase"
          subtitle="MANAGE ORDERS subtitle here"
        />
        {/* dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title">
          <div className="w-full sm:w-[350px] md:w-[540px] p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-primary text-xl font-semibold">
                  Product Review
                </h1>
                {/* <p>You are able to edit just Price and Quantity. If you need to change other things you may contact the Prayojon support team.</p> */}
              </div>
              <button
                onClick={handleClose}
                className="w-[35px] h-[35px] bg-red-500 text-white rounded-full shadow-md grid place-items-center">
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className=" w-full mt-4 space-y-4">
              <h1 className="text-gray-800 font-semibold text-center text-base">
                * Rate your experience with selected product *
              </h1>
              <div className="w-fit mx-auto">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  size="large"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Write your feedback (Optional)
                </p>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="outline-none border border-gray-400 p-2 w-full rounded-lg"
                  placeholder="Write a message"></textarea>
              </div>
              <div className="space-y-2">
                <p className="text-red-500 text-sm font-semibold">{error}</p>
                <button onClick={reviewSubmit} className="btn_primary w-full">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Dialog>

        <div className="w-full overflow-hidden h-auto mt-4 p-4 rounded-md dashboard_cart_shadow">
          <ProductTable
            rows={orders ? orders : []}
            // columns={[
            //   {
            //     field: "order_id",
            //     minWidth: 150,
            //     headerName: "Order ID",
            //   },
            //   {
            //     field: "pay_amount",
            //     minWidth: 150,
            //     headerName: "Payable Amount",
            //   },
            //   {
            //     field: "currency",
            //     minWidth: 150,
            //     headerName: "Currency",
            //   },
            //   {
            //     field: "pay_status",
            //     minWidth: 150,
            //     headerName: "Payment Status",
            //   },
            //   {
            //     field: "order_time",
            //     minWidth: 150,
            //     headerName: "Order At",
            //   },
            // ]}
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
                      <button
                        disabled={
                          params?.row?.delivery_status === "Delivered"
                            ? false
                            : true
                        }
                        onClick={() => handleReview(params?.row)}
                        className={`btn_primary rounded-lg ${
                          params?.row?.delivery_status === "Delivered"
                            ? ""
                            : "bg-gray-400 text-gray-800 cursor-not-allowed"
                        }`}>
                        Leave a Review
                      </button>
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
            // checkboxSelection
            disableRowSelectionOnClick
            // onRowSelectionModelChange={(newSelectionModel) => {
            //   setSelectionModel(newSelectionModel);
            // }}
            getRowHeight={() => "auto"}
            // selectionModel={selectionModel}
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

export default AllPurchase;
