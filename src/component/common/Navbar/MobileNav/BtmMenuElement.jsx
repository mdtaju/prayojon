import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BtmMenuElement = ({ Icon, activeLink }) => {
      const router = useRouter();
      return (
            <Link href={activeLink}>
                  <div className='h-full p-1 grid place-items-center'>
                        <FontAwesomeIcon
                              className={`${router.pathname === activeLink ? "text-blue-600" : "text-gray-600"}  text-base`}
                              icon={Icon}
                        />
                  </div>
            </Link>
      );
};

export default BtmMenuElement;