import {
      faBell,
      faCartShopping, faHouse,
      faStore
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/legacy/image';
import React from 'react';
import BtmMenuElement from './BtmMenuElement';
import MenuTabTopSide from './MenuTabTopSide';

const MobileNav = ({ countValue }) => {
      return (
            // Mobile nav container. it's a Inner container of main header tag 
            <div className='block md:hidden w-full h-full py-2 px-3'>
                  {/* Top header include search and menu tab */}
                  <div className='h-1/2 flex items-center justify-between'>
                        <div className='relative w-[120px] h-[80px]'>
                              <Image
                                    src={"/images/logo-full.svg"}
                                    alt='logo'
                                    layout='fill'
                                    className='object-contain'
                              />
                        </div>
                        <div className='h-full flex items-center gap-4'>
                              {/* search component. In this component include all search functionality and search drawer */}
                              {/* <SearchTopSide /> */}
                              {/* menu component. In this component include all profile related menus */}
                              <MenuTabTopSide />
                        </div>
                  </div>
                  {/* Bottom menu bar */}
                  <div className='h-1/2 w-full grid grid-cols-4 gap-2 mt-1'>
                        <BtmMenuElement
                              Icon={faHouse}
                              activeLink={"/"}
                        />
                        {/* <BtmMenuElement
                              Icon={faTv}
                              activeLink={"/watch"}
                        /> */}
                        <BtmMenuElement
                              Icon={faStore}
                              activeLink={"/marketplace"}
                        />
                        <BtmMenuElement
                              Icon={faCartShopping}
                              activeLink={"/cart"}
                        />
                        <BtmMenuElement
                              Icon={faBell}
                              activeLink={"/notification"}
                              countValue={countValue}
                        />
                        {/* <BtmMenuElement
                              Icon={faMessage}
                              activeLink={"/messages"}
                        /> */}
                  </div>
            </div>
      );
};

export default MobileNav;