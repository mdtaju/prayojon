import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SidebarMultipleItem = ({ Icon, title, options }) => {
      const [toggle, setToggle] = useState(false);
      const router = useRouter();

      // for expand sidebar multiple items
      useEffect(() => {
            options?.map((item) => {
                  if (item?.link === router?.pathname) {
                        setToggle(true);
                  }
            })
      }, [router, options]);

      return (
            <li className='p-2 flex flex-col gap-3 text-base font-semibold text-gray-800 cursor-pointer border-b border-gray-300 hover:bg-gray-100'>
                  {/* top header container */}
                  <div onClick={() => setToggle((prevState) => !prevState)} className='flex items-center justify-between gap-3 select-none'>
                        <div className='flex items-center gap-3'>
                              <FontAwesomeIcon
                                    icon={Icon}
                                    className='text-orange-500'
                              />
                              <span>{title}</span>
                        </div>
                        <div>
                              <FontAwesomeIcon
                                    icon={toggle ? faSortUp : faSortDown}
                                    className='text-sm'
                              />
                        </div>
                  </div>
                  {/* expand options */}
                  <div className={`pl-6 ${toggle ? "block" : "hidden"}`}>
                        <ul className='flex flex-col gap-1'>
                              {
                                    options?.map((op, i) => (
                                          <Link key={i} href={op?.link}>
                                                <li className={`${op?.link === router?.pathname ? "dashboard_sidebar_link border-0 bg-primary rounded-md text-white" : "dashboard_sidebar_link border-0"}`}>{op?.name}</li>
                                          </Link>
                                    ))
                              }
                        </ul>
                  </div>

            </li>
      );
};

export default SidebarMultipleItem;