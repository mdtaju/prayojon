import React from 'react';
import useWindowSize from '../../../hook/useWindowSize';
import Availability from './Availability';
import Categories from './Categories';
import Condition from './Condition';
import MobileSidebar from './MobileSidebar';
import PriceRange from './PriceRange';
import SellerType from './SellerType';

const Sidebar = ({ filters, setFilters }) => {
      const windowSize = useWindowSize();
      return (
            <>
                  {
                        windowSize.width > 768 ?
                              <section
                                    className={`w-[310px] h-screen overflow-hidden`}
                              >
                                    {/* Menus outer container position fixed */}
                                    <div
                                          style={{ overscrollBehaviorY: 'contain' }}
                                          className={`md:fixed w-[310px] h-full z-20 overflow-y-scroll custom_scrollbar px-0 sm:px-4 py-3 pb-[70px] bg-white rounded-md border-r border-gray-300`}
                                    >
                                          <PriceRange
                                                filters={filters}
                                                setFilters={setFilters}
                                                margin={'mt-[60px]'}
                                          />
                                          <SellerType
                                                filters={filters}
                                                setFilters={setFilters}
                                          />
                                          <Availability
                                                filters={filters}
                                                setFilters={setFilters}
                                          />
                                          <Condition
                                                filters={filters}
                                                setFilters={setFilters}
                                          />
                                          <Categories
                                                filters={filters}
                                                setFilters={setFilters}
                                          />
                                    </div>
                              </section> :

                              // sidebar on the mobile view
                              <div className='w-full grid place-items-center p-2 bg-white'>
                                    <MobileSidebar
                                          filters={filters}
                                          setFilters={setFilters}
                                    />
                              </div>
                  }
            </>
      );
};

export default Sidebar;