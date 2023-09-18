import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dialog, IconButton } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import { useAddNotificationMutation } from '../../../../../features/notification/notificationApi';
import { useGetUserQuery } from '../../../../../features/profile/profileApi';
import { useAddCommentMutation } from '../../../../../features/userPost/userPostApi';
import useWindowSize from '../../../../../hook/useWindowSize';
import CustomPopper from '../../../../common/CustomPopper';

const PostBtmWriteComment = ({ avatarWidth, avatarHeight, comment, setComment, placeholder, id, postType, postUserId }) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();
      // const [comment, setComment] = useState("");
      const [isFocus, setIsFocus] = useState(false);
      const [addComment, { data }] = useAddCommentMutation();
      const [snackOpen, setSnackOpen] = useState(false);
      const [warnMss, setWarnMss] = useState("");
      const router = useRouter();
      const [photo, setPhoto] = useState("");
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(authData?.user?.email);
      const [addNotification, { data: notificationRes, error }] = useAddNotificationMutation();
      const windowSize = useWindowSize();

      // get users photo 
      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.photo_url) {
                  setPhoto(getAuthUser[0].photo_url);
            }
      }, [getAuthUser]);

      // const ref = useRef();
      useEffect(() => {
            if (comment.length === 0) {
                  setIsFocus(false)
            } else {
                  setIsFocus(true)
            }
      }, [comment])
      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };
      // comment sent handler 
      const handleSentComment = () => {
            const d = new Date();
            if (getAuthUser?.length > 0) {
                  if (authData && !getAuthUser[0]?.name) {
                        setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/profile/edit">update</Link> your profile to write a comment</p>)
                  }
                  if (authData && getAuthUser[0]?.name) {
                        addComment({
                              post_id: id,
                              comment,
                              post_type: postType,
                              user_id: authData?.user?.email,
                              created_at: d.toUTCString()
                        });
                        addNotification({
                              sender_id: authData?.user?.email,
                              receiver_id: postUserId,
                              message: "comment to your post.",
                              link: ``,
                              date: d.toUTCString()
                        })
                        setComment("")
                  } else {
                        setSnackOpen(true)
                  }
            }
            if (!authData) {
                  setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/login">login</Link> to write a comment</p>)
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
            <div className='flex items-start gap-2 pb-1'>
                  <div className=''>
                        <Avatar
                              alt="Remy Sharp"
                              src={photo}
                              sx={{ width: avatarWidth, height: avatarHeight }}
                        />
                  </div>
                  <div className={`${isFocus ? 'rounded-md' : "rounded-full"} bg-gray-100 w-[calc(100%-40px)] py-1 px-3 h-full flex ${isFocus ? 'flex-col' : "flex-row"} items-end justify-between gap-1`}>
                        {/* <blockquote
                              role={'textbox'}
                              contentEditable="true"
                              placeholder='Write a comment...'
                              className='w-[calc(100%-38px)] py-1 px-3 outline-none'
                              // onBlur={(e) => setComment(e.target.innerText)}
                              onInput={(e) => setComment(e.target.innerText)}
                              onFocus={() => setIsFocus(true)}
                              ref={ref}
                        >
                        </blockquote> */}
                        {/* write a comment */}
                        <textarea
                              className={`w-full bg-transparent outline-none overflow-hidden resize-none px-1 text-[.9375rem] leading-[1.3333] placeholder:italic`}
                              value={comment}
                              style={comment.length === 0 ? { height: "27px" } : {}}
                              placeholder={placeholder}
                              onChange={(e) => {
                                    setComment(e.target.value)
                                    e.target.style.height = 'inherit';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                              }}
                        ></textarea>
                        {/* Emoji button to open emojis */}
                        <div className='flex items-center gap-1'>
                              <div
                                    onClick={handleClick('top')}
                                    className='p-1 w-fit cursor-pointer'>
                                    <FontAwesomeIcon
                                          icon={faFaceSmile}
                                          className='text-xl text-gray-600'
                                    />
                              </div>
                              {/* comment sent button */}
                              <div
                                    onClick={handleSentComment}
                                    className='p-1 w-fit cursor-pointer'>
                                    <FontAwesomeIcon
                                          icon={faPaperPlane}
                                          className='text-xl text-gray-600'
                                    />
                              </div>
                        </div>
                  </div>
                  {/* Emoji popper */}
                  <CustomPopper
                        setOpenPopper={setOpen}
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                  >
                        {/* emoji picker package from external package */}
                        <EmojiPicker
                              skinTonesDisabled={true}
                              searchDisabled={true}
                              width={360}
                              height={350}
                              autoFocusSearch={false}
                              emojiStyle='facebook'
                              previewConfig={{ showPreview: false }}
                              lazyLoadEmojis={true}
                              onEmojiClick={(e) => setComment((prevState) => prevState + e.emoji)}
                        />
                  </CustomPopper>

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
            </div>
      );
};

export default memo(PostBtmWriteComment);