import React from 'react';
import { useGetTopUsersQuery } from '../../../features/profile/profileApi';
import HomeLeftSidePeople from '../HomeLeftNavigation/HomeLeftSidePeople';

const HomeRightSidePrivate = () => {
      const { data } = useGetTopUsersQuery();

      return (
            <div>
                  <div className='flex items-center justify-between'>
                        <div><span className='text-lg font-semibold text-gray-800'>Top Users</span></div>
                        {/* <div><span className='text-base text-primary hover:underline cursor-pointer'>See all</span></div> */}
                  </div>
                  {/* Friend request notifications inner container */}


                  <div className='flex flex-col gap-4 mt-4'>
                        {
                              data?.map((people, i) => (
                                    <HomeLeftSidePeople
                                          user={people}
                                          key={i}
                                    />
                              ))
                        }
                  </div>
            </div>
      );
};

export default HomeRightSidePrivate;