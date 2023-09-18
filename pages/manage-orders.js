import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import ProductTable from "../src/component/dashboard/Products/ProductTable";
import TitleArea from "../src/component/dashboard/TitleArea";
import { useGetUserOrdersQuery } from "../src/features/cart/cartApi";

const ManageOrders = () => {
  const { data: session } = useSession();
  const { data: orders } = useGetUserOrdersQuery(session?.user?.email);
  const [selectionModel, setSelectionModel] = useState([]);

  // console.log(orders);
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faHammer}
          title="MANAGE ORDERS"
          subtitle="MANAGE ORDERS subtitle here"
        />
        <div className="w-full overflow-hidden h-auto mt-4 p-4 rounded-md dashboard_cart_shadow">
          <ProductTable
            rows={orders ? orders : []}
            columns={[
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
              },
              {
                field: "total_amount",
                minWidth: 150,
                headerName: "Total Price",
              },
              {
                field: "payment_status",
                minWidth: 150,
                headerName: "Payment Status",
              },
              {
                field: "delivery_status",
                minWidth: 150,
                headerName: "Delivery Status",
              },
              {
                field: "acceptance",
                minWidth: 150,
                headerName: "Acceptance",
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
