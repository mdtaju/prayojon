import { faBoxOpen, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect, useState } from 'react';


const E_PostTitleDes = ({ postContent = "", productTitle, location, category }) => {
      const [textExpand, setTextExpand] = useState(false);


      // description expand
      useEffect(() => {
            if (postContent.length > 200) {
                  setTextExpand(false)
            } else {
                  setTextExpand(true)
            }
      }, [postContent])
      return (
            <div className='w-full p-1 sm:p-4 border-t border-gray-300'>
                  {/* title to description part */}
                  <div className=''>
                        <h1 className='text-xl font-semibold text-gray-800'>{productTitle}</h1>
                        <div className='flex items-center gap-2 mt-1 text-gray-500'>
                              <div>
                                    <FontAwesomeIcon
                                          icon={faLocationDot}
                                    />
                              </div>
                              <span>{location}</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-500'>
                              <div>
                                    <FontAwesomeIcon
                                          icon={faBoxOpen}
                                    />
                              </div>
                              <span>{category}</span>
                        </div>
                        <div className='mt-2'>
                              <p className='common_description'>{
                                    !textExpand ?
                                          <>
                                                {postContent.slice(0, 220)}
                                                {"... "}
                                                <span
                                                      onClick={() => setTextExpand(true)}
                                                      className='font-semibold cursor-pointer hover:underline'>{"See more"}</span>
                                          </> :
                                          <>
                                                {postContent}
                                          </>
                              }</p>
                        </div>
                  </div>
            </div>
      );
};

export default memo(E_PostTitleDes);