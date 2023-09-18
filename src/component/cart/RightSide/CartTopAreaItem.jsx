import Image from 'next/image';
import React from 'react';

const CartTopAreaItem = ({ Img = "", title = "" }) => {
      return (
            <div className='flex items-center gap-4'>
                  <Image
                        src={Img}
                        alt={title}
                        width={22}
                        height={22}
                  />
                  <h4 className='text-sm text-gray-800 font-semibold'>{title}</h4>
            </div>
      );
};

export default CartTopAreaItem;