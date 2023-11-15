import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';

const CreatePostFooter = ({
      setChooseImgToggle,
      postTypeValue,
      description,
      storeFiles,
      handlePostSubmit,
      isProductReadyForSubmit,
      postLoading
}) => {
      return (
            <div className='w-full p-2 flex flex-col gap-2'>
                  <div className='w-full flex items-center justify-center gap-3 border border-gray-300 p-2 rounded-md'>
                        <span className='text-base font-semibold'>Add to your post</span>
                        {/* open button */}
                        <div
                              onClick={() => setChooseImgToggle(true)}
                              className='w-[40px] h-[40px] grid place-items-center bg-green-100 rounded-full cursor-pointer active:scale-95 duration-150'>
                              <FontAwesomeIcon
                                    icon={faImages}
                                    className='text-green-600'
                              />
                        </div>
                  </div>
                  {/* post button validation */}
                  {
                        postTypeValue === "General" ?
                              (description || storeFiles.length !== 0) ?
                                    <>
                                          {
                                                !postLoading ?
                                                      <button onClick={handlePostSubmit} className='btn_primary w-full'>Post</button> :
                                                      <button disabled onClick={handlePostSubmit} className='btn_primary w-full'>
                                                            <CircularProgress color='inherit' size={16} />
                                                      </button>
                                          }
                                    </>
                                    :
                                    <button disabled className='btn_primary w-full active:scale-100 bg-gray-300 text-gray-800 cursor-not-allowed'>Post</button>
                              :
                              (isProductReadyForSubmit) ?
                                    <>
                                          {
                                                !postLoading ?
                                                      <button onClick={handlePostSubmit} className='btn_primary w-full'>Post</button> :
                                                      <button disabled className='btn_primary w-full'>
                                                            <CircularProgress color='inherit' size={16} />
                                                      </button>
                                          }
                                    </>
                                    :
                                    <button disabled className='btn_primary w-full active:scale-100 bg-gray-300 text-gray-800 cursor-not-allowed'>Post</button>
                  }
            </div>
      );
};

export default memo(CreatePostFooter);