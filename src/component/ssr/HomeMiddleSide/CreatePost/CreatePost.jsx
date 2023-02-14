import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import CreatePostDialog from './CreatePostDialog';

const CreatePost = () => {
      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
            setOpen(true);
      };
      return (
            <div className='w-full common_shadow'>
                  <CreatePostDialog
                        open={open}
                        setOpen={setOpen}
                        handleClickOpen={handleClickOpen}
                  />
                  <div className='flex items-center gap-4'>
                        <div>
                              <Avatar
                                    alt="Remy Sharp"
                                    //   src="/static/images/avatar/1.jpg"
                                    sx={{ width: 40, height: 40 }}
                              />
                        </div>
                        <div onClick={handleClickOpen} className='py-2 px-3 rounded-full bg-gray-200 cursor-pointer w-full'>
                              <p className='font-bold text-base text-gray-500'>{"What's on your mind?"}</p>
                        </div>
                  </div>
            </div>
      );
};

export default CreatePost;