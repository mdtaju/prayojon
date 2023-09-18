import React from 'react';

const CartRightMiddleArea = () => {
      return (
            <div className='bg-gray-100 px-6 py-3 border-y border-gray-300'>
                  <h1 className='text-base font-semibold text-gray-800 mb-2'>Add Promo code or voucher</h1>
                  <div className='flex items-center border border-gray-300'>
                        <input type="text" name="" className='outline-none px-4 py-2 w-[70%] text-sm font-semibold text-gray-800' placeholder='Enter your coupon code' />
                        <button className='py-2 px-3 bg-primary text-white w-[30%] text-sm font-semibold'>Apply</button>
                  </div>
            </div>
      );
};

export default CartRightMiddleArea;