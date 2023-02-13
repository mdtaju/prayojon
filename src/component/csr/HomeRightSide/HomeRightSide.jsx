import React from 'react';
import HomeRightContactSrtCutChild from './HomeRightContactSrtCutChild';
import HomeRightFriendReqChild from './HomeRightFriendReqChild';

const HomeRightSide = () => {
      return (
            <section className='hidden md:block w-[310px] h-screen overflow-hidden'>
                  <div
                        style={{ overscrollBehaviorY: 'contain' }}
                        className={`fixed w-[310px] h-full z-20 overflow-y-scroll custom_scrollbar px-4 py-3 pb-[70px]`}
                  >
                        {/* Friend request notifications outer container */}
                        <div>
                              <div className='flex items-center justify-between'>
                                    <div><span className='text-lg font-semibold text-gray-800'>Friend requests</span></div>
                                    <div><span className='text-base text-primary hover:underline cursor-pointer'>See all</span></div>
                              </div>
                              {/* Friend request notifications inner container */}
                              <div className='flex flex-col gap-4 mt-4'>
                                    <HomeRightFriendReqChild />
                                    <HomeRightFriendReqChild />
                                    <HomeRightFriendReqChild />
                                    <HomeRightFriendReqChild />
                                    <div className='h-[1px] w-full bg-gray-300 mt-2'></div>
                              </div>
                        </div>
                        {/* Contacts shortcut outer container */}
                        <div className='mt-4'>
                              <div className='flex items-center justify-between'>
                                    <div><span className='text-lg font-semibold text-gray-800'>Contacts</span></div>
                                    <div><span className='text-base text-primary hover:underline cursor-pointer'>See all</span></div>
                              </div>
                              {/* Contact shortcut inner container */}
                              <div className='flex flex-col mt-4'>
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <div className='h-[1px] w-full bg-gray-300 mt-2'></div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default HomeRightSide;