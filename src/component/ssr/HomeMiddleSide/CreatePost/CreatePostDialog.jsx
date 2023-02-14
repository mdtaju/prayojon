import { faCaretDown, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const CreatePostDialog = ({ open, setOpen, handleClickOpen }) => {
      const handleClose = () => {
            setOpen(false);
      };
      const descriptionElementRef = useRef(null);
      useEffect(() => {
            if (open) {
                  const { current: descriptionElement } = descriptionElementRef;
                  if (descriptionElement !== null) {
                        descriptionElement.focus();
                  }
            }
      }, [open]);

      return (
            <div>
                  <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        PaperProps={{
                              style: {
                                    borderRadius: '10px',
                                    maxWidth: '500px'
                              },
                        }}
                  >
                        <div className='relative'>
                              <DialogTitle className='text-center' id="scroll-dialog-title">Create Post</DialogTitle>
                              <button
                                    onClick={handleClose}
                                    className='absolute top-4 right-4 w-[35px] h-[35px] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 active:scale-95 duration-150'>
                                    <FontAwesomeIcon
                                          icon={faXmark}
                                    />
                              </button>
                        </div>
                        <div className='w-full h-[1px] bg-gray-300'></div>
                        <div className='px-4 py-3'>
                              <div className='flex items-center gap-3'>
                                    <div>
                                          <Avatar
                                                alt="Remy Sharp"
                                                //   src="/static/images/avatar/1.jpg"
                                                sx={{ width: 44, height: 44 }}
                                          />
                                    </div>
                                    <div>
                                          <span className='text-base text-gray-900 font-semibold'>Abdullah</span>
                                          <div className='px-2 py-[2px] bg-gray-300 w-fit flex items-center gap-1 rounded-md cursor-pointer'>
                                                <FontAwesomeIcon
                                                      icon={faUserGroup}
                                                      className='text-[10px]'
                                                />
                                                <span className='text-sm font-semibold text-gray-900'>Friends</span>
                                                <FontAwesomeIcon
                                                      icon={faCaretDown}
                                                      className='text-[12px]'
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <DialogContent>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga consequuntur illo accusantium, assumenda quidem dignissimos perferendis voluptate deserunt repellat? Voluptas.</p>
                              {/* <DialogContentText
                                    id="scroll-dialog-description"
                                    ref={descriptionElementRef}
                                    tabIndex={-1}
                              >
                                    
                              </DialogContentText> */}
                        </DialogContent>
                        <DialogActions className='p-4'>
                              <button className='btn_primary w-full'>Post</button>
                        </DialogActions>
                  </Dialog>
            </div>
      );
};

export default CreatePostDialog;