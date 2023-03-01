import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CreatePostDropZone = ({ getRootProps, getInputProps }) => {
      return (
            <div
                  {...getRootProps()}
                  className='bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-6 grid place-items-center cursor-pointer'>
                  {/* this input tag is hidden by react-dropzone */}
                  <input
                        {...getInputProps()}
                  />
                  {/* icon and texts container in input container */}
                  <div className='w-fit flex flex-col gap-1 items-center'>
                        <div className='w-[38px] h-[38px] bg-gray-300 p-2 grid place-items-center rounded-full'>
                              <FontAwesomeIcon
                                    icon={faCloudArrowUp}
                              />
                        </div>
                        <div className='flex flex-col items-center'>
                              <span className='text-base font-semibold text-gray-700'>Add Photos/Videos</span>
                              <span className='text-sm font-normal -mt-1'>or drag and drop</span>
                        </div>
                  </div>
            </div>
      );
};

export default CreatePostDropZone;