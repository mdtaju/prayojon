import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dialog, IconButton } from '@mui/material';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../../features/profile/profileApi';
import useWindowSize from '../../../../hook/useWindowSize';
import CreatePostDialog from './CreatePostDialog';

const CreatePost = () => {
      const { data } = useSession();
      const [open, setOpen] = useState(false);
      const [snackOpen, setSnackOpen] = useState(false);
      const [name, setName] = useState("");
      const [photo, setPhoto] = useState("");
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(authData?.user?.email);
      const [warnMss, setWarnMss] = useState("");
      const windowSize = useWindowSize();

      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.name) {
                  setName(getAuthUser[0].name);
            }
            if (getAuthUser && getAuthUser[0]?.photo_url) {
                  setPhoto(getAuthUser[0].photo_url);
            }
      }, [getAuthUser]);

      const handleClickOpen = () => {
            if (!authData) {
                  setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/login">login</Link> to create a post</p>)
            }
            if (authData && !getAuthUser[0]?.name) {
                  setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/profile/edit">update</Link> your profile to create a post</p>)
            }
            if (data && getAuthUser[0]?.name) {
                  setOpen(true);
            } else {
                  setSnackOpen(true)
            }
      };

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
            <div className='w-full p-3'>
                  <CreatePostDialog
                        open={open}
                        setOpen={setOpen}
                        handleClickOpen={handleClickOpen}
                        photo={photo}
                        name={name}
                  />
                  <div onClick={handleClickOpen} className='flex items-center gap-4 py-2 px-3 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer w-full'>
                        <div>
                              <Avatar
                                    alt="Remy Sharp"
                                    src={photo}
                                    sx={{ width: 40, height: 40 }}
                                    variant='rounded'
                              />
                        </div>
                        <p className='font-semibold text-base text-gray-500'>{"What's on your mind?"}</p>
                  </div>

                  {/* snackbar */}
                  {/* <Snackbar
                        open={snackOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackOpen(false)}
                        message={warnMss}
                        action={action}
                  /> */}
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

export default CreatePost