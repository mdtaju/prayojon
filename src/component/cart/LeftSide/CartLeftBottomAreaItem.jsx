import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from '@mui/material';
import Image from 'next/legacy/image';
import React, { Suspense, useState } from 'react';
import { useCartColorUpdateMutation, useCartRemoveMutation, useCartUpdateQuantityMutation } from '../../../features/cart/cartApi';
import thousandFormate from '../../../utils/thousandFormate';

const CartLeftBottomAreaItem = ({ item = {} }) => {
      const { cart_id, image, title, description, price, quantity, stock, original_price, colors = [], color = "" } = item;
      const [checked, setChecked] = useState(true);
      const [quantityInput, setQuantityInput] = useState(quantity);
      const [cartUpdateQuantity] = useCartUpdateQuantityMutation();
      const [cartRemove] = useCartRemoveMutation();
      const [cartColorUpdate] = useCartColorUpdateMutation();
      const [selectedColor, setSelectedColor] = useState(color ? color : "");

      // color selection 
      const handleColorChange = (e) => {
            cartColorUpdate({ cart_id, color: e.target.value })
            setSelectedColor(e.target.value);
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
                                    <Suspense fallback={<Skeleton variant="rectangular"
                                          width="100%"
                                          height="100%" />}>
                                          <Image
                                                src={image}
                                                alt='watch'
                                                layout='fill'
                                                priority
                                                className='absolute object-contain rounded-md'
                                          />
                                    </Suspense>
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
                                          <span className='w-[50px] px-1 text-center'>
                                                {quantityInput}
                                          </span>
                                          {/* <input type="text" value={quantityInput} onChange={handleQuantity} className='w-[50px] px-1 text-center outline-none' onBlur={handleQuantityBlur} /> */}
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
                                    {
                                          colors?.length > 0 &&
                                          <select name="" id="" value={selectedColor} onChange={handleColorChange} className='px-2 py-1 border border-gray-500 text-xs font-medium rounded-md mt-2 outline-none'>
                                                <option value="" disabled>Select a color</option>
                                                {
                                                      colors.map((color, i) => (
                                                            <option key={i} value={color}>{color}</option>
                                                      ))
                                                }
                                          </select>
                                    }
                              </div>
                        </div>
                  </div>
                  {/* price */}
                  <div className='text-center'>
                        {
                              thousandFormate(+price) === thousandFormate(+original_price) ?
                                    <h4 className='whitespace-nowrap text-lg font-semibold text-gray-800'>{thousandFormate(price * +quantity)} BDT.</h4> :
                                    <>
                                          <h4 className='whitespace-nowrap text-lg font-semibold text-gray-800'>{thousandFormate(price * +quantity)} BDT.</h4>
                                          <h4 className='whitespace-nowrap text-base font-semibold text-orange-500'><del>{thousandFormate(+original_price * +quantity)} BDT.</del></h4>
                                    </>
                        }
                  </div>
            </div>
      );
};

export default CartLeftBottomAreaItem;