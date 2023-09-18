import React from 'react';

const Condition = ({ filters, setFilters }) => {

      const handleChange = (event) => {
            const { name, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  type: checked ? [...prevState.type, name] : prevState.type.filter((item) => item !== name),
            }));
      }

      return (
            <div className='mt-2 pb-2 border-b border-gray-300'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Type</h1>
                  <label className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='New' checked={filters.type.includes("New")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>New</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Old' checked={filters.type.includes("Old")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Old</span>
                  </label>
            </div>
      );
};

export default Condition;