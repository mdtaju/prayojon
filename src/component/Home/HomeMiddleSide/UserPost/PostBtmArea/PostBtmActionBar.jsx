import { faComment, faThumbsUp as faLikeIcon } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React, { memo, useEffect, useState } from 'react';
import LikeAction from './LikeAction';

const PostBtmActionBar = ({ id, postType, reacts }) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();
      const { data: session } = useSession();
      const [reactType, setReactType] = useState("");
      // const [comment, setComment] = useState("");
      const [isFocus, setIsFocus] = useState(false);
      const [content, setContent] = useState(<>
            <FontAwesomeIcon
                  className='post_icon'
                  icon={faLikeIcon}
            />
            <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
      </>);

      useEffect(() => {
            if (reacts) {
                  const getReact = reacts?.find((react) => react?.user_id === session?.user?.email);
                  if (getReact) {
                        setReactType(getReact?.react_type);
                        if (getReact?.react_type.toLowerCase() === 'like') {
                              setContent(<>
                                    <FontAwesomeIcon
                                          className='post_icon text-primary'
                                          icon={faThumbsUp}
                                    />
                                    <span className='text-sm sm:text-base font-bold text-primary ml-2'>Like</span>
                              </>)
                        }
                        if (getReact?.react_type.toLowerCase() === 'love') {
                              setContent(<>
                                    <FontAwesomeIcon
                                          className='post_icon text-red-500'
                                          icon={faHeart}
                                    />
                                    <span className='text-sm sm:text-base font-bold text-primary ml-2'>Love</span>
                              </>)
                        }
                        if (getReact?.react_type.toLowerCase() === 'dislike') {
                              setContent(<>
                                    <FontAwesomeIcon
                                          className='post_icon text-primary'
                                          icon={faThumbsDown}
                                    />
                                    <span className='text-sm sm:text-base font-bold text-primary ml-2'>Dislike</span>
                              </>)
                        }
                        if (!getReact?.react_type) {
                              setContent(<>
                                    <FontAwesomeIcon
                                          className='post_icon'
                                          icon={faLikeIcon}
                                    />
                                    <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                              </>)
                        }
                  } else {
                        setContent(<>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faLikeIcon}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                        </>)
                  }
            } else {
                  setContent(<>
                        <FontAwesomeIcon
                              className='post_icon'
                              icon={faLikeIcon}
                        />
                        <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                  </>)
            }
      }, [reacts, session]);

      // popper open handler
      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };

      // what to render for react type 


      return (
            <div className='grid grid-cols-2 items-center sm:gap-2 py-1 border-y border-gray-300'>
                  {/* like action */}
                  <div className='group sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto relative'>
                              <LikeAction
                                    id={id}
                                    postType={postType}
                                    reactType={reactType}
                              />
                              {content}
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
                  {/* <div className=' sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faShareFromSquare}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Share</span>
                        </div>
                  </div> */}
            </div>
      );
};

export default memo(PostBtmActionBar);