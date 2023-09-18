import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { useCartRemoveMutation, useCartUpdateQuantityMutation } from '../../../features/cart/cartApi';
import thousandFormate from '../../../utils/thousandFormate';

const CartLeftBottomAreaItem = ({ item = {} }) => {
      const { cart_id, image, title, description, price, quantity, stock, original_price } = item;
      const [checked, setChecked] = useState(true);
      const [quantityInput, setQuantityInput] = useState(quantity);
      const [cartUpdateQuantity, { data }] = useCartUpdateQuantityMutation();
      const [cartRemove, { data: removeItem }] = useCartRemoveMutation();

      // quantity input handle change
      const handleQuantity = (e) => {
            const value = e.target.value;
            if (!isNaN(value)) {
                  setQuantityInput(Number(value));
                  cartUpdateQuantity({ cart_id, quantity: Number(value) });
            } else {
                  alert('Please enter a valid number');
            }
      }

      // handle quantity onBlur
      const handleQuantityBlur = (e) => {
            const value = e.target.value;
            if (!isNaN(value)) {
                  if (Number(value) < 1) {
                        setQuantityInput(1);
                        cartUpdateQuantity({ cart_id, quantity: 1 });
                  }
            }
      }

      // quantity update handler 
      const handleIncrement = () => {
            if (+quantityInput < stock) {
                  cartUpdateQuantity({ cart_id, quantity: +quantity + 1 });
                  setQuantityInput((prevCount) => +prevCount + 1);
            }
      }

      const handleDecrement = () => {
            if (+quantity > 1) {
                  cartUpdateQuantity({ cart_id, quantity: +quantity - 1 });
                  setQuantityInput((prevCount) => +prevCount - 1);
            }
      }

      const removeHandler = () => {
            cartRemove({ id: cart_id })
      }

      return (
            <div className='w-full p-4 border-b border-gray-300 flex flex-col sm:flex-row gap-3 items-center justify-between'>
                  {/* checkbox, image and description container */}
                  <div className='flex flex-col sm:flex-row items-center gap-4'>
                        {/* checkbox and image container */}
                        <div className='flex items-center gap-4'>
                              {/* <div>
                                    <input defaultChecked={checked} value={checked} onChange={() => setChecked((pC) => !pC)} className='w-[16px] h-[16px]' type="checkbox" />
                              </div> */}
                              {/* image area */}
                              <div className='relative w-[220px] sm:w-[120px] h-[220px] sm:h-[120px]'>
                                    <Image
                                          src={image}
                                          alt='watch'
                                          layout='fill'
                                          priority
                                          className='absolute object-contain rounded-md'
                                    />
                              </div>
                        </div>
                        {/* title, description and quantity buttons */}
                        <div className='flex flex-col sm:flex-row items-center gap-3 max-w-[100%] sm:max-w-[50%] '>
                              <div>
                                    <h1 className='text-lg font-semibold text-gray-800'>{title?.slice(0, 25)} {title?.length > 25 ? "..." : ""}</h1>
                                    <p className='text-sm font-semibold text-gray-600'>{description?.slice(0, 50)}{description?.length > 50 ? "..." : ""}</p>
                                    <button onClick={() => removeHandler()} className='btn_primary bg-red-500 mt-4 p-1 text-sm'>
                                          <FontAwesomeIcon
                                                icon={faTrashCan}
                                          />
                                          {" "}Remove
                                    </button>
                              </div>
                              {/* quantity */}
                              <div>

                                    <div className='flex items-center w-fit border border-gray-400 rounded-sm'>
                                          <button onClick={() => handleIncrement()} className='py-1 px-2 bg-gray-200 border-r border-gray-400 text-xs'>
                                                <FontAwesomeIcon
                                                      icon={faPlus}
                                                />
                                          </button>
                                          <input type="text" value={quantityInput} onChange={handleQuantity} className='w-[50px] px-1 text-center outline-none' onBlur={handleQuantityBlur} />
                                          <button onClick={() => handleDecrement()} className='py-1 px-2 bg-gray-200 border-l border-gray-400 text-xs'>
                                                <FontAwesomeIcon
                                                      icon={faMinus}
                                                />
                                          </button>
                                    </div>
                                    {
                                          quantityInput == stock &&
                                          <p className='text-xs text-red-500 font-semibold text-center'>Stock limit to {stock}</p>
                                    }
                              </div>
                        </div>
                  </div>
                  {/* price */}
                  <div className='text-center'>
                        <h4 className='whitespace-nowrap text-lg font-semibold text-gray-800'>{thousandFormate(price * +quantity)} Tk.</h4>
                        <h4 className='whitespace-nowrap text-base font-semibold text-orange-500'><del>{thousandFormate(+original_price * +quantity)} Tk.</del></h4>
                  </div>
            </div>
      );
};

export default CartLeftBottomAreaItem;