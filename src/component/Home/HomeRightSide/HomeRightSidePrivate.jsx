import React from 'react';
import { useGetTopUsersQuery } from '../../../features/profile/profileApi';
import TopSellerCard from './TopSellerCard';

const HomeRightSidePrivate = () => {
      const { data } = useGetTopUsersQuery();

      return (
            <div className='space-y-8'>
                  {/* top users main container start */}
                  <div className='common_shadow px-0 rounded-sm'>
                        <div className='p-4 border-b border-gray-300'>
                              <h1 className="text-gray-800 font-bold text-base">Top Users</h1>
                        </div>
                        {/* Friend request notifications inner container */}
                        <div className='flex flex-col gap-6 mt-3 px-4'>
                              {
                                    data?.map((people, i) => (
                                          <TopSellerCard
                                                people={people}
                                                key={i}
                                          />
                                    ))
                              }
                        </div>
                  </div>
                  {/* top users main container end */}
                  <div className='common_shadow px-0 rounded-sm'>
                        <div className='p-4 border-b border-gray-300'>
                              <h1 className="text-gray-800 font-bold text-base">May Also Follow People</h1>
                        </div>
                        <div className='flex flex-col gap-6 mt-3 px-4'>
                              {
                                    data?.map((people, i) => (
                                          <TopSellerCard
                                                people={people}
                                                key={i}
                                          />
                                    ))
                              }
                        </div>
                  </div>

                  {/* social links */}
                  <div>

                  </div>
            </div>
      );
};

export default HomeRightSidePrivate;