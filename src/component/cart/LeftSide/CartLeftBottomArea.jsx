import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCartItemsQueryMutation } from '../../../features/cart/cartApi';
import { useAppDispatch, useAppSelector } from "../../../reduxStore/reduxHooks";
import CartLeftBottomAreaItem from './CartLeftBottomAreaItem';

const CartLeftBottomArea = ({ cartItems = [] }) => {
      const [cartItemsQuery, { data }] = useCartItemsQueryMutation();
      const [productsId, setProductsId] = useState([]);
      const dispatch = useAppDispatch();
      const getCarts = useAppSelector((state) => state.cart);
      useEffect(() => {
            if (cartItems?.length !== 0) {
                  let carts_id = [];
                  cartItems?.map((cartItem) => {
                        carts_id.push(cartItem?.id);
                  });
                  cartItemsQuery(carts_id);
                  setProductsId(carts_id);
            }
      }, [cartItems, cartItemsQuery]);

      // useEffect(() => {
      //       if (data) {
      //             dispatch(addCarts(data));
      //       }
      // }, [data, dispatch]);

      return (
            <div className='w-full mt-6 common_shadow p-0'>
                  {
                        getCarts?.cart?.length ?
                              <>

                                    {
                                          getCarts?.cart?.map((item, i) => (
                                                <CartLeftBottomAreaItem
                                                      item={item}
                                                      key={i}
                                                />
                                          ))
                                    }
                              </> :
                              <div className='w-full p-4 flex flex-col sm:flex-row gap-3 items-center justify-between'>
                                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                                          <Skeleton variant="rounded" className='flex-1 rounded-lg' width={120} height={120} />
                                          <div>
                                                <Skeleton variant="text" className='flex-1 rounded-lg' width={150} />
                                                <Skeleton variant="text" className='flex-1 rounded-lg' width={120} />
                                                <Skeleton variant="text" className='flex-1 rounded-lg' width={160} />

                                          </div>
                                    </div>
                                    <div className='text-center'>
                                          <Skeleton variant="text" className='flex-1 rounded-lg' width={60} />
                                    </div>
                              </div>
                  }
            </div>
      );
};

export default CartLeftBottomArea;