import { CircularProgress } from '@mui/material';
import React from 'react';
import CartRightBottomArea from './CartRightBottom/CartRightBottomArea';
import CartRightTopArea from './CartRightTopArea';

const CartRightContainer = ({ handleProceed, setTotalAmount, isSend }) => {

      return (
            <div className='w-full md:w-[30%] mt-6'>
                  <CartRightTopArea />
                  <CartRightBottomArea
                        setTotalAmount={setTotalAmount}
                  />
                  <button onClick={handleProceed} className='btn_primary rounded-md w-full my-6'>
                        {
                              !isSend ?
                                    <span>Proceed To Checkout</span> :
                                    <CircularProgress color='inherit' size={16} />
                        }
                  </button>
            </div>
      );
};

export default CartRightContainer;