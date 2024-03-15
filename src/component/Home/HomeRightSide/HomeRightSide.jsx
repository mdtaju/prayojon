import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import HomeRightSidePrivate from './HomeRightSidePrivate';
import HomeRightSidePublic from './HomeRightSidePublic';

const HomeRightSide = () => {
      const { data: session } = useSession();
      if (session === undefined) {
            return (
                  <session className='hidden md:block w-[310px] md:w-[380px] h-screen overflow-hidden'>
                        <div
                              style={{ overscrollBehaviorY: 'contain' }}
                              className={`fixed w-[310px] md:w-[380px] h-full z-20 overflow-y-scroll custom_scrollbar px-4 py-3 pb-[70px] rounded-md`}
                        >
                              <div className='space-y-3'>
                                    {
                                          Array.from(Array(8)).map((_, i) => (
                                                <div key={i} className='common_shadow flex gap-4 items-center'>
                                                      <Skeleton variant="circular" width={40} height={40} />
                                                      <Skeleton variant="rounded" className='flex-1 rounded-lg' height={40} />
                                                </div>
                                          ))
                                    }
                              </div>
                        </div>
                  </session>
            )
      }
      return (
            <section className='hidden md:block w-[310px] md:w-[380px] h-screen overflow-hidden '>
                  <div
                        style={{ overscrollBehaviorY: 'contain' }}
                        className={`fixed w-[310px] md:w-[380px] h-full z-20 overflow-y-scroll custom_scrollbar px-0 sm:px-4 py-6 pb-[70px] rounded-md`}
                  >
                        {/* Friend request notifications outer container */}
                        {
                              session ?
                                    <HomeRightSidePrivate /> :
                                    <HomeRightSidePublic />
                        }
                        {/* Contacts shortcut outer container */}
                        {/* <div className='mt-4'>
                              <div className='flex items-center justify-between'>
                                    <div><span className='text-lg font-semibold text-gray-800'>Contacts</span></div>
                                    <div><span className='text-base text-primary hover:underline cursor-pointer'>See all</span></div>
                              </div>
                              // {/* Contact shortcut inner container 
                              <div className='flex flex-col mt-4'>
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <HomeRightContactSrtCutChild />
                                    <div className='h-[1px] w-full bg-gray-300 mt-2'></div>
                              </div>
                        </div> */}
                  </div>
            </section>
      );
};

export default HomeRightSide;