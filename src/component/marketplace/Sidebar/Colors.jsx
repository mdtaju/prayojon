import React from 'react';

const ColorType = ({ filters, setFilters }) => {

      const handleChange = (event) => {
            const { name, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  colorType: checked ? [...prevState.colorType, name] : prevState.colorType.filter((item) => item !== name),
            }));
      }

      return (
            <div className='mt-2 pb-2 border-b border-gray-300'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Colors</h1>
                  <label className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name="Black" checked={filters.colorType.includes("Black")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Black</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='White' checked={filters.colorType.includes("White")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>White</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Blue' checked={filters.colorType.includes("Blue")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Blue</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Red' checked={filters.colorType.includes("Red")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Red</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Green' checked={filters.colorType.includes("Green")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Green</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Pink' checked={filters.colorType.includes("Pink")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Pink</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Yellow' checked={filters.colorType.includes("Yellow")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Yellow</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Orange' checked={filters.colorType.includes("Orange")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Orange</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Purple' checked={filters.colorType.includes("Purple")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Purple</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Brown' checked={filters.colorType.includes("Brown")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Brown</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Gray' checked={filters.colorType.includes("Gray")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Gray</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Gold' checked={filters.colorType.includes("Gold")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Gold</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Silver' checked={filters.colorType.includes("Silver")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Silver</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Lime' checked={filters.colorType.includes("Lime")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Lime</span>
                  </label>
                  <label className='flex items-center select-none cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                        <input type="checkbox" className='w-[16px] h-[16px]' name='Others' checked={filters.colorType.includes("Others")} onChange={handleChange} />
                        <span className='pl-2 text-sm font-medium'>Others</span>
                  </label>
            </div>
      );
};

export default ColorType;