import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/legacy/image';
import React from 'react';

const CartLeftPaymentMethod = ({ selectPayment, setSelectPayment }) => {

      const handleRadioChange = (e) => {
            setSelectPayment(e.target.value);
      }
      return (
            <div className='common_shadow px-4 py-3 mt-6'>
                  <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <h1 className='text-base font-bold whitespace-nowrap text-primary'>Payment method</h1>
                        <div className='flex flex-col sm:flex-row gap-3 items-center'>
                              <label className='flex relative items-center gap-3 p-2 border border-gray-400 rounded-md cursor-pointer bg-gray-100'>
                                    <input type="radio" value="Advance" checked={selectPayment === 'Advance'} onChange={handleRadioChange} id="advanceMethod" className='w-[22px] h-[22px]' />
                                    <FontAwesomeIcon
                                          icon={faMoneyCheckDollar}
                                          className='text-[35px] text-green-500'
                                    />
                                    <span className='cursor-pointer'>Advance Payment</span>
                              </label>
                              <label className='flex items-center gap-3 p-2 border border-gray-400 rounded-md cursor-pointer bg-gray-100'>
                                    <input type="radio" value="Case-On-Delivery" checked={selectPayment === 'Case-On-Delivery'} onChange={handleRadioChange} id="cashOnDelivery" className='w-[22px] h-[22px]' />
                                    <div className='w-[35px] h-[35px] relative'>
                                          <Image
                                                src={"/images/cod.png"}
                                                alt='cod'
                                                layout='fill'
                                                className='object-contain object-center'
                                          />
                                    </div>

                                    <span className='cursor-pointer'>Case on Delivery</span>
                              </label>
                        </div>
                  </div>
            </div>
      );
};

export default CartLeftPaymentMethod;