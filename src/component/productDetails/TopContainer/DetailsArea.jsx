import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAddCartItemMutation, useGetCartItemsQuery } from '../../../features/cart/cartApi';
import thousandFormate from "../../../utils/thousandFormate";
const DetailsArea = ({
      id,
      title,
      color,
      originalPrice,
      price,
      location,
      quantity,
      condition,
      sales,
      reviews,
      ram,
      rom
}) => {
      const { data: session } = useSession();
      const [addCartItem] = useAddCartItemMutation();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      const [isAdded, setIsAdded] = useState(false);
      const [totalQuantity, setTotalQuantity] = useState(1);
      const router = useRouter();
      const [rating, setRating] = useState(0);
      const [selectedColor, setSelectedColor] = useState("");

      // rating calculate 
      useEffect(() => {
            if (reviews?.length) {
                  let avgRating = 0;
                  reviews.forEach((rate) => {
                        avgRating += rate.total_avg_rating;
                  });
                  setRating(avgRating / reviews.length);
            }
      }, [reviews])

      useEffect(() => {
            if (cartItems?.length !== 0) {
                  const getItem = cartItems?.find(p => p.product_id === id?.toString());
                  if (getItem) {
                        setIsAdded(true);
                        setTotalQuantity(+getItem?.quantity || 1)
                  }
            }
      }, [cartItems, id]);
      // console.log(cartItems)
      const handleAddToCart = () => {
            if (session) {
                  const data = {
                        product_id: id,
                        user_id: session?.user?.email,
                        amount: price,
                        quantity: totalQuantity,
                        color: selectedColor
                  }
                  addCartItem(data).unwrap().then((data) => {
                        router.push("/cart");
                  }).catch((err) => {
                        console.log(err)
                  })
            } else {
                  alert("please login first")
            }
      }

      // quantity update handler 
      const handleIncrement = () => {
            if (+totalQuantity < +quantity) {
                  setTotalQuantity((prevCount) => +prevCount + 1);
            }
      }
      return (
            <div className='flex-1 px-3 py-2'>
                  <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>
                  {
                        rating > 0 &&
                        <div className='mt-1'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={rating}
                                    readOnly
                                    size="small"
                              />
                        </div>
                  }
                  <div className='h-[1px] bg-gray-300 w-full mt-2'></div>

                  <div className='mt-3'>
                        <p className='text-base font-medium text-gray-700'>Condition: {condition}</p>
                        {
                              color &&
                              <p className='text-base font-medium text-gray-700'>Color: {color}</p>
                        }
                        {
                              ram &&
                              <p className='text-base font-medium text-gray-700'>Ram: {ram}</p>
                        }
                        {
                              rom &&
                              <p className='text-base font-medium text-gray-700'>Rom: {rom}</p>
                        }
                        <p className='text-base font-medium text-gray-700'>Location: {location}</p>
                  </div>
                  {
                        thousandFormate(+originalPrice) === thousandFormate(+price) ?
                              <div className='mt-4 text-gray-700 font-medium'>
                                    <p className='text-base'>Price: <span className='text-3xl text-gray-800 font-semibold'>{`${thousandFormate(+price)} BDT`}</span></p>
                              </div> :
                              <div className='mt-4 text-gray-700 font-medium'>
                                    <p className='text-base'>Current Price: <span className='text-3xl text-gray-800 font-semibold'>{`${thousandFormate(+price)} BDT`}</span></p>
                                    <p className='text-base'>Regular Price: <del>{`${thousandFormate(+originalPrice)} BDT`}/-</del></p>
                                    <p className='text-base font-medium text-gray-700'>{quantity} products available in stock</p>
                              </div>
                  }
                  <div className='text-sm font-medium'>
                        {
                              sales ?
                                    <span>{`sales ${sales} times`}</span> :
                                    <span>No sales yet</span>
                        }
                  </div>
                  {/* quantity start */}
                  <div className='flex items-center w-fit border border-gray-400 rounded-sm mt-4'>
                        {/* increment */}
                        <button onClick={() => handleIncrement()} className='py-1 px-2 bg-gray-200 border-r border-gray-400 text-xs'>
                              <FontAwesomeIcon
                                    icon={faPlus}
                              />
                        </button>
                        <span className='w-[50px] px-1 text-center'>
                              {totalQuantity}
                        </span>
                        <button onClick={() => setTotalQuantity((prevTotal) => {
                              if (prevTotal > 1) {
                                    return prevTotal - 1
                              } else {
                                    return 1
                              }
                        })} className='py-1 px-2 bg-gray-200 border-l border-gray-400 text-xs'>
                              <FontAwesomeIcon
                                    icon={faMinus}
                              />
                        </button>
                  </div>
                  {/* quantity end */}
                  {
                        color?.length > 0 &&
                        <select name="" id="" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className='px-2 py-1 border border-gray-500 text-xs font-medium rounded-md mt-2 outline-none'>
                              <option value="" disabled>Select a color</option>
                              {
                                    color?.split(",")?.map((clr, i) => (
                                          <option key={i} value={clr}>{clr}</option>
                                    ))
                              }
                        </select>
                  }
                  <div onClick={handleAddToCart} className='grid place-items-center w-fit mt-3'>
                        <div className={`group border border-orange-500 w-16 h-8 grid place-items-center rounded-full cursor-pointer active:scale-95 duration-150 hover:bg-orange-500 ${isAdded ? "bg-orange-500" : ""}`}>
                              <FontAwesomeIcon className={`group-hover:text-white ${isAdded ? "text-white" : "text-orange-500"}`} icon={faCartPlus} />
                        </div>
                  </div>

            </div>
      );
};

export default DetailsArea;