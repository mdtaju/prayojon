import React, { useState } from 'react';

const CartLeftTopArea = ({ data }) => {
      const [checked, setChecked] = useState(true);
      return (
            <div className='w-full common_shadow'>
                  <div className='flex items-center gap-4 select-none'>
                        <input className='w-[16px] h-[16px]' type="checkbox" name="" id="selectAllProduct" defaultChecked={checked} value={checked} onChange={() => setChecked((prevCheck) => !prevCheck)} />
                        <label htmlFor="selectAllProduct" className='text-base font-medium text-gray-700'>Select All ({data?.length} Items)</label>
                  </div>
                  <div>

                  </div>
            </div>
      );
};

export default CartLeftTopArea;