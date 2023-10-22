import { faClose, faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, IconButton } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useGetUserQuery } from '../../../../../features/profile/profileApi';
import { useAddReactsMutation, useRemoveReactMutation } from '../../../../../features/userPost/userPostApi';
import useWindowSize from '../../../../../hook/useWindowSize';

const LikeAction = ({ id, postType, reactType }) => {
      const [addReacts, { data }] = useAddReactsMutation();
      const { data: session } = useSession();
      const [snackOpen, setSnackOpen] = useState(false);
      const { data: getAuthUser } = useGetUserQuery(session?.user?.email);
      const [warnMss, setWarnMss] = useState("");
      const windowSize = useWindowSize();
      const [removeReact, { data: reactRemoved }] = useRemoveReactMutation();

      // action handler 
      const actionHandler = (type) => {
            const d = new Date();
            if (!session) {
                  setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/login">login</Link> to do a react</p>)
            }
            if (session && !getAuthUser[0]?.name) {
                  setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/profile/edit">update</Link> your profile to do a react</p>)
            }
            if (session && getAuthUser[0]?.name) {
                  if (reactType.toLowerCase() !== type.toLowerCase()) {
                        addReacts({
                              post_id: id,
                              react_type: type,
                              post_type: postType,
                              user_id: session?.user?.email,
                              created_at: d.toUTCString()
                        })
                  } else {
                        removeReact({
                              post_id: id,
                              post_type: postType,
                              user_id: session?.user?.email,
                        })
                  }
            } else {
                  setSnackOpen(true)
            }
      }

      const action = (
            <>
                  <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        className='float-right bg-orange-500 w-[35px] h-[35px] hover:bg-orange-500'
                        onClick={() => setSnackOpen(false)}
                  >
                        <FontAwesomeIcon
                              className='text-white'
                              icon={faClose}
                        />
                  </IconButton>
            </>
      );
      return (
            <>
                  <div className='absolute invisible transform transition-all duration-250 -top-[40px] left-[50%] group-hover:visible group-hover:-translate-y-[5px] -translate-x-[50%] bg-gray-50 border border-gray-300 rounded-full py-2 px-6 flex items-center gap-3 cursor-pointer z-20'>
                        <div onClick={() => actionHandler("Like")}>
                              <FontAwesomeIcon
                                    className='post_icon text-2xl hover:scale-125 transition-all duration-150 text-primary'
                                    icon={faThumbsUp}
                              />
                        </div>
                        <div onClick={() => actionHandler("Love")}>
                              <FontAwesomeIcon
                                    className='post_icon text-2xl hover:scale-125 transition-all duration-150 text-red-600'
                                    icon={faHeart}
                              />
                        </div>
                        <div onClick={() => actionHandler("Dislike")}>
                              <FontAwesomeIcon
                                    className='post_icon text-2xl hover:scale-125 transition-all duration-150 text-primary'
                                    icon={faThumbsDown}
                              />
                        </div>
                  </div>

                  {/* snackbar */}
                  <Dialog
                        open={snackOpen}
                        onClose={() => setSnackOpen(false)}
                        fullScreen
                        PaperProps={windowSize.width > 768 ?
                              {
                                    style: {
                                          borderRadius: '10px',
                                          width: '500px',
                                          height: "400px"
                                    }
                              } :
                              {}
                        }
                  >
                        <div className='p-4 bg-orange-200 w-full h-full'>
                              {action}
                              <div className='w-full h-[80%] grid place-items-center'>
                                    {warnMss}
                              </div>
                        </div>
                  </Dialog>
            </>
      );
};

export default LikeAction