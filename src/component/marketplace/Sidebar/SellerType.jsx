import React from 'react';

const SellerType = ({ filters, setFilters }) => {

      const handleChange = (event) => {
            const { name, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  sort: checked ? [...prevState.sort, name] : prevState.sort.filter((item) => item !== name),
            }));
      }

      return (
            <div className='mt-2 pb-2 border-b border-gray-300'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Sort</h1>
                  <label className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name="top_seller" checked={filters.sort.includes("top_seller")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Top Seller</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='new_seller' checked={filters.sort.includes("new_seller")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>New Seller</span>
                  </label>
            </div>
      );
};

export default SellerType;