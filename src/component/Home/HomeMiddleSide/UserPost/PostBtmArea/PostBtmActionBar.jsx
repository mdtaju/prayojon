import { faComment, faShareFromSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import LikeAction from './LikeAction';

const PostBtmActionBar = () => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();
      // const [comment, setComment] = useState("");
      const [isFocus, setIsFocus] = useState(false);

      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };
      return (
            <div className='grid grid-cols-3 items-center sm:gap-2 py-1 border-y border-gray-300'>
                  {/* like action */}
                  <div className='group sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto relative'>
                              <LikeAction />
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faThumbsUp}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                        </div>
                  </div>
                  {/* comment */}
                  <div className=' sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faComment}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Comment</span>
                        </div>
                  </div>
                  {/* share */}
                  <div className=' sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faShareFromSquare}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Share</span>
                        </div>
                  </div>
            </div>
      );
};

export default PostBtmActionBar;