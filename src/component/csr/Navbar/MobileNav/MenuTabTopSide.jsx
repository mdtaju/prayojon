import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const MenuTabTopSide = () => {
      return (
            <div className='nav_icon_round_btn'>
                  <FontAwesomeIcon
                        className="text-gray-600 text-base"
                        icon={faBars}
                  />
            </div>
      );
};

export default MenuTabTopSide;