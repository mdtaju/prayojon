import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useAddCartItemMutation, useGetCartItemsQuery } from '../../../features/cart/cartApi';
import thousandFormate from "../../../utils/thousandFormate";
const DetailsArea = ({
      id,
      title,
      description,
      originalPrice,
      price,
      location,
      quantity,
      condition }) => {
      const { data: session } = useSession();
      const [addCartItem, { data: cartData }] = useAddCartItemMutation();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      const [isAdded, setIsAdded] = useState(false);

      useEffect(() => {
            if (cartItems?.length !== 0) {
                  const getItem = cartItems?.find(p => p.product_id === id?.toString());
                  if (getItem) {
                        setIsAdded(true);
                  }
            }
      }, [cartItems, id]);

      const handleAddToCart = () => {
            if (session) {
                  const data = {
                        product_id: id,
                        user_id: session?.user?.email,
                        amount: price
                  }
                  addCartItem(data);
            } else {
                  alert("please login first")
            }
      }
      return (
            <div className='flex-1 px-3 py-2'>
                  <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4'>
                        <p className='text-sm font-bold px-3 py-1 bg-orange-500 rounded-full text-white'>Current Price: {thousandFormate(+price)}/-</p>
                        <p className='text-base font-semibold'>Regular Price: <del>{thousandFormate(+originalPrice)}/-</del></p>
                  </div>
                  <div className='mt-3'>
                        <p className='text-base font-semibold text-gray-700'>Condition: {condition}</p>
                        <p className='text-base font-semibold text-gray-700'>{quantity} products available in stock</p>
                        <p className='text-base font-semibold text-gray-700'>Location: {location}</p>
                  </div>

                  <div onClick={handleAddToCart} className='grid place-items-center w-fit mt-3'>
                        <div className={`group border border-orange-500 w-16 h-8 grid place-items-center rounded-full cursor-pointer active:scale-95 duration-150 hover:bg-orange-500 ${isAdded ? "bg-orange-500" : ""}`}>
                              <FontAwesomeIcon className={`group-hover:text-white ${isAdded ? "text-white" : "text-orange-500"}`} icon={faCartPlus} />
                        </div>
                  </div>
            </div>
      );
};

export default DetailsArea;