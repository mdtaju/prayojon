import React from 'react';
import CartTopAreaItem from './CartTopAreaItem';

const CartRightTopArea = () => {
      return (
            <div className='common_shadow p-6 flex flex-col gap-6'>
                  <CartTopAreaItem
                        Img={"/images/case-on-delivery.svg"}
                        title={"Cash on Delivery Available"}
                  />
                  <CartTopAreaItem
                        Img={"/images/replacement.svg"}
                        title={"7 Days Replacement Policy"}
                  />
                  <CartTopAreaItem
                        Img={"/images/moneyback.svg"}
                        title={"100% Money Back Guarantee"}
                  />
                  <CartTopAreaItem
                        Img={"/images/secure-payment-2.png"}
                        title={"Payment 100% secure"}
                  />
            </div>
      );
};

export default CartRightTopArea;