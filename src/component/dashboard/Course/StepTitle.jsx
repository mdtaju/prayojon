import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const StepTitle = ({ title, Icon }) => {
      return (
            <div className='w-fit px-4 py-2 dashboard_cart_shadow flex items-center gap-4 rounded-full mx-auto mt-6 text-base text-gray-700 font-bold'>
                  <h1>{title}</h1>
                  <FontAwesomeIcon
                        className='text-orange-500'
                        icon={Icon}
                  />
            </div>
      );
};

export default StepTitle;