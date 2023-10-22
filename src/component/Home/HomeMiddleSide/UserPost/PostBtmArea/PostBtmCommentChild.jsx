import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../../../features/profile/profileApi';
import useWindowSize from '../../../../../hook/useWindowSize';
import CommentReplyParent from './CommentReply/CommentReplyParent';
import PostBtmWriteComment from './PostBtmWriteComment';

const PostBtmCommentChild = ({ comment, reply, time, userId }) => {
      const [toggleReply, setToggleReply] = useState(false);
      const [toggleReplyInput, setToggleReplyInput] = useState(false);
      const [textExpand, setTextExpand] = useState(false);
      const [commentInput, setCommentInput] = useState("");
      const windowSize = useWindowSize();

      const [name, setName] = useState("");
      const [photo, setPhoto] = useState("");
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(userId);

      // get users photo and name 
      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.photo_url) {
                  setPhoto(getAuthUser[0].photo_url);
            }
            if (getAuthUser && getAuthUser[0]?.name) {
                  setName(getAuthUser[0].name);
            }
      }, [getAuthUser]);

      useEffect(() => {
            if (comment.length > 100) {
                  setTextExpand(false)
            } else {
                  setTextExpand(true)
            }
      }, [comment])
      return (
            <div className='flex flex-col gap-1'>
                  {/* User comment and Like and reply container */}
                  <div className=''>
                        {/* User Comment */}
                        <div className='flex items-start gap-2 relative'>
                              {/* vertical line from ..... */}
                              {
                                    (reply.length !== 0 || toggleReplyInput) &&
                                    <>
                                          <div
                                                className={`absolute ${windowSize.width > 425 ? "left-[17px] top-[42px]" : "left-[13px] top-[36px]"} w-[2px] bg-[#f0f5f2] rounded-b-full`}
                                                style={{ height: "calc(100% - 40px)" }}
                                          ></div>
                                    </>
                              }
                              {/* to here ..... */}
                              <div>
                                    <Avatar
                                          style={{ zIndex: '2' }}
                                          alt="Remy Sharp"
                                          src={photo}
                                          sx={windowSize.width > 425 ? { width: 36, height: 36 } : { width: 28, height: 28 }}
                                    />
                              </div>
                              <div className='p-3 rounded-lg bg-gray-100 w-fit flex flex-col gap-1 relative'>
                                    <p className='font-medium text-base text-gray-800 leading-[1.2222]'>{name}</p>
                                    <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900 mb-1'>
                                          {
                                                !textExpand ?
                                                      <>
                                                            {comment.slice(0, 120)}
                                                            {"... "}
                                                            <span
                                                                  onClick={() => setTextExpand(true)}
                                                                  className='font-semibold cursor-pointer hover:underline'>{"See more"}</span>
                                                      </> :
                                                      <>
                                                            {comment}
                                                      </>
                                          }
                                    </p>
                                    {/* like status on comment */}
                                    {/* <div className='absolute -bottom-2 right-0'>
                                          <LikeStatus />
                                    </div> */}
                              </div>
                        </div>
                        {/* Like and Reply to user comment */}
                        <div className='ml-[36px] sm:ml-[48px] px-1 flex items-center gap-2 text-gray-600 text-sm font-semibold'>
                              {/* <div className='relative group'>
                                    <span className='cursor-pointer hover:underline'>Like</span>
                                    <LikeAction />
                              </div> */}
                              {/* <span onClick={() => setToggleReplyInput(true)} className='cursor-pointer hover:underline'>Reply</span> */}
                              <span className='cursor-pointer hover:underline text-xs'>{moment(time).fromNow()}</span>
                        </div>
                        {/* write a reply input */}
                        {
                              toggleReplyInput &&
                              <div className={`w-[calc(100%-48px)] h-full relative ml-auto my-1`}>
                                    <div className={`absolute top-[-35px] ${windowSize.width > 425 ? "left-[-31px]" : "left-[-35px]"} w-[25px] h-[50px] border-l-[2px] border-b-[2px] border-[#f0f5f2] rounded-bl-xl z-0`}></div>
                                    {
                                          reply.length !== 0 &&
                                          <div
                                                className={`absolute ${windowSize.width > 425 ? "left-[-31px]" : "left-[-35px]"} w-[2px] bg-[#f0f5f2] rounded-b-full`}
                                                style={{ height: "100%" }}
                                          ></div>
                                    }
                                    {/* write replay with write comment component */}
                                    <PostBtmWriteComment
                                          avatarWidth={28}
                                          avatarHeight={28}
                                          comment={commentInput}
                                          setComment={setCommentInput}
                                          placeholder={"Write a reply..."}
                                    />
                              </div>
                        }
                  </div>

                  {/* view more comment reply button component && comment reply parent component */}
                  {
                        reply.length !== 0 &&
                        <>
                              {/* view more comment reply button */}
                              {
                                    !toggleReply ?

                                          <div className='ml-[48px] px-2 flex items-center gap-2 mt-2 relative'>
                                                <div className={`absolute bottom-[10px] ${windowSize.width > 425 ? "left-[-31px]" : "left-[-35px]"} w-[30px] h-[50px] border-l-[2px] border-b-[2px] border-[#f0f5f2] rounded-bl-xl`}></div>
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

export default PostBtmCommentChild