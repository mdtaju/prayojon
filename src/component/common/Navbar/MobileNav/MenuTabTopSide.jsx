import { faArrowLeft, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dialog, DialogContent } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import axiosInstance from '../../../../config/axios';
import { setQuery, setResults } from '../../../../features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '../../../../reduxStore/reduxHooks';
import thousandFormate from '../../../../utils/thousandFormate';
import HomeLeftNavigation from '../../../Home/HomeLeftNavigation/HomeLeftNavigation';

const MenuTabTopSide = () => {
      const [open, setOpen] = useState(false);
      const dispatch = useAppDispatch();
      const searchResult = useAppSelector(state => state.search);
      const handleClose = () => {
            setOpen(false);
      };

      const handleChange = async (e) => {
            const value = e.target.value;
            dispatch(setQuery(value));
            const res = await axiosInstance.get(`/user_search?query=${e.target.value}`);
            dispatch(setResults(res.data));
      }
      return (
            <>
                  {/* content in dialog */}
                  <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        fullScreen
                  >
                        {/* post header component include title and avatar */}
                        <div className='flex items-center justify-between px-4 py-2 gap-2 border-b border-gray-400'>
                              <button
                                    className='p-2'
                                    onClick={() => setOpen(false)}>
                                    <FontAwesomeIcon
                                          className="text-gray-600 text-lg"
                                          icon={faArrowLeft}
                                    />
                              </button>
                              <div className="w-fit flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                                    <FontAwesomeIcon
                                          className="text-gray-400 text-base"
                                          icon={faMagnifyingGlass}
                                    />
                                    <input onChange={handleChange} value={searchResult.query} className="outline-none border-none bg-transparent placeholder:text-gray-500 font-medium placeholder:font-normal" placeholder="Search prayojon" type="text" />
                              </div>
                        </div>

                        <DialogContent
                              sx={{ padding: '5px' }}
                        >
                              {/* products and people suggestions */}
                              {/* suggestions */}
                              <div className='w-full h-auto px-3 py-2'>
                                    <h1 className='text-sm font-bold mb-2'>Products</h1>
                                    {
                                          searchResult?.results?.products?.length === 0 &&
                                          <p className='text-center my-3 font-bold text-base text-gray-400'>No Products Found</p>
                                    }
                                    <div className='flex flex-col gap-2  mb-2'>
                                          {
                                                searchResult?.results?.products?.map((product, i) => (
                                                      <Link href={`/marketplace/${product?.product_id}`} target='_blank' key={i} className='w-full'>
                                                            <div className='w-full p-2 bg-gray-100 rounded-md flex items-start gap-4 shadow-sm'>
                                                                  <div className='w-[80px] h-[60px]'>
                                                                        <img
                                                                              src={product?.file}
                                                                              alt='product_file'
                                                                              // width={80}
                                                                              // height={60}
                                                                              className='w-full h-full object-cover object-center rounded-md'
                                                                        />
                                                                  </div>
                                                                  <div className='w-[calc(100%-96px)]'>
                                                                        <h1 className='truncate text-sm font-bold text-gray-800'>{product?.product_title}</h1>
                                                                        <p className='text-sm font-semibold text-orange-500'>Price: {thousandFormate(+product?.price)}</p>
                                                                        <p className='text-sm font-semibold'>{product?.status}</p>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                ))
                                          }
                                    </div>
                                    <h1 className='text-sm font-bold mb-2'>People</h1>
                                    {
                                          searchResult?.results?.users?.length === 0 &&
                                          <p className='text-center my-3 font-bold text-base text-gray-400'>No People Found</p>
                                    }
                                    <div className='flex flex-col gap-2 mb-2'>
                                          {
                                                searchResult?.results?.users?.map((user, i) => (
                                                      <Link href={`/profile/${user?.id}`} target='_blank' key={i} className='w-full'>
                                                            <div className='w-full p-2 bg-gray-100 rounded-md flex items-start gap-4 shadow-sm'>
                                                                  <Avatar
                                                                        alt="Remy Sharp"
                                                                        src={user?.photo_url}
                                                                        sx={{ width: 36, height: 36 }}
                                                                  />
                                                                  <div className='w-[calc(100%-96px)]'>
                                                                        <h1 className='truncate text-sm font-bold text-gray-800'>{user?.name}</h1>
                                                                        <p className='text-sm font-semibold text-gray-600'>{user?.profession}</p>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                ))
                                          }
                                    </div>
                              </div>
                              {/* post content component include product price, text, emoji and images */}
                              <HomeLeftNavigation
                              />
                        </DialogContent>
                  </Dialog>

                  {/* tree line menu */}
                  <div
                        onClick={() => setOpen(true)}
                        className='nav_icon_round_btn'>
                        <FontAwesomeIcon
                              className="text-gray-600 text-base"
                              icon={faBars}
                        />
                  </div>
            </>
      );
};

export default MenuTabTopSide;