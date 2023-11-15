
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Slider from "react-slick";

// check the file 
function isImage(filename) {
      const getEx = filename.split(".").pop()?.toLowerCase();
      if (getEx.includes("png") || getEx.includes("jpg") || getEx.includes("jpeg") || getEx.includes("gif")) {
            return true
      } else {
            return false
      }
}

function NextArrow(props) {
      const { onClick } = props;
      return (
            <div
                  className={`absolute right-1 top-[50%] translate-y-[-50%] z-10 cursor-pointer rounded-full w-[32px] h-[32px] grid place-items-center bg-primary text-white`}
                  onClick={onClick}>
                  <FontAwesomeIcon
                        icon={faAngleRight}
                  />

            </div>
      );
}

function PrevArrow(props) {
      const { onClick } = props;
      return (
            <div
                  className={`absolute left-1 top-[50%] translate-y-[-50%] z-10 cursor-pointer rounded-full w-[32px] h-[32px] grid place-items-center bg-primary text-white`}
                  onClick={onClick}>
                  <FontAwesomeIcon
                        icon={faAngleLeft}
                  />
            </div>
      );
}

const ImageArea = ({ files = [] }) => {
      const [productFiles, setProductFiles] = useState(files);
      const [selectedFile, setSelectedFile] = useState("");
      const settings = {
            dots: false,
            rows: 1,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 3,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                  // {
                  //       breakpoint: 480,
                  //       settings: {
                  //             slidesToShow: 3,
                  //             infinite: true,
                  //             dots: true
                  //       }
                  // },
                  // {
                  //       breakpoint: 600,
                  //       settings: {
                  //             slidesToShow: 2,
                  //             initialSlide: 2
                  //       }
                  // },
                  // {
                  //       breakpoint: 480,
                  //       settings: {
                  //             slidesToShow: 1,
                  //       }
                  // }
            ]
      };

      useEffect(() => {
            if (files?.length > 0) {
                  setProductFiles(files);
                  setSelectedFile(files[0]?.file_path);
            }
      }, [files]);

      return (
            <div className='w-full sm:w-[380px]'>
                  <div className="p-2 border border-gray-300 w-full h-[320px] relative rounded-md">
                        {
                              (isImage(selectedFile)) ?
                                    <img
                                          src={selectedFile}
                                          alt='product_file'
                                          // layout='fill'
                                          className=' w-full h-full object-contain object-center rounded-md'
                                    />
                                    :
                                    <div className='w-full h-full'>
                                          <ReactPlayer
                                                width={"100%"}
                                                height={"100%"}
                                                url={selectedFile}
                                                controls
                                                playing={true}
                                          />
                                    </div>
                        }
                  </div>
                  <div className='h-[80px] my-2 overflow-hidden'>
                        <Slider {...settings} style={{ width: "100%", height: "100%" }}>
                              {
                                    productFiles?.map((file, i) => (
                                          <div key={i} className='w-[140px] h-[80px] cursor-pointer px-1'>
                                                <div className='w-full h-full relative p-1 border border-orange-400 rounded-md'>
                                                      {
                                                            (isImage(file?.file_path)) ?
                                                                  <img
                                                                        onClick={() => setSelectedFile(file?.file_path)}
                                                                        src={file?.file_path}
                                                                        alt='product_file'
                                                                        // layout='fill'
                                                                        className='w-[88%] h-[88%] absolute object-contain object-center rounded-md'
                                                                  />
                                                                  :
                                                                  <div className='w-full h-full' onClick={() => setSelectedFile(file?.file_path)}>
                                                                        <ReactPlayer
                                                                              width={"100%"}
                                                                              height={"100%"}
                                                                              url={file?.file_path}
                                                                              // controls
                                                                              playing={false}
                                                                        />
                                                                  </div>
                                                      }
                                                </div>
                                          </div>
                                    ))
                              }
                        </Slider>
                  </div>
            </div>
      );
};

export default ImageArea;