import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const HomeLeftOptionChild = ({ Icon, title, link }) => {
      return (
            <Link href={link}>
                  <div className='mt-2 flex items-center gap-2 common_shadow py-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-150'>
                        <FontAwesomeIcon
                              icon={Icon}
                              className="text-[22px] w-6 h-6 text-primary px-[3px]"
                        />
                        <span className='text-base text-gray-800 font-semibold'>{title}</span>
                  </div>
            </Link>
      );
};

export default HomeLeftOptionChild;