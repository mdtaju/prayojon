import React, { useState } from 'react';
import CartRightMiddleArea from './CartRightMiddleArea';
import RightBottomTopArea from './RightBottomTopArea';

const CartRightBottomArea = ({ setTotalAmount }) => {
      const [saving, setSaving] = useState("");
      return (
            <div className='common_shadow mt-6 p-0 overflow-hidden'>
                  <RightBottomTopArea
                        setTotalAmount={setTotalAmount}
                        setSaving={setSaving} />
                  <CartRightMiddleArea />
                  <div className='px-6 py-3 text-center bg-green-100 text-green-500'>
                        <h1 className='text-base font-bold'>You are saving {saving}%</h1>
                  </div>
            </div>
      );
};

export default CartRightBottomArea;