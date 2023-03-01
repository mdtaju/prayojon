import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const HomeLeftOptionChild = ({ Icon, title }) => {
      return (
            <div className='p-4 py-3 flex items-center gap-2 bg-transparent hover:bg-gray-300 rounded-md cursor-pointer transition-all duration-150'>
                  <FontAwesomeIcon
                        icon={Icon}
                        className="text-[22px] w-6 h-6 text-primary px-[3px]"
                  />
                  <span className='text-base text-gray-900 font-semibold'>{title}</span>
            </div>
      );
};

export default HomeLeftOptionChild;