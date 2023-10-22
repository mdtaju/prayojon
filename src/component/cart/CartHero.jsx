import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, IconButton } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import { useAddPaymentMutation, useGetCartItemsQuery } from '../../features/cart/cartApi';
import { addCarts } from '../../features/cart/cartSlice';
import useWindowSize from '../../hook/useWindowSize';
import { useAppDispatch, useAppSelector } from '../../reduxStore/reduxHooks';
import CartLeftContainer from './LeftSide/CartLeftContainer';
import CartRightContainer from './RightSide/CartRightContainer';

const CartHero = () => {
      const [selectPayment, setSelectPayment] = useState("Advance");
      const [isAgree, setIsAgree] = useState(false);
      const [warnMss, setWarnMss] = useState("");
      const windowSize = useWindowSize();
      const [snackOpen, setSnackOpen] = useState(false);
      const [totalAmount, setTotalAmount] = useState("");
      const [addPayment, { data, error }] = useAddPaymentMutation();
      const [isSend, setIsSend] = useState(false);
      const { data: session } = useSession();
      const { data: cartItems, refetch } = useGetCartItemsQuery(session?.user?.email);
      const dispatch = useAppDispatch();
      const [shippingInfo, setShippingInfo] = useState({
            name: "",
            phone: "",
            email: "",
            country: "",
            city: "",
            address: "",
      });
      const router = useRouter();
      const getCart = useAppSelector(state => state.cart);
      const [isItemInCart, setIsItemInCart] = useState(true);
      // const router = useRouter();
      // const handleCheckout = () => {
      //       router.push("/cart/checkout")
      // }

      // check is item in the cart 
      useEffect(() => {
            if (getCart?.cart && getCart?.cart?.length === 0) {
                  setIsItemInCart(false);
            } else {
                  setIsItemInCart(true)
            }
      }, [getCart]);

      // get data after payment success
      useEffect(() => {
            if (data) {
                  // window.open(data?.payment_url, "_blank");
                  router.push(data?.payment_url);
                  setIsSend(true)
            } else {
                  setIsSend(false)
            }
      }, [data, router]);

      // show error message
      useEffect(() => {
            if (error) {
                  setWarnMss(<p className='font-bold text-lg'>{error?.data}</p>);
                  setSnackOpen(true);
            }
      }, [error]);

      const handleProceed = async () => {
            if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.email || !shippingInfo.city || !shippingInfo.address) {
                  setWarnMss(<p className='font-bold text-lg'>You have to must compleat the <span className='text-primary'>shipping info</span>.</p>);
                  setSnackOpen(true);
                  return
            }
            if (!isAgree) {
                  setWarnMss(<p className='font-bold text-lg'>You have to must agree with our  <span className='text-primary'>terms and condition</span>.</p>);
                  setSnackOpen(true);
                  return
            }
            setIsSend(true);
            // all are ready for sent in the api 
            const getCartItemsIds = getCart?.cart?.map(c => {
                  return c.cart_id
            })

            const itemsIntoJson = JSON.stringify(getCartItemsIds);
            if (selectPayment === "Advance") {
                  addPayment({
                        id: session?.user?.email,
                        cus_name: shippingInfo.name,
                        cus_email: shippingInfo.email,
                        cus_phone: shippingInfo.phone,
                        amount: Math.floor(totalAmount),
                        cus_add1: shippingInfo.address,
                        cus_city: shippingInfo.city,
                        cart_items: itemsIntoJson,
                  });
            } else {
                  const d = new Date().toUTCString();
                  const makeOrderData = {
                        buyer_id: session?.user?.email,
                        buyer_name: shippingInfo?.name,
                        buyer_phone: shippingInfo?.phone,
                        buyer_address: shippingInfo?.address + ", " + shippingInfo?.city,
                        pay_amount: Math.floor(totalAmount),
                        currency: "BDT",
                        pay_status: "Not-Paid",
                        buyer_ip: "",
                        pay_time: d,
                        order_time: d,
                        cart_items: itemsIntoJson,
                        acceptance: "Hold-On"
                  };
                  const orderRes = await axiosInstance.post("/user_orders", makeOrderData);
                  if (orderRes?.status === 201) {
                        refetch()
                        dispatch(addCarts([]));
                        router.push(`/cart/checkout/${orderRes?.data?.order_id}`)
                  } else {
                        router.reload();
                  }
            }
      };

      const action = (
            <>
                  <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        className='float-right bg-orange-500 w-[35px] h-[35px] hover:bg-orange-500'
                        onClick={() => setSnackOpen(false)}
                  >
                        <FontAwesomeIcon
                              className='text-white'
                              icon={faClose}
                        />
                  </IconButton>
            </>
      );

      return (
            <div className="w-full md:w-[80%] max-w-[1536px] mx-auto min-h-screen mt-[20px] sm:mt-[55px] p-4 flex flex-col md:flex-row justify-between items-start">
                  {
                        isItemInCart ?
                              <>
                                    <CartLeftContainer
                                          selectPayment={selectPayment}
                                          setSelectPayment={setSelectPayment}
                                          setShippingInfo={setShippingInfo}
                                          isAgree={isAgree}
                                          setIsAgree={setIsAgree}
                                    />
                                    <CartRightContainer
                                          handleProceed={handleProceed}
                                          setTotalAmount={setTotalAmount}
                                          isSend={isSend}
                                    />

                                    {/* warn message */}
                                    <Dialog
                                          open={snackOpen}
                                          onClose={() => setSnackOpen(false)}
                                          fullScreen
                                          PaperProps={windowSize.width > 768 ?
                                                {
                                                      style: {
                                                            borderRadius: '10px',
                                                            width: '500px',
                                                            height: "400px"
                                                      }
                                                } :
                                                {}
                                          }
                                    >
                                          <div className='p-4 bg-orange-200 w-full h-full'>
                                                {action}
                                                <div className='w-full h-[80%] grid place-items-center'>
                                                      {warnMss}
                                                </div>
                                          </div>
                                    </Dialog>
                              </> :
                              <div className='w-full pt-10 grid place-items-center'>
                                    <div className='common_shadow'>
                                          <h1 className='font-bold text-lg text-gray-700'>No item added in the cart</h1>
                                    </div>
                              </div>
                  }
            </div>
      );
};

export default CartHero;