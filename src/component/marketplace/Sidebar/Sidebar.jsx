import React from 'react';
import useWindowSize from '../../../hook/useWindowSize';
import Availability from './Availability';
import Categories from './Categories';
import ColorType from './Colors';
import Condition from './Condition';
import MobileSidebar from './MobileSidebar';
import PriceRange from './PriceRange';
import SellerType from './SellerType';
import SizeRange from './SizeRange';
import SubCategories from './SubCategories';

const Sidebar = ({ filters, setFilters }) => {
      const windowSize = useWindowSize();
      return (
            <>

                  <section
                        className={`hidden md:block w-[310px] h-screen overflow-hidden px-4`}
                  >
                        {/* Menus outer container position fixed */}
                        <div
                              style={{ overscrollBehaviorY: 'contain' }}
                              className={`md:fixed w-[280px] h-full md:h-[calc(100vh-95px)] md:top-[4.75rem] z-20 overflow-y-scroll custom_scrollbar px-0 sm:px-4 py-3 pb-[10px] bg-white rounded-md border-r border-gray-300 common_shadow overflow-x-hidden`}
                        >
                              <PriceRange
                                    filters={filters}
                                    setFilters={setFilters}
                                    margin={'mt-[5px]'}
                              />
                              <SizeRange
                                    filters={filters}
                                    setFilters={setFilters}
                              />
                              <ColorType
                                    filters={filters}
                                    setFilters={setFilters}
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
                              <SubCategories
                                    filters={filters}
                                    setFilters={setFilters}
                              />
                        </div>
                  </section>

                  {/* // sidebar on the mobile view */}
                  <div className='w-full grid place-items-center p-2 bg-white md:hidden'>
                        <MobileSidebar
                              filters={filters}
                              setFilters={setFilters}
                        />
                  </div>

            </>
      );
};

export default Sidebar;