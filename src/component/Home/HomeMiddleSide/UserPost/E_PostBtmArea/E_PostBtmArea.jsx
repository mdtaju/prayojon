import { faBangladeshiTakaSign, faBox, faCartPlus, faMoneyBill, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React, { memo, useEffect, useState } from 'react';
import { useAddCartItemMutation } from '../../../../../features/cart/cartApi';
import thousandFormate from '../../../../../utils/thousandFormate';


const PostE_BtmArea = ({ product = {}, cartItems = [] }) => {
      const moneyFormate = thousandFormate;
      const { id, price, status, original_price } = product;
      const [addCartItem, { data: cartData }] = useAddCartItemMutation();
      const { data: authUser } = useSession();
      const [isAdded, setIsAdded] = useState(false);

      useEffect(() => {
            if (cartItems?.length !== 0) {
                  const getItem = cartItems?.find(p => p.product_id === id?.toString());
                  if (getItem) {
                        setIsAdded(true);
                  }
            }
      }, [cartItems, id])

      const handleAddToCart = () => {
            if (authUser) {
                  const data = {
                        product_id: id,
                        user_id: authUser?.user?.email,
                        amount: price
                  }
                  addCartItem(data);
            } else {
                  alert("please login first")
            }
      }

      return (
            <div className='w-full p-1 border-t border-gray-300'>
                  {/* status part with four buttons */}
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 items-center'>
                        {/* Price */}
                        <div className='flex flex-col items-center'>
                              <div className='flex items-center gap-2'>
                                    <FontAwesomeIcon className='text-green-500' icon={faMoneyBill} />
                                    <span className='font-medium'>Price</span>
                              </div>
                              <span className='text-xs text-orange-500 font-semibold'><del><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {moneyFormate(+original_price)}</del></span>
                              <span className='text-gray-500 text-sm'><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {moneyFormate(+price)}</span>
                        </div>
                        {/* Type */}
                        <div className='flex flex-col items-center'>
                              <div className='flex items-center gap-2'>
                                    <FontAwesomeIcon className='text-orange-500' icon={faTag} />
                                    <span className='font-medium'>Type</span>
                              </div>
                              <span className='text-gray-500'>New</span>
                        </div>
                        {/* status */}
                        <div className='flex flex-col items-center'>
                              <div className='flex items-center gap-2'>
                                    <FontAwesomeIcon className='text-primary' icon={faBox} />
                                    <span className='font-medium'>Status</span>
                              </div>
                              <div className='px-3 py-1 bg-green-500 rounded-md'>
                                    <p className='text-white text-xs font-bold'>{status}</p>
                              </div>
                        </div>
                        {/* cart button */}
                        <div onClick={handleAddToCart} className='grid place-items-center'>
                              <div className={`group border border-orange-500 w-16 h-8 grid place-items-center rounded-full cursor-pointer active:scale-95 duration-150 hover:bg-orange-500 ${isAdded ? "bg-orange-500" : ""}`}>
                                    <FontAwesomeIcon className={`group-hover:text-white ${isAdded ? "text-white" : "text-orange-500"}`} icon={faCartPlus} />
                                    {/* <span className='font-medium'>Add+</span> */}
                              </div>
                        </div>
                  </div>
                  {/* bottom action bar */}
                  <div></div>
            </div>
      );
};

export default memo(PostE_BtmArea);