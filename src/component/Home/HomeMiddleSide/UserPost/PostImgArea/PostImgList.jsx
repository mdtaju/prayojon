import { faCircleChevronLeft, faCircleChevronRight, faPlayCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import React, { memo, useState } from 'react';
import useWindowSize from '../../../../../hook/useWindowSize';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const PostImgList = ({ images }) => {
      const [open, setOpen] = useState(false);
      const [imgUrl, setImgUrl] = useState({
            imgLink: "",
            imgIndex: ""
      });
      const windowSize = useWindowSize()
      const handleClose = () => {
            setOpen(false);
      };

      // dialog open image right arrow button 
      const handleImgIncrement = () => {
            setImgUrl((prevState) => {
                  const getItem = images.find((item, i) => i === prevState.imgIndex + 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              imgIndex: prevState.imgIndex + 1,
                              imgLink: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      // dialog open image left arrow button 
      const handleImgDecrement = () => {
            setImgUrl((prevState) => {
                  const getItem = images.find((item, i) => i === prevState.imgIndex - 1);
                  if (getItem) {
                        return {
                              ...prevState,
                              imgIndex: prevState.imgIndex - 1,
                              imgLink: getItem?.file_path
                        }
                  } else {
                        return prevState
                  }
            })
      }

      // dialog open handler
      const handleOpen = (img, i) => {
            setImgUrl({
                  imgLink: img,
                  imgIndex: i
            })
            setOpen(true)
      }

      // what to render
      let content;
      if (images?.length === 1) {
            content = ((images[0]?.file_path?.split(".")?.pop() === "mp4") || (images[0]?.file_path?.split(".")?.pop() === "mkv") || (images[0]?.file_path?.split(".")?.pop() === "ts")) ? <div onClick={() => handleOpen(images[0]?.file_path, 0)} className='h-[300px] bg-black relative w-full cursor-pointer'>
                  <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        url={images[0]?.file_path}
                        // controls
                        playIcon={<button><FontAwesomeIcon icon={faPlayCircle} className='text-4xl text-white' /></button>}
                        light
                        playing={false}
                  />
            </div> : <div onClick={() => handleOpen(images[0]?.file_path, 0)} className='h-[300px] w-full relative cursor-pointer'>
                  <Image
                        src={images[0]?.file_path}
                        alt={images[0]?.file_name}
                        layout='fill'
                        className='object-cover object-center'
                  />
            </div>

      } else if (images?.length === 2) {
            content = <div className='flex flex-col gap-1'>
                  {
                        images?.map((img, i) => {
                              if ((images[i]?.file_path?.split(".")?.pop() === "mp4") || (images[i]?.file_path?.split(".")?.pop() === "mkv") || (images[i]?.file_path?.split(".")?.pop() === "ts")) {
                                    return (
                                          <div key={i} onClick={() => handleOpen(img?.file_path, i)} className='h-[300px] bg-black relative w-full cursor-pointer'>
                                                <ReactPlayer
                                                      width={"100%"}
                                                      height={"100%"}
                                                      url={img?.file_path}
                                                      playIcon={<button><FontAwesomeIcon icon={faPlayCircle} className='text-4xl text-white' /></button>}
                                                      light
                                                      playing={false}
                                                />
                                          </div>
                                    )
                              } else {
                                    return (
                                          <div onClick={() => handleOpen(img?.file_path, i)} key={i} className='h-[300px] w-full relative cursor-pointer'>
                                                <Image
                                                      src={img?.file_path}
                                                      alt={img?.file_name}
                                                      layout='fill'
                                                      className='object-cover object-center'
                                                />
                                          </div>
                                    )
                              }

                        })
                  }
            </div>
      } else if (images?.length >= 3) {
            content = <div className='flex flex-col gap-1'>
                  <div onClick={() => handleOpen(images[0]?.file_path, 0)} className='h-[300px] w-full relative cursor-pointer'>
                        {
                              (images[0]?.file_path?.split(".")?.pop() === "mp4") || (images[0]?.file_path?.split(".")?.pop() === "mkv") || (images[0]?.file_path?.split(".")?.pop() === "ts") ? <ReactPlayer
                                    width={"100%"}
                                    height={"100%"}
                                    url={images[0]?.file_path}
                                    // controls
                                    playIcon={<button><FontAwesomeIcon icon={faPlayCircle} className='text-4xl text-white' /></button>}
                                    light
                                    playing={false}
                              /> :
                                    <Image
                                          src={images[0]?.file_path}
                                          alt={images[0]?.file_name}
                                          layout='fill'
                                          className='object-cover object-center'
                                    />
                        }
                  </div>
                  <div className='h-[300px] w-full flex gap-1'>
                        <div onClick={() => handleOpen(images[1]?.file_path, 1)} className='h-[300px] w-full relative cursor-pointer'>
                              {
                                    (images[1]?.file_path?.split(".")?.pop() === "mp4") || (images[1]?.file_path?.split(".")?.pop() === "mkv") || (images[1]?.file_path?.split(".")?.pop() === "ts") ?
                                          <ReactPlayer
                                                width={"100%"}
                                                height={"100%"}
                                                url={images[1]?.file_path}
                                                // controls
                                                playIcon={<button><FontAwesomeIcon icon={faPlayCircle} className='text-4xl text-white' /></button>}
                                                light
                                                playing={false}
                                          /> :
                                          <Image
                                                src={images[1]?.file_path}
                                                alt={images[1]?.file_name}
                                                layout='fill'
                                                className='object-cover object-center'
                                          />
                              }
                        </div>
                        <div onClick={() => handleOpen(images[2]?.file_path, 2)} className='h-[300px] w-full relative cursor-pointer'>
                              {
                                    (images[2]?.file_path?.split(".")?.pop() === "mp4") || (images[2]?.file_path?.split(".")?.pop() === "mkv") || (images[2]?.file_path?.split(".")?.pop() === "ts") ?
                                          <ReactPlayer
                                                width={"100%"}
                                                height={"100%"}
                                                url={images[2]?.file_path}
                                                // controls
                                                playIcon={<button><FontAwesomeIcon icon={faPlayCircle} className='text-4xl text-white' /></button>}
                                                light
                                                playing={false}
                                          /> :
                                          <Image
                                                src={images[2]?.file_path}
                                                alt={images[2]?.file_name}
                                                layout='fill'
                                                className='object-cover object-center'
                                          />
                              }
                              {
                                    images?.length > 3 &&
                                    <div className='w-full h-full absolute top-0 z-10 bg-black opacity-60 grid place-items-center'>
                                          <span className='text-white font-semibold text-sm'>More {images?.length - 3}</span>
                                    </div>
                              }
                        </div>
                  </div>
            </div>
      } else {
            content = <></>
      }

      return (
            <>
                  <Dialog
                        open={open}
                        onClose={handleClose}
                        fullScreen={windowSize.width > 768 ? false : true}
                        PaperProps={windowSize.width > 768 ?
                              {
                                    style: {
                                          borderRadius: '10px',
                                          width: '700px',
                                          height: "90vh",
                                          backgroundColor: "#000"
                                    }
                              } :
                              {}
                        }
                  >
                        <div className='w-full text-right py-2 px-4 z-50'>
                              <button
                                    onClick={handleClose}
                                    className='w-[32px] h-[32px] rounded-full bg-red-500 text-white cursor-pointer'>
                                    <FontAwesomeIcon
                                          icon={faXmark}
                                    />
                              </button>
                        </div>
                        <DialogContent
                        // sx={
                        //       windowSize.width > 425 ?
                        //             {} :
                        //             { padding: '10px' }
                        // }
                        >
                              <button
                                    onClick={handleImgDecrement}
                                    style={{ zIndex: "8000" }}
                                    className='absolute bg-white w-[30px] h-[30px] rounded-full left-3 top-[50%] translate-y-[-50%]'
                              >
                                    <FontAwesomeIcon
                                          className='text-lg cursor-pointer'
                                          icon={faCircleChevronLeft}
                                    />
                              </button>
                              {
                                    (imgUrl?.imgLink?.split(".")?.pop() === "mp4") || (imgUrl?.imgLink?.split(".")?.pop() === "mkv") || (imgUrl?.imgLink?.split(".")?.pop() === "ts") ?
                                          <ReactPlayer
                                                width={"100%"}
                                                height={"100%"}
                                                url={imgUrl?.imgLink}
                                                controls
                                                playing={true}
                                          /> :
                                          <Image
                                                src={imgUrl?.imgLink}
                                                layout="fill"
                                                alt='post-img'
                                                className='object-contain rounded-md'
                                          />
                              }
                              <button
                                    onClick={handleImgIncrement}
                                    style={{ zIndex: "8000" }}
                                    className='absolute bg-white w-[30px] h-[30px] rounded-full right-3 top-[50%] translate-y-[-50%]'
                              >
                                    <FontAwesomeIcon
                                          className='text-lg cursor-pointer'
                                          icon={faCircleChevronRight}
                                    />
                              </button>
                        </DialogContent>
                  </Dialog>
                  <div className='w-full h-auto'>
                        {content}
                  </div>
            </>
      );
};

export default memo(PostImgList);