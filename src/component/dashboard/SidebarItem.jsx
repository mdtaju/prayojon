import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SidebarItem = ({ Icon, title, link }) => {
      const [active, isActive] = useState(false);
      const router = useRouter();

      useEffect(() => {
            if (router?.pathname === link?.toLowerCase()) {
                  isActive(true);
            } else {
                  isActive(false);
            }
      }, [router, link]);
      return (
            <Link href={link}>
                  <li className={`${active ? "p-2 rounded-md flex items-center gap-3 text-base font-semibold hover:bg-primary hover:text-white cursor-pointer border-b hover:border-white bg-primary text-white border-white" : "p-2 hover:rounded-md flex items-center gap-3 text-base font-semibold text-gray-800 hover:bg-primary hover:text-white cursor-pointer border-b border-gray-300 hover:border-white"}`}>
                        <FontAwesomeIcon
                              icon={Icon}
                              className='text-orange-500'
                        />
                        {title}
                  </li>
            </Link>
      );
};

export default SidebarItem;