import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useState } from 'react';
import CustomPopper from '../../../../common/CustomPopper';

const PostBtmWriteComment = ({ avatarWidth, avatarHeight, comment, setComment, placeholder }) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();
      // const [comment, setComment] = useState("");
      const [isFocus, setIsFocus] = useState(false);

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
      return (
            <div className='flex items-start gap-2 pb-1'>
                  <div className=''>
                        <Avatar
                              alt="Remy Sharp"
                              //   src="/static/images/avatar/1.jpg"
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
                              <div
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
            </div>
      );
};

export default PostBtmWriteComment;