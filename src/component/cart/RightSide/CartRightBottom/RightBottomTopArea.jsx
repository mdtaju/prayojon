import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import thousandFormate from '../../../../utils/thousandFormate';
import TopAreaItem from './TopAreaItem';

const RightBottomTopArea = ({ setSaving, setTotalAmount }) => {
      const [subtotal, setSubtotal] = useState("");
      const [shipping, setShipping] = useState("");
      const [total, setTotal] = useState("");
      const [payableTotal, setPayableTotal] = useState("");
      const getCarts = useAppSelector((state) => state.cart);


      // price calculation
      useEffect(() => {
            if (getCarts) {
                  const subTotalCal = getCarts?.cart?.reduce((sum, obj) => {
                        const total = +obj?.quantity * +obj?.price;
                        const grandTotal = total + sum;
                        return grandTotal;
                  }, 0);
                  const originalTotal = getCarts?.cart?.reduce((sum, obj) => {
                        const total = +obj?.quantity * +obj?.original_price;
                        const grandTotal = total + sum;
                        return grandTotal;
                  }, 0);
                  const savingDiscount = Math.floor((originalTotal - subTotalCal) * 100 / originalTotal);
                  setSaving(savingDiscount);
                  setSubtotal(subTotalCal);
                  if (!subTotalCal) {
                        setShipping(0)
                  } else {
                        setShipping("120");
                  }
                  const totalCal = subTotalCal + +shipping;
                  setTotal(totalCal);
                  setTotalAmount(totalCal);
            }
      }, [getCarts, shipping, setSaving, setTotalAmount]);

      return (
            <div className='p-6'>
                  <h1 className='mb-4 text-lg text-gray-800 font-semibold'>Checkout Summary</h1>
                  <TopAreaItem
                        classes={"border-t font-normal"}
                        title={"Subtotal"}
                        price={thousandFormate(subtotal)}
                  />
                  <TopAreaItem
                        classes={"border-t font-normal"}
                        title={"Shipping"}
                        price={shipping}
                  />
                  <TopAreaItem
                        classes={"border-t font-normal"}
                        title={"Total"}
                        price={thousandFormate(total)}
                  />
                  <TopAreaItem
                        classes={"border-y font-medium"}
                        title={"Payable Total"}
                        price={thousandFormate(total)}
                  />
            </div>
      );
};

export default RightBottomTopArea;