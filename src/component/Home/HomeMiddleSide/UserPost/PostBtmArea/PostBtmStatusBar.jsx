import { faComment, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LikeStatus from './LikeStatus';

const PostBtmStatusBar = () => {
      return (
            <div className='w-full flex items-center justify-between p-1'>
                  <div className='flex items-center gap-3'>
                        <div className='flex items-center'>
                              {/* <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faThumbsUp}
                              /> */}
                              <LikeStatus />
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
                  <div className='flex items-center gap-1'>
                        <div>
                              <FontAwesomeIcon icon={faDollarSign} className='text-gray-700 text-sm' key={0} />
                              <span className='text-base font-bold text-gray-700'>35</span>
                        </div>
                        <div className='py-1 px-3 hover:bg-gray-200 rounded-md cursor-pointer active:scale-95 duration-150 select-none'>
                              <FontAwesomeIcon
                                    className='post_icon text-primary'
                                    icon={faCartShopping}
                              />
                              <span className='text-base font-bold text-primary ml-1'>+</span>
                        </div>
                  </div>
            </div>
      );
};

export default PostBtmStatusBar;