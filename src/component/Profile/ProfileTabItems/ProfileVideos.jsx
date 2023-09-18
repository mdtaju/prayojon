import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useGetUPostsImagesQuery } from '../../../features/userPost/userPostApi';
import useWindowSize from '../../../hook/useWindowSize';
import VideoItem from './VideoItem';

const ProfileVideos = ({ UID = false }) => {
      const { data: session } = useSession();
      const { data } = useGetUPostsImagesQuery();
      const [videoFiles, setVideoFiles] = useState([]);
      const [videoUrl, setVideoUrl] = useState({
            url: "",
            vIndex: ""
      });
      const [open, setOpen] = useState(false);
      const windowSize = useWindowSize();

      const handleClose = () => {
            setOpen(false);
      };

      const handleIncrement = () => {
            setVideoUrl((prevState) => {
                  const getItem = videoFiles.find((item, i) => i === prevState.vIndex + 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              vIndex: prevState.vIndex + 1,
                              url: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      const handleDecrement = () => {
            setVideoUrl((prevState) => {
                  const getItem = videoFiles.find((item, i) => i === prevState.vIndex - 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              vIndex: prevState.vIndex - 1,
                              url: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      useEffect(() => {
            if (data) {
                  const uId = UID ? UID : session?.user?.email;
                  const getVideoFiles = data?.filter((file) => file.user_id == uId && file.file_type === "Video");
                  setVideoFiles(getVideoFiles);
            }
      }, [data, session, UID]);

      return (
            <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <h1 className='mt-4 text-xl font-semibold text-gray-900'>Videos</h1>
                  <div className='w-full mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 place-content-center'>
                        {
                              videoFiles.map((v, i) => (
                                    <VideoItem key={i} index={i} video={v} setVideoUrl={setVideoUrl} setOpen={setOpen} />
                              ))
                        }
                  </div>
                  {/* video dialog */}
                  <Dialog
                        // fullWidth
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
                        <div className='py-4 px-8 relative bg-black'>
                              {/* close button */}
                              <button onClick={() => setOpen(false)} className='absolute right-0 top-0 w-[35px] h-[35px] bg-red-500 rounded-full text-white'>
                                    <FontAwesomeIcon
                                          icon={faClose}
                                    />
                              </button>
                              {/* left button */}
                              <button onClick={handleDecrement} className='absolute left-0 top-[50%] translate-y-[40%] w-[35px] h-[35px] bg-orange-500 rounded-full text-white'>
                                    <FontAwesomeIcon
                                          icon={faArrowAltCircleLeft}
                                    />
                              </button>
                              {/* right button */}
                              <button onClick={handleIncrement} className='absolute right-0 top-[50%] translate-y-[40%] w-[35px] h-[35px] bg-orange-500 rounded-full text-white'>
                                    <FontAwesomeIcon
                                          icon={faArrowAltCircleRight}
                                    />
                              </button>
                              <ReactPlayer
                                    // className={"w-full"}
                                    width={"100%"}
                                    style={{ borderRadius: "5px" }}
                                    url={videoUrl?.url}
                                    controls
                                    playing={true}
                              />
                        </div>
                  </Dialog>
            </div>
      );
};

export default ProfileVideos;