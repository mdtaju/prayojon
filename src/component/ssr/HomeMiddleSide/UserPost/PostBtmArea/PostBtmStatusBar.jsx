import { faComment, faShareFromSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PostBtmStatusBar = () => {
      return (
            <div className='w-full flex items-center justify-between p-1'>
                  <div className='flex items-center gap-3'>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faThumbsUp}
                              />
                              <span className='text-base font-bold text-gray-600 ml-[2px]'>12</span>
                        </div>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faComment}
                              />
                              <span className='text-base font-bold text-gray-600 ml-[2px]'>5</span>
                        </div>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faShareFromSquare}
                              />
                              <span className='text-base font-bold text-gray-600 ml-[2px]'>5</span>
                        </div>
                  </div>
                  <div>
                        <div className='py-1 px-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faCartShopping}
                              />
                              <span className='text-base font-bold text-gray-600 ml-1'>+</span>
                        </div>
                  </div>
            </div>
      );
};

export default PostBtmStatusBar;