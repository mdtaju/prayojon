import React from 'react';

const Categories = ({ filters, setFilters }) => {

      const handleChange = (event) => {
            const { value, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  categories: value,
                  subCategories: []
                  // categories: checked ? [...prevState.categories, name] : prevState.categories.filter((item) => item !== name),
            }));
      }

      return (
            <div className='mt-2 pb-2 border-b border-gray-300'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Categories</h1>
                  <label className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Electronics"} checked={filters.categories === "Electronics"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Electronics</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Fashion"} checked={filters.categories === "Fashion"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Fashion</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Home & Garden"} checked={filters.categories === "Home & Garden"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Home & Garden</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Vehaicle"} checked={filters.categories === "Vehaicle"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Vehaicle</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Health & Beauty"} checked={filters.categories === "Health & Beauty"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Health & Beauty</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Business Office & Industrial"} checked={filters.categories === "Business Office & Industrial"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Business Office & Industrial</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Sporting"} checked={filters.categories === "Sporting"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Sporting</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="radio" className='w-[16px] h-[16px]' name='categories' value={"Toyes & Games"} checked={filters.categories === "Toyes & Games"} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Toyes & Games</span>
                  </label>
            </div>
      );
};

export default Categories;