import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const SearchTopSide = () => {
      return (
            <div className='nav_icon_round_btn'>
                  <FontAwesomeIcon
                        className="text-gray-600 text-base"
                        icon={faMagnifyingGlass}
                  />
            </div>
      );
};

export default SearchTopSide;