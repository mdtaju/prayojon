import { Avatar, AvatarGroup } from '@mui/material';
import React from 'react';

const HomeRightFriendReqChild = () => {
      return (
            <div className='flex items-start gap-4'>
                  <Avatar
                        alt="Remy Sharp"
                        //   src="/static/images/avatar/1.jpg"
                        sx={{ width: 40, height: 40 }}
                  />
                  <div className='flex flex-col'>
                        <div className='flex items-center justify-between mb-2'>
                              <span className='text-base leading-3 font-semibold text-gray-900 mr-1'>Abdullah</span>
                              <span className='text-sm leading-3 text-gray-400 mt-1'>a day ago</span>
                        </div>
                        <div className='w-full h-fit'>
                              <AvatarGroup
                                    max={3}
                                    className="w-fit"
                              // sx={{ width: 16, height: 16 }}
                              // total={24}
                              >
                                    <Avatar
                                          alt="Remy Sharp"
                                          sx={{ width: 16, height: 16 }}
                                    // src="/static/images/avatar/1.jpg" 
                                    />
                                    <Avatar
                                          alt="Travis Howard"
                                          sx={{ width: 16, height: 16 }}
                                    // src="/static/images/avatar/2.jpg" 
                                    />
                                    <Avatar
                                          alt="Agnes Walker"
                                          sx={{ width: 16, height: 16 }}
                                    // src="/static/images/avatar/4.jpg" 
                                    />
                              </AvatarGroup>
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                              <button className='btn_primary'>Confirm</button>
                              <button className='btn_primary bg-gray-300 text-gray-900'>Delete</button>
                        </div>
                  </div>
            </div>
      );
};

export default HomeRightFriendReqChild;