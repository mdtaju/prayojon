import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CommentReplyChild = ({ name, comment, linear }) => {
      const [textExpand, setTextExpand] = useState(false);
      useEffect(() => {
            if (comment.length > 100) {
                  setTextExpand(false)
            } else {
                  setTextExpand(true)
            }
      }, [comment])
      return (
            <div className='flex items-start gap-2 relative'>
                  <div className='absolute top-[-35px] left-[-31px] w-[25px] h-[50px] border-l-[2px] border-b-[2px] border-[#f0f5f2] rounded-bl-xl z-0'></div>
                  {
                        !linear &&
                        <div
                              className={`absolute left-[-31px] top-0 w-[2px] h-full bg-[#f0f5f2] rounded-b-full `}
                        ></div>
                  }
                  <div>
                        <Avatar
                              alt="Remy Sharp"
                              //   src="/static/images/avatar/1.jpg"
                              sx={{ width: 28, height: 28 }}
                        />
                  </div>
                  <div className='p-3 rounded-lg bg-gray-100 w-fit flex flex-col gap-1'>
                        <p className='font-medium text-base text-gray-800 leading-[1.2222]'>{name}</p>
                        <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900'>
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
                  </div>
            </div>
      );
};

export default CommentReplyChild;