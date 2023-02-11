import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import CommentReplyParent from './CommentReply/CommentReplyParent';

const PostBtmCommentChild = ({ name, comment, reply }) => {
      const [toggleReply, setToggleReply] = useState(false);
      return (
            <div className='flex flex-col gap-1'>
                  {/* User comment and Like and reply container */}
                  <div className='relative'>
                        {/* vertical line from ..... */}
                        {
                              reply.length !== 0 &&
                              <>
                                    <div
                                          className={`absolute left-[17px] top-[42px] w-[2px] bg-[#f0f5f2] rounded-b-full`}
                                          style={{ height: "calc(100% - 40px)" }}
                                    ></div>
                              </>
                        }
                        {/* to here ..... */}
                        {/* User Comment */}
                        <div className='flex items-start gap-2'>
                              <div>
                                    <Avatar
                                          style={{ zIndex: '2' }}
                                          alt="Remy Sharp"
                                          //   src="/static/images/avatar/1.jpg"
                                          sx={{ width: 36, height: 36 }}
                                    />
                              </div>
                              <div className='p-3 rounded-lg bg-gray-100 w-fit flex flex-col gap-1'>
                                    <p className='font-medium text-base text-gray-800 leading-[1.2222]'>{name}</p>
                                    <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900'>{comment}</p>
                              </div>
                        </div>
                        {/* Like and Reply to user comment */}
                        <div className='ml-[48px] px-1 flex items-center gap-2 text-gray-600 text-sm font-semibold'>
                              <span className='cursor-pointer hover:underline'>Like</span>
                              <span className='cursor-pointer hover:underline'>Reply</span>
                              <span className='cursor-pointer hover:underline text-xs'>23h</span>
                        </div>
                  </div>

                  {/* view more comment reply button component && comment reply parent component */}
                  {
                        reply.length !== 0 &&
                        <>
                              {/* view more comment reply button */}
                              {
                                    !toggleReply ?

                                          <div className='ml-[48px] px-2 flex items-center gap-2 mt-2 relative'>
                                                <div className='absolute bottom-[10px] left-[-31px] w-[30px] h-[50px] border-l-[2px] border-b-[2px] border-[#f0f5f2] rounded-bl-xl'></div>
                                                <FontAwesomeIcon
                                                      icon={faArrowTurnUp}
                                                      className="rotate-90 text-gray-600"
                                                />
                                                <span
                                                      onClick={() => setToggleReply((prevState) => !prevState)}
                                                      className='cursor-pointer hover:underline text-sm text-gray-600 font-semibold'
                                                >View {reply.length} reply</span>
                                                {/* Comment reply parent component */}
                                          </div> :
                                          <CommentReplyParent
                                                userReply={reply}
                                          />
                              }
                        </>
                  }
            </div>
      );
};

export default PostBtmCommentChild;