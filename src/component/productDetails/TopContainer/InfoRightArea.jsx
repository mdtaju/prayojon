import Link from 'next/link';
import React from 'react';
import CartTopAreaItem from '../../cart/RightSide/CartTopAreaItem';

const InfoRightArea = ({ user = {} }) => {
      const { name, city, id } = user;
      return (
            <div className='w-full sm:w-[380px] shrink-0'>
                  <div className='p-2 border border-gray-300 rounded-md'>
                        <div className='p-4 border-b border-gray-300'>
                              <h1 className='text-base font-semibold text-gray-800'>Shop With Confidence</h1>
                        </div>
                        <div className='p-4 space-y-4'>
                              <CartTopAreaItem
                                    Img={"/images/replacement.svg"}
                                    title={"Trusted Seller, Fast Delivery, Easy Return"}
                              />
                              <CartTopAreaItem
                                    Img={"/images/moneyback.svg"}
                                    title={"Prayojon Money Back Guarantee"}
                              />
                        </div>
                  </div>
                  <div className='p-2 border border-gray-300 rounded-md mt-4'>
                        <div className='p-4 border-b border-gray-300'>
                              <h1 className='text-base font-semibold text-gray-800'>Seller Information</h1>
                        </div>
                        <div className='p-4 space-y-4'>
                              <ul className='text-sm font-semibold text-gray-700'>
                                    <li>Name: <Link className='text-primary hover:underline' target='_blank' href={`/profile/${id}`}>{name}</Link></li>
                                    <li>City: {city}</li>
                              </ul>
                        </div>
                  </div>
            </div>
      );
};

export default InfoRightArea;