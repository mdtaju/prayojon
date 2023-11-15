import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import { useGetUPostsImagesQuery } from '../../../features/userPost/userPostApi';
import useWindowSize from '../../../hook/useWindowSize';
import PhotoItem from './PhotoItem';

const ProfilePhotos = (UID = false) => {
      const [open, setOpen] = useState(false);
      const { data: session } = useSession();
      const { data } = useGetUPostsImagesQuery();
      const windowSize = useWindowSize();
      const [photos, setPhotos] = useState([]);
      const [photoUrl, setPhotoUrl] = useState({
            photo: "",
            pIndex: ""
      });

      const handleIncrement = () => {
            setPhotoUrl((prevState) => {
                  const getItem = photos.find((item, i) => i === prevState.pIndex + 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              pIndex: prevState.pIndex + 1,
                              photo: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      const handleDecrement = () => {
            setPhotoUrl((prevState) => {
                  const getItem = photos.find((item, i) => i === prevState.pIndex - 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              pIndex: prevState.pIndex - 1,
                              photo: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      const handleClose = () => {
            setOpen(false);
      };

      useEffect(() => {
            if (data) {
                  const uId = UID.UID ? UID.UID : session?.user?.email;
                  const getPhotos = data?.filter((file) => file.user_id == uId && file.file_type === "Image");
                  setPhotos(getPhotos);
            }
      }, [data, session, UID]);
      return (
            <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <h1 className='mt-4 text-xl font-semibold text-gray-800'>Photos</h1>
                  <div className='w-full mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 place-content-center'>
                        {
                              photos.map((p, i) => (
                                    <PhotoItem
                                          key={i}
                                          index={i}
                                          photo={p}
                                          setPhotoUrl={setPhotoUrl}
                                          setOpen={setOpen}
                                    />
                              ))
                        }
                        {/* video dialog */}
                        <Dialog
                              open={open}
                              onClose={handleClose}
                              fullScreen
                              PaperProps={windowSize.width > 768 ?
                                    {
                                          style: {
                                                borderRadius: '10px',
                                                width: '780px',
                                                height: "fit-content"
                                          }
                                    } :
                                    {}
                              }
                        >
                              {/* dialog inner container */}
                              <div className='py-4 px-6 relative bg-black w-full h-[450px]'>
                                    {/* close button */}
                                    <button onClick={() => setOpen(false)} className='absolute right-0 top-0 w-[35px] h-[35px] bg-red-500 rounded-full text-white z-10'>
                                          <FontAwesomeIcon
                                                icon={faClose}
                                          />
                                    </button>
                                    {/* left button */}
                                    <button onClick={handleDecrement} className='absolute left-0 top-[50%] translate-y-[40%] w-[35px] h-[35px] bg-orange-500 rounded-full text-white z-10'>
                                          <FontAwesomeIcon
                                                icon={faArrowAltCircleLeft}
                                          />
                                    </button>
                                    {/* right button */}
                                    <button onClick={handleIncrement} className='absolute right-0 top-[50%] translate-y-[40%] w-[35px] h-[35px] bg-orange-500 rounded-full text-white z-10'>
                                          <FontAwesomeIcon
                                                icon={faArrowAltCircleRight}
                                          />
                                    </button>
                                    <Image
                                          layout='fill'
                                          className={"object-contain object-center h-full max-w-[80%] rounded-md"}
                                          src={photoUrl?.photo}
                                          alt='demo'
                                    />
                              </div>
                        </Dialog>
                  </div>
            </div>
      );
};

export default ProfilePhotos;