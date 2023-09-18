import { faAngleLeft, faAngleRight, faBangladeshiTakaSign, faBox, faBoxOpen, faCartPlus, faClose, faLocationDot, faMoneyBill, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import React, { memo, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useAddCartItemMutation, useGetCartItemsQuery } from '../../../features/cart/cartApi';
import { useGetUPostsImagesQuery } from '../../../features/userPost/userPostApi';
import useWindowSize from '../../../hook/useWindowSize';
import thousandFormate from '../../../utils/thousandFormate';


const ProductCard = ({ product = {}, isDialogStay }) => {
      const { id, product_id, product_title, description, price, original_price, status, category, location, sales } = product;
      const [isAdded, setIsAdded] = useState(false);
      const [open, setOpen] = useState(false);
      const windowSize = useWindowSize();
      const { data: fileData, isLoading, isError, error } = useGetUPostsImagesQuery();
      const [images, setImages] = useState([]);
      const [imgUrl, setImgUrl] = useState({
            imgLink: "",
            imgIndex: ""
      });
      const moneyFormate = thousandFormate;
      const { data: session } = useSession();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      const [addCartItem, { data: cartData }] = useAddCartItemMutation();

      // to check is items added in the cart
      useEffect(() => {
            if (cartItems?.length !== 0) {
                  const getItem = cartItems?.find(p => p.product_id === id?.toString());
                  if (getItem) {
                        setIsAdded(true);
                  }
            }
      }, [cartItems, id])

      // getting the files 
      useEffect(() => {
            if (fileData) {
                  const getImages = fileData.filter((i) => i.post_id == id && i.post_type === "Product");
                  setImages(getImages);
                  setImgUrl((prevState) => {
                        return {
                              ...prevState,
                              imgIndex: 0,
                              imgLink: getImages[0]?.file_path
                        }
                  })
            }
      }, [fileData, id])

      // handle dialog open 
      const handleOpen = () => {
            setOpen(true);
      }

      // handle dialog close 
      const handleClose = () => {
            setOpen(false);
      };

      // add to cart handler 
      const handleAddToCart = () => {
            const data = {
                  product_id: id,
                  user_id: session?.user?.email,
                  amount: price
            }
            if (session?.user?.email) {
                  addCartItem(data);
            } else {
                  alert("Please login your account.")
            }
      }

      // dialog open image right arrow button 
      const handleImgIncrement = () => {
            setImgUrl((prevState) => {
                  const getItem = images.find((item, i) => i === prevState.imgIndex + 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              imgIndex: prevState.imgIndex + 1,
                              imgLink: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      // dialog open image left arrow button 
      const handleImgDecrement = () => {
            setImgUrl((prevState) => {
                  const getItem = images.find((item, i) => i === prevState.imgIndex - 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              imgIndex: prevState.imgIndex - 1,
                              imgLink: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }
      return (
            <div className='dashboard_cart_shadow rounded-md'>

                  <Dialog
                        open={open}
                        onClose={handleClose}
                        fullScreen={windowSize.width > 768 ? false : true}
                        PaperProps={windowSize.width > 768 ?
                              {
                                    style: {
                                          borderRadius: '10px',
                                          width: '700px',
                                          height: "90vh",
                                          backgroundColor: "#fff"
                                    }
                              } :
                              {}
                        }
                  >
                        <div className='p-2'>
                              {/* conditionally player or image */}
                              <div className='h-[300px] w-full relative bg-black rounded-t-md'>
                                    {/* close button */}
                                    <button onClick={() => setOpen(false)} className='absolute right-0 top-0 w-[35px] h-[35px] bg-red-500 rounded-full text-white cursor-pointer z-10'>
                                          <FontAwesomeIcon
                                                icon={faClose}
                                          />
                                    </button>
                                    {
                                          open && <>
                                                {
                                                      ((imgUrl?.imgLink?.split(".")?.pop() === "mp4") || (imgUrl?.imgLink?.split(".")?.pop() === "mkv") || (imgUrl?.imgLink?.split(".")?.pop() === "ts")) ?
                                                            <ReactPlayer
                                                                  width={"100%"}
                                                                  height={"100%"}
                                                                  url={imgUrl?.imgLink}
                                                                  controls
                                                                  playing={true}
                                                            /> :
                                                            <Image
                                                                  src={imgUrl?.imgLink}
                                                                  layout="fill"
                                                                  alt='post-img'
                                                                  className='object-contain rounded-md'
                                                            />
                                                }
                                          </>
                                    }
                              </div>
                              {/* image change buttons container */}
                              <div className='mt-2 w-fit mx-auto flex items-center gap-4'>
                                    {/* img decrement button */}
                                    <button onClick={handleImgDecrement} className=' bg-orange-500 text-white w-[25px] h-[25px] grid place-items-center rounded-full'>
                                          <FontAwesomeIcon
                                                icon={faAngleLeft}
                                                className='text-xs font-bold'
                                          />
                                    </button>
                                    {/* img increment button */}
                                    <button onClick={handleImgIncrement} className=' bg-orange-500 text-white w-[25px] h-[25px] grid place-items-center rounded-full'>
                                          <FontAwesomeIcon
                                                icon={faAngleRight}
                                                className='text-xs font-bold'
                                          />
                                    </button>
                              </div>
                              {/* info container */}
                              <div className='mt-2 p-2'>
                                    <h1 className='text-lg font-bold text-gray-800 text-center'>
                                          {product_title}
                                    </h1>
                                    <p className='text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, tenetur! Corrupti facilis autem esse modi deleniti nihil libero rerum quae! {description}</p>
                                    {/* location and category container */}
                                    <div className="flex items-center gap-4 w-fit mx-auto">
                                          {/* location */}
                                          <div className='flex items-center gap-2 mt-1 text-gray-500'>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faLocationDot}
                                                      />
                                                </div>
                                                <span>{location}</span>
                                          </div>
                                          {/* category */}
                                          <div className='flex items-center gap-2 text-gray-500'>
                                                <div>
                                                      <FontAwesomeIcon
                                                            icon={faBoxOpen}
                                                      />
                                                </div>
                                                <span>{category}</span>
                                          </div>
                                    </div>
                                    {/* bottom part container */}
                                    <div className='w-full mt-3 border-t border-gray-300'>
                                          {/* status part with four buttons */}
                                          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 items-center'>
                                                {/* Price */}
                                                <div className='flex flex-col items-center'>
                                                      <div className='flex items-center gap-2'>
                                                            <FontAwesomeIcon className='text-green-500' icon={faMoneyBill} />
                                                            <span className='font-medium'>Price</span>
                                                      </div>
                                                      <span className='text-xs text-orange-500 font-semibold'><del><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {moneyFormate(+original_price)}</del></span>
                                                      <span className='text-gray-500 text-sm'><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {moneyFormate(+price)}</span>
                                                </div>
                                                {/* Type */}
                                                <div className='flex flex-col items-center'>
                                                      <div className='flex items-center gap-2'>
                                                            <FontAwesomeIcon className='text-orange-500' icon={faTag} />
                                                            <span className='font-medium'>Type</span>
                                                      </div>
                                                      <span className='text-gray-500'>New</span>
                                                </div>
                                                {/* status */}
                                                <div className='flex flex-col items-center'>
                                                      <div className='flex items-center gap-2'>
                                                            <FontAwesomeIcon className='text-primary' icon={faBox} />
                                                            <span className='font-medium'>Status</span>
                                                      </div>
                                                      <div className='px-3 py-1 bg-green-500 rounded-md'>
                                                            <p className='text-white text-xs font-bold'>{status}</p>
                                                      </div>
                                                </div>
                                                {/* cart button */}
                                                {
                                                      isDialogStay &&
                                                      <div onClick={handleAddToCart} className='grid place-items-center'>
                                                            <div className={`group border border-orange-500 w-16 h-8 grid place-items-center rounded-full cursor-pointer active:scale-95 duration-150 hover:bg-orange-500 ${isAdded ? "bg-orange-500" : ""}`}>
                                                                  <FontAwesomeIcon className={`group-hover:text-white ${isAdded ? "text-white" : "text-orange-500"}`} icon={faCartPlus} />
                                                                  {/* <span className='font-medium'>Add+</span> */}
                                                            </div>
                                                      </div>
                                                }
                                          </div>
                                          {/* bottom action bar */}
                                          <div></div>
                                    </div>
                              </div>
                        </div>
                  </Dialog>

                  {/* image container */}
                  <div className='group w-full h-[150px] relative rounded-t-md border-b border-gray-300'>
                        {
                              ((imgUrl?.imgLink?.split(".")?.pop() === "mp4") || (imgUrl?.imgLink?.split(".")?.pop() === "mkv") || (imgUrl?.imgLink?.split(".")?.pop() === "ts")) ?
                                    <ReactPlayer
                                          width={"100%"}
                                          height={"100%"}
                                          url={imgUrl?.imgLink}
                                          controls
                                          playing={true}
                                    /> :
                                    <Image
                                          src={imgUrl?.imgLink}
                                          alt='product'
                                          layout='fill'
                                          className='object-cover object-center rounded-t-md'
                                    />
                        }

                        {/* left button */}
                        <button onClick={handleImgDecrement} className='absolute left-[-7px] group-hover:left-[-12px] top-[50%] translate-y-[-50%] bg-orange-500 text-white w-[25px] h-[25px] grid place-items-center rounded-full invisible group-hover:visible transition-all duration-150'>
                              <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    className='text-xs font-bold'
                              />
                        </button>
                        {/* right button */}
                        <button onClick={handleImgIncrement} className='absolute right-[-7px] group-hover:right-[-12px] top-[50%] translate-y-[-50%] bg-orange-500 text-white w-[25px] h-[25px] grid place-items-center rounded-full invisible group-hover:visible transition-all ease-in duration-150'>
                              <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className='text-xs font-bold'
                              />
                        </button>
                  </div>
                  {/* product description container */}
                  <div className='p-2'>
                        <h1 onClick={handleOpen} className='text-gray-800 text-lg font-semibold cursor-pointer hover:underline'>{product_title?.slice(0, 20)} {product_title?.length >= 20 ? "..." : ""}</h1>
                        <div className='w-fit flex items-center justify-between gap-2'>
                              <h4 className='text-sm font-bold text-orange-500'>Price: <del>{thousandFormate(original_price)}</del></h4>
                              <h4 className='text-sm font-bold text-orange-500'>{thousandFormate(price)} TK.</h4>
                        </div>
                        <div className='w-full h-auto flex items-end justify-between gap-3'>
                              <div>
                                    <h4 className='text-sm font-bold text-gray-500'>{status}</h4>
                                    <h4 className='text-sm font-bold text-gray-500'>{sales ? `Sales ${sales} times` : "No sale yet"}</h4>
                                    <p className='text-gray-600 font-bold text-sm'>SL NO: {product_id}</p>
                              </div>
                              {
                                    isDialogStay &&
                                    <div onClick={handleAddToCart} className='grid place-items-center'>
                                          <div className={`group border border-orange-500 w-8 h-6 grid place-items-center rounded-full cursor-pointer active:scale-95 duration-150 hover:bg-orange-500 ${isAdded ? "bg-orange-500" : ""}`}>
                                                <FontAwesomeIcon className={`group-hover:text-white text-sm ${isAdded ? "text-white" : "text-orange-500"}`} icon={faCartPlus} />
                                                {/* <span className='font-medium'>Add+</span> */}
                                          </div>
                                    </div>
                              }
                        </div>
                  </div>
            </div>
      );
};

export default memo(ProductCard);