import React, { useState } from 'react';
import { RiSearchLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../config/axios';
import { addProductPost } from "../../../features/userPost/userPostSlice";

function SearchBar() {
      const [category, setCategory] = useState("");
      const [searchInput, setSearchInput] = useState("");
      const dispatch = useDispatch();

      const handleSearch = async () => {
            const res = await axiosInstance.post("/marketplace_product", { category, searchInput });
            dispatch(addProductPost(res?.data))
      }

      return (
            <div className='w-full h-[50px] mb-6'>
                  <div className='w-full h-full flex items-center gap-4 bg-white rounded-full shadow-md'>
                        <div className='w-[120px] sm:w-[160px] h-full bg-orange-400 px-2 sm:px-6 rounded-l-full grid place-items-center'>
                              <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)} className='bg-transparent outline-none cursor-pointer w-full h-full font-semibold p-1'>
                                    <option value="" disabled>Categories</option>
                                    <option value={"Electronics"}>Electronics</option>
                                    <option value={"Fashion"}>Fashion</option>
                                    <option value={"Home & Garden"}>Home & Garden</option>
                                    <option value={"Vehaicle"}>Vehaicle</option>
                                    <option value={"Jewllery & Watches"}>
                                          Jewllery & Watches
                                    </option>
                                    <option value={"Health &  Beauty"}>Health & Beauty</option>
                                    <option value={"Business Office & Industrial"}>
                                          Business Office & Industrial
                                    </option>
                                    <option value={"Sporting"}>Sporting</option>
                                    <option value={"Toyes & Games"}>Toyes & Games</option>
                              </select>
                        </div>
                        <div className='h-full flex-1 rounded-r-full flex items-center'>
                              <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder='Search anything' className='h-full w-full p-2 outline-none rounded-r-full' />
                        </div>
                        <div className='p-1 h-full grid place-items-center'>
                              <button onClick={handleSearch} className='bg-gray-200 p-3 rounded-full'>
                                    <RiSearchLine />
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default SearchBar