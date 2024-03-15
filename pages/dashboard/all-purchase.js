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
  const [productQuality, setProductQuality] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [descriptionRating, setDescriptionRating] = useState(0);
  const [photoRating, setPhotoRating] = useState(0);
  const [deliveryService, setDeliveryService] = useState(0);
  const [sellerService, setSellerService] = useState(0);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [addProductReview] = useAddProductReviewMutation();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sellerMessage, setSellerMessage] = useState("");
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
    if (
      !productQuality ||
      !valueForMoney ||
      !descriptionRating ||
      !photoRating ||
      !deliveryService ||
      !sellerService
    ) {
      return setError("Please, select all rating value out of 5.");
    }
    addProductReview({
      product_id: selectionModel?.product_id,
      order_id: selectionModel?.order_query_id,
      message,
      seller_message: sellerMessage,
      product_quality_rating: productQuality,
      value_for_money_rating: valueForMoney,
      avg_rating: (productQuality + valueForMoney) / 2,
      accurate_description_rating: descriptionRating,
      accurate_photo: photoRating,
      delivery_service: deliveryService,
      seller_service: sellerService,
      total_avg_rating:
        (descriptionRating + photoRating + deliveryService + sellerService) / 4,
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
            <button
              onClick={handleClose}
              className="w-[35px] h-[35px] bg-red-500 text-white rounded-full shadow-md grid place-items-center ml-auto mb-4">
              <FontAwesomeIcon icon={faClose} />
            </button>
            {/* product rating and review start */}
            <div className="w-full p-4 border border-gray-400 rounded-md">
              <h1 className="text-primary text-xl font-semibold">
                Product Rating & Review
              </h1>
              <div className=" w-full mt-4 space-y-4">
                {/* product quality rating start */}
                <div className="w-full grid grid-cols-2 items-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    1. Product Quality
                  </span>
                  <div className="w-fit mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={productQuality}
                      onChange={(event, newValue) => {
                        setProductQuality(newValue);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                {/* product quality rating end */}

                {/* product value for money start */}
                <div className="w-full grid grid-cols-2 items-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    2. Value For Money
                  </span>
                  <div className="w-fit mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={valueForMoney}
                      onChange={(event, newValue) => {
                        setValueForMoney(newValue);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                {/* product value for money end */}
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Write your feedback (Optional)
                  </p>
                  <textarea
                    name=""
                    id=""
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="outline-none border border-gray-400 p-2 w-full rounded-lg"
                    placeholder="Write a message"></textarea>
                </div>
              </div>
            </div>
            {/* product rating and review end */}
            {/* seller rating and review start */}
            <div className="w-full p-4 border border-gray-400 rounded-md mt-4">
              <h1 className="text-primary text-xl font-semibold">
                Seller Rating & Review
              </h1>
              <div className=" w-full mt-4 space-y-4">
                {/* product accurate Description start */}
                <div className="w-full grid grid-cols-2 items-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    1. Accurate Description
                  </span>
                  <div className="w-fit mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={descriptionRating}
                      onChange={(event, newValue) => {
                        setDescriptionRating(newValue);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                {/* product accurate Description start end */}

                {/* product accurate pic and video start */}
                <div className="w-full grid grid-cols-2 items-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    2. Accurate Picture & Video
                  </span>
                  <div className="w-fit mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={photoRating}
                      onChange={(event, newValue) => {
                        setPhotoRating(newValue);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                {/* product accurate pic and video end */}
                {/* delivery service start */}
                <div className="w-full grid grid-cols-2 items-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    3. Delivery Service
                  </span>
                  <div className="w-fit mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={deliveryService}
                      onChange={(event, newValue) => {
                        setDeliveryService(newValue);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                {/* delivery service end */}
                {/* Seller service start */}
                <div className="w-full grid grid-cols-2 items-center">
                  <span className="text-gray-800 font-semibold text-sm">
                    4. Seller Service
                  </span>
                  <div className="w-fit mx-auto">
                    <Rating
                      name="simple-controlled"
                      value={sellerService}
                      onChange={(event, newValue) => {
                        setSellerService(newValue);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                {/* Seller service end */}
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Write your feedback (Optional)
                  </p>
                  <textarea
                    name=""
                    id=""
                    value={sellerMessage}
                    onChange={(e) => setSellerMessage(e.target.value)}
                    className="outline-none border border-gray-400 p-2 w-full rounded-lg"
                    placeholder="Write a message"></textarea>
                </div>
              </div>
            </div>
            {/* seller rating and review end */}
            <div className="space-y-2">
              <p className="text-red-500 text-sm font-semibold">{error}</p>
              <button onClick={reviewSubmit} className="btn_primary w-full">
                Submit
              </button>
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
                field: "total_avg_rating",
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
                field: "delivery_note",
                minWidth: 150,
                headerName: "Delivery Note",
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
                field: "color",
                minWidth: 150,
                headerName: "Color",
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
