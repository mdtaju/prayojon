import React from 'react';
import HomeRightFriendReqChild from './HomeRightFriendReqChild';

const HomeRightSidePrivate = () => {

      return (
            <div>
                  <div className='flex items-center justify-between'>
                        <div><span className='text-lg font-semibold text-gray-800'>Recent Activity</span></div>
                        {/* <div><span className='text-base text-primary hover:underline cursor-pointer'>See all</span></div> */}
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
      );
};

export default HomeRightSidePrivate;