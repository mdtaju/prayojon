import { Slider } from '@mui/material';
import React from 'react';
import thousandFormate from '../../../utils/thousandFormate';

function valuetext(value) {
      return thousandFormate(value);
}

const PriceRange = ({ margin, filters, setFilters }) => {

      const handleChange = (event, newValue) => {
            setFilters((prevS) => ({
                  ...prevS,
                  priceRange: newValue
            }));
      };
      return (
            <div className={`${margin} pt-2 pb-4 border-b border-gray-300`}>
                  <h1 className='text-lg text-orange-500 font-semibold'>Price Range</h1>
                  <Slider
                        min={0}
                        max={1000000}
                        value={filters?.priceRange}
                        onChange={handleChange}
                        getAriaLabel={() => 'Temperature range'}
                        valueLabelDisplay="auto"
                        valueLabelFormat={valuetext}
                  />
                  <div className='flex items-center justify-between'>
                        <div className='px-2 py-1 border border-gray-400 rounded-sm'>
                              <span className='text-sm font-semibold'>{thousandFormate(filters?.priceRange[0])}</span>
                        </div>
                        <div className='px-2 py-1 border border-gray-400 rounded-sm'>
                              <span className='text-sm font-semibold'>{thousandFormate(filters?.priceRange[1])}</span>
                        </div>
                  </div>
            </div>
      );
};

export default PriceRange;