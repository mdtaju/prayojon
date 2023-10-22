import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axiosInstance from '../../../../config/axios';
import { setQuery, setResults } from '../../../../features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '../../../../reduxStore/reduxHooks';
import thousandFormate from '../../../../utils/thousandFormate';
const CustomPopper = dynamic(() => import('../../CustomPopper'), {
      ssr: false,
})
const NavLeftElement = () => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();
      const [searchPop, setSearchPop] = useState(false);
      const dispatch = useAppDispatch();
      const searchResult = useAppSelector(state => state.search);

      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };

      const handleChange = async (e) => {
            const value = e.target.value;
            dispatch(setQuery(value));
            const res = await axiosInstance.get(`/user_search?query=${e.target.value}`);
            dispatch(setResults(res.data));
      }

      return (
            <>
                  <div className={`w-[300px] max-h-[calc(100vh-120px)] overflow-y-scroll fixed top-1 left-1 z-50 bg-white border border-gray-400 rounded-md transform translate-y-2 ${searchPop ? "visible translate-y-0 transition-all duration-200" : "invisible"}`}>
                        <div className='flex items-center justify-between px-4 py-2 border-b border-gray-300 mb-2'>
                              <h1>Search</h1>
                              <FontAwesomeIcon onClick={() => setSearchPop(false)} icon={faArrowRight} className='p-1 cursor-pointer' />
                        </div>
                        <div className='px-4 py-2'>
                              <div className='flex items-center justify-between gap-3 w-full pl-4 border border-gray-400 rounded-full'>
                                    <input onChange={handleChange} value={searchResult.query} type="text" className='outline-none py-1' placeholder='search your favorite' />
                                    <div className='px-4 h-full py-1 rounded-r-full bg-orange-400 cursor-pointer'>
                                          <FontAwesomeIcon icon={faMagnifyingGlass} className='' />
                                    </div>
                              </div>
                        </div>
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
                                                                  <Image
                                                                        src={product?.file}
                                                                        alt='product_file'
                                                                        width={80}
                                                                        height={60}
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
                  </div>
                  {/* logo */}
                  <Link href={"/"}>
                        <Image src={"/images/logo-full.svg"} alt="logo" width={129} height={30} />
                  </Link>
                  {/* search icon button and input */}
                  <div onClick={() => setSearchPop(true)} className="w-fit flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
                        <FontAwesomeIcon
                              className="text-gray-400 text-base"
                              icon={faMagnifyingGlass}
                        />
                        {/* <input className="outline-none border-none bg-transparent placeholder:text-gray-500 font-medium placeholder:font-normal" placeholder="Search prayojon" type="text" /> */}
                  </div>
            </>
      );
};

export default NavLeftElement;