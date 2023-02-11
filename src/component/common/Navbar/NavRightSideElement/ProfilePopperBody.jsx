import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React from 'react';

const ProfilePopperBody = () => {
      return (
            <div className='w-[320px] px-3 py-2'>
                  <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-3 shadow-md p-2 rounded-md hover:bg-gray-100 cursor-pointer'>
                              <Avatar
                                    alt="Remy Sharp"
                                    //   src="/static/images/avatar/1.jpg"
                                    sx={{ width: 36, height: 36 }}
                              />
                              <span className='text-gray-800 font-bold'>User Name</span>
                        </div>
                        <div className='flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer'>
                              <div className='p-[7px]'>
                                    <FontAwesomeIcon
                                          icon={faArrowRightFromBracket}
                                          className="text-xl"
                                    />
                              </div>
                              <span className='text-gray-800 font-bold'>Log Out</span>
                        </div>
                  </div>

            </div>
      );
};

export default ProfilePopperBody;