import React from 'react';
import ReactPlayer from 'react-player';

const VideoItem = ({ video = {}, open, setOpen, index, setVideoUrl }) => {
      const { file_path } = video;

      const handleOpen = () => {
            setVideoUrl({
                  url: file_path,
                  vIndex: index
            });
            setOpen(true)
      }
      return (
            <>

                  <div className='w-full h-[150px] bg-black cursor-pointer' onClick={() => handleOpen()}>
                        <ReactPlayer
                              width={"100%"}
                              height={"100%"}
                              className="object-cover object-center"
                              style={{ borderRadius: "5px" }}
                              url={file_path}
                              playing={false}
                        />
                  </div>
            </>
      );
};

export default VideoItem;