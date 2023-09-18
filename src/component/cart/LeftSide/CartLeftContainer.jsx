import React from 'react';
// import { useGetCartItemsQuery } from '../../../features/cart/cartApi';
import { useSession } from 'next-auth/react';
import { useGetCartItemsQuery } from '../../../features/cart/cartApi';
import CartLeftAddressArea from './CartLeftAddressArea';
import CartLeftBottomArea from "./CartLeftBottomArea";
import CartLeftPaymentMethod from './CartLeftPaymentMethod';
import Conditions from './Conditions';

const CartLeftContainer = ({ selectPayment, setSelectPayment, setShippingInfo, isAgree, setIsAgree }) => {
      const { data: session } = useSession();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      return (
            <div className='w-full md:w-[60%]'>
                  {/* <CartLeftTopArea
                        data={cartItems}
                  /> */}
                  <CartLeftBottomArea
                        cartItems={cartItems}
                  />
                  <CartLeftAddressArea
                        setShippingInfo={setShippingInfo}
                  />
                  <CartLeftPaymentMethod
                        selectPayment={selectPayment}
                        setSelectPayment={setSelectPayment}
                  />
                  <Conditions
                        isAgree={isAgree}
                        setIsAgree={setIsAgree}
                  />
            </div>
      );
};

export default CartLeftContainer;