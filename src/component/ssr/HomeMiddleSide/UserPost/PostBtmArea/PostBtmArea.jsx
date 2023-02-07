import { faComment, faShareFromSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React from 'react';

const PostBtmArea = () => {
      return (
            <div className='w-full px-4 border-t border-gray-300'>
                  <div className='w-full flex items-center justify-between px-1 py-2'>
                        <div>
                              <FontAwesomeIcon
                                    icon={faThumbsUp}
                              />
                              <span className='text-base font-bold text-gray-600 ml-2'>12</span>
                        </div>
                        <div>
                              <span className='text-base font-bold text-gray-600 mr-2'>5</span>
                              <FontAwesomeIcon
                                    icon={faComment}
                              />
                        </div>
                  </div>
                  <div className='flex items-center justify-around sm:gap-2 px-1 py-1 border-y border-gray-300'>
                        <div className='px-2 sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer'>
                              <FontAwesomeIcon
                                    icon={faThumbsUp}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                        </div>
                        <div className='px-2 sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer'>
                              <FontAwesomeIcon
                                    icon={faComment}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Comment</span>
                        </div>
                        <div className='px-2 sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer'>
                              <FontAwesomeIcon
                                    icon={faShareFromSquare}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Share</span>
                        </div>
                  </div>
                  <div className='flex items-center gap-2 px-1 py-2'>
                        <div>
                              <Avatar
                                    alt="Remy Sharp"
                                    //   src="/static/images/avatar/1.jpg"
                                    sx={{ width: 36, height: 36 }}
                              />
                        </div>
                        <input
                              type={"text"}
                              className='py-2 px-3 rounded-full bg-gray-100 w-full outline-none'
                              placeholder={"Write a comment..."}
                        />

                        {/* <p className='font-bold text-base text-gray-500'></p> */}
                  </div>

                  {/* comment component */}
                  <div className='px-1'>
                        <div className='flex items-start gap-2'>
                              <div>
                                    <Avatar
                                          alt="Remy Sharp"
                                          //   src="/static/images/avatar/1.jpg"
                                          sx={{ width: 36, height: 36 }}
                                    />
                              </div>
                              <div className='p-3 rounded-lg bg-gray-100 w-[70%] flex flex-col gap-1'>
                                    <p className='font-medium text-base text-gray-800 leading-[7px] mb-2'>{"Korimullah"}</p>
                                    <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900'>{"Prayjon will be awesome web app by Authentic Four Technology"}</p>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default PostBtmArea;