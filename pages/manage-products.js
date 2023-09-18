import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../src/component/common/Navbar/Navbar";
import Layout from "../src/component/containers/Layout";
import DashboardLayout from "../src/component/dashboard/DashboardLayout";
import DialogBody from "../src/component/dashboard/Products/DialogBody";
import ProductTable from "../src/component/dashboard/Products/ProductTable";
import TitleArea from "../src/component/dashboard/TitleArea";
import {
  useGetProductPostsForPersonalQuery,
  useProductDeleteMutation,
} from "../src/features/userPost/userPostApi";

const ManageProducts = () => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session } = useSession();
  const { data: getProducts, refetch } = useGetProductPostsForPersonalQuery(
    session?.user?.email
  );
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState("");
  const [productDelete, { data: productDelRes }] = useProductDeleteMutation();

  useEffect(() => {
    if (getProducts) {
      const getEditProduct = getProducts?.find(
        (p) => p.id == selectionModel[0]
      );
      setEditProduct(getEditProduct);
    }
  }, [getProducts, selectionModel]);

  // products filtering
  useEffect(() => {
    if (getProducts) {
      const userProducts = getProducts?.filter(
        (p) => p?.user_id == session?.user?.email
      );
      setProducts(userProducts);
    }
  }, [getProducts, session]);

  useEffect(() => {
    if (productDelRes) {
      refetch(session?.user?.email);
    }
  }, [productDelRes, session, refetch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = () => {
    const userConfirm = window.confirm(
      `If this product is in the order queue, you can't delete this product. Are you sure you want to proceed?`
    );
    if (!userConfirm) {
      return;
    }
    selectionModel?.map((pId) => {
      productDelete(pId);
    });
    refetch(session?.user?.email);
  };
  // const products = [
  //   {
  //     id: "394890293",
  //     name: "Dell Laptop",
  //     price: 34500,
  //     sales: 230,
  //     creation_date: "12/4/2022",
  //   },
  //   {
  //     id: "394890294",
  //     name: "Dell Laptop",
  //     price: 34500,
  //     sales: 230,
  //     creation_date: "12/4/2022",
  //   },
  //   {
  //     id: "394890295",
  //     name: "Dell Laptop",
  //     price: 34500,
  //     sales: 230,
  //     creation_date: "12/4/2022",
  //   },
  //   {
  //     id: "394890296",
  //     name: "Dell Laptop",
  //     price: 34500,
  //     sales: 230,
  //     creation_date: "12/4/2022",
  //   },
  //   {
  //     id: "394890297",
  //     name: "Dell Laptop",
  //     price: 34500,
  //     sales: 230,
  //     creation_date: "12/4/2022",
  //   },
  //   {
  //     id: "394890298",
  //     name: "Dell Laptop",
  //     price: 34500,
  //     sales: 230,
  //     creation_date: "12/4/2022",
  //   },
  // ];
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <TitleArea
            Icon={faTag}
            title="MANAGE PRODUCTS"
            subtitle="MANAGE products subtitle here"
          />
          {/* {selectionModel?.length !== 0 && ( */}
          <div
            className={`flex items-center gap-4 mt-4 md:mt-0 ${
              selectionModel?.length !== 0 ? "visible" : "invisible"
            } transition-all duration-50`}>
            <button onClick={handleClickOpen} className="btn_primary">
              Edit
            </button>
            <button
              onClick={handleDeleteProduct}
              className="btn_primary bg-red-500">
              Delete
            </button>
          </div>
          {/* )} */}
        </div>
        <div className="w-full h-auto mt-4 p-4 rounded-md dashboard_cart_shadow">
          <ProductTable
            rows={products}
            columns={[
              {
                field: "product_id",
                minWidth: 150,
                headerName: "Product Code",
              },
              {
                field: "product_title",
                minWidth: 150,
                headerName: "Product Name",
              },
              { field: "price", minWidth: 150, headerName: "Product Price" },
              { field: "sales", minWidth: 150, headerName: "Total Sales" },
              {
                field: "quantity",
                minWidth: 150,
                headerName: "Available Stock",
              },
              {
                field: "created_at",
                minWidth: 150,
                headerName: "Created At",
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
        {/* dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title">
          <div className="p-4">
            <DialogBody
              close={handleClose}
              id={selectionModel[0]}
              product={editProduct}
              setOpen={setOpen}
              refetch={refetch}
            />
          </div>
        </Dialog>
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

export default ManageProducts;
