import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const TitleArea = ({ title, subtitle, Icon }) => {
      return (
            <div className='flex flex-col sm:flex-row items-center gap-4 opacity-90'>
                  <div className='py-4 px-6 bg-white shadow-md rounded-sm'>
                        <FontAwesomeIcon
                              className='text-xl text-orange-500 font-bold'
                              icon={Icon}
                        />
                  </div>
                  <div>
                        <h1 className='text-2xl font-medium text-gray-800'>{title}</h1>
                        <h4 className='text-sm font-semibold text-gray-800'>{subtitle}</h4>
                  </div>
            </div>
      );
};

export default TitleArea;