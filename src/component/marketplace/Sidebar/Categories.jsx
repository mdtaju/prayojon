import React from 'react';

const Categories = ({ filters, setFilters }) => {

      const handleChange = (event) => {
            const { name, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  categories: checked ? [...prevState.categories, name] : prevState.categories.filter((item) => item !== name),
            }));
      }

      return (
            <div className='mt-2 pb-2'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Categories</h1>
                  <label className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Electronics' checked={filters.categories.includes("Electronics")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Electronics</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Fashion' checked={filters.categories.includes("Fashion")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Fashion</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Home & Garden' checked={filters.categories.includes("Home & Garden")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Home & Garden</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Vehaicle' checked={filters.categories.includes("Vehaicle")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Vehaicle</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Jewllery & Watches' checked={filters.categories.includes("Jewllery & Watches")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Jewllery & Watches</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Health & Beauty' checked={filters.categories.includes("Health & Beauty")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Health & Beauty</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Business Office & Industrial' checked={filters.categories.includes("Business Office & Industrial")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Business Office & Industrial</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Sporting' checked={filters.categories.includes("Sporting")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Sporting</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Toyes & Games' checked={filters.categories.includes("Toyes & Games")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Toyes & Games</span>
                  </label>
            </div>
      );
};

export default Categories;