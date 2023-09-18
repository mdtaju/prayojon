import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import ProductTable from "../src/component/dashboard/Products/ProductTable";
import TitleArea from "../src/component/dashboard/TitleArea";
import { useGetUserPurchaseQuery } from "../src/features/userPost/userPostApi";

const AllPurchase = () => {
  const { data: session } = useSession();
  const { data: orders } = useGetUserPurchaseQuery(session?.user?.email);
  const [selectionModel, setSelectionModel] = useState([]);

  // console.log(orders);
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faCartShopping}
          title="All Purchase"
          subtitle="MANAGE ORDERS subtitle here"
        />
        <div className="w-full overflow-hidden h-auto mt-4 p-4 rounded-md dashboard_cart_shadow">
          <ProductTable
            rows={orders ? orders : []}
            columns={[
              {
                field: "order_id",
                minWidth: 150,
                headerName: "Order ID",
              },
              {
                field: "pay_amount",
                minWidth: 150,
                headerName: "Payable Amount",
              },
              {
                field: "currency",
                minWidth: 150,
                headerName: "Currency",
              },
              {
                field: "pay_status",
                minWidth: 150,
                headerName: "Payment Status",
              },
              {
                field: "order_time",
                minWidth: 150,
                headerName: "Order At",
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

export default AllPurchase;
