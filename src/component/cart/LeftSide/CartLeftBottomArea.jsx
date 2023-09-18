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
                        getCarts?.cart?.map((item, i) => (
                              <CartLeftBottomAreaItem
                                    item={item}
                                    key={i}
                              />
                        ))
                  }
            </div>
      );
};

export default CartLeftBottomArea;