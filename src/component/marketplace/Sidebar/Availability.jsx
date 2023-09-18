import React from 'react';

const Availability = ({ filters, setFilters }) => {

      const handleChange = (event) => {
            const { name, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  availability: checked ? [...prevState.availability, name] : prevState.availability.filter((item) => item !== name),
            }));
      }

      return (
            <div className='mt-2 pb-2 border-b border-gray-300'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Availability</h1>
                  <label className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='In-Stock' checked={filters.availability.includes("In-Stock")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>In Stock</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Stock-Out' checked={filters.availability.includes("Stock-Out")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Stock Out</span>
                  </label>
            </div>
      );
};

export default Availability;