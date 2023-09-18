
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

// check the file 
function isImage(filename) {
      const getEx = filename.split(".").pop();
      if (getEx.includes("png") || getEx.includes("jpg") || getEx.includes("jpeg") || getEx.includes("gif")) {
            return true
      } else {
            return false
      }
}

const ImageArea = ({ files = [] }) => {
      const [productFiles, setProductFiles] = useState(files);
      const [selectedFile, setSelectedFile] = useState("");

      useEffect(() => {
            if (files?.length > 0) {
                  setProductFiles(files);
                  setSelectedFile(files[0]?.file_path);
            }
      }, [files]);

      return (
            <div className='w-full sm:w-[380px] shrink-0'>
                  <div className="common_shadow w-full h-[320px] bg-gray-800 relative">
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
                  <div className='common_shadow grid grid-cols-4 mt-4 gap-4'>
                        {
                              productFiles?.map((file, i) => (
                                    <div key={i} className='cursor-pointer'>
                                          {
                                                (isImage(file?.file_path)) ?
                                                      <img
                                                            onClick={() => setSelectedFile(file?.file_path)}
                                                            src={file?.file_path}
                                                            alt='product_file'
                                                            // layout='fill'
                                                            className=' object-contain object-center rounded-md'
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
                              ))
                        }
                  </div>
            </div>
      );
};

export default ImageArea;