import { faClipboard, faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PostsFilter = ({ postType, setPostType }) => {

      // post type = product handler
      const handleProduct = () => {
            setPostType("product");
      }

      // post type = general handler
      const handleGeneral = () => {
            setPostType("general");
      }

      return (
            <div className='w-full mb-4 common_shadow p-0 grid grid-cols-2'>
                  {/* product type post button */}
                  <div onClick={handleProduct} className={`p-1 cursor-pointer grid place-items-center hover:bg-gray-100 rounded-tl-md ${postType === "product" ? "border-b-2 border-orange-500" : ""}`}>
                        <div className={`w-fit text-center ${postType === "product" ? "text-orange-500" : "text-gray-700"}`}>
                              <FontAwesomeIcon
                                    className='text-base'
                                    icon={faRocket}
                              />
                              <p className='text-sm font-bold'>DISCOVER</p>
                        </div>
                  </div>
                  {/* general type post button */}
                  <div onClick={handleGeneral} className={`p-1 cursor-pointer grid place-items-center hover:bg-gray-100 rounded-tr-md ${postType === "general" ? "border-b-2 border-orange-500" : ""}`}>
                        <div className={`w-fit text-center ${postType === "general" ? "text-orange-500" : "text-gray-700"}`}>
                              <FontAwesomeIcon
                                    className='text-base'
                                    icon={faClipboard}
                              />
                              <p className='text-sm font-bold'>FEED</p>
                        </div>
                  </div>
            </div>
            // <div className='flex gap-4 mb-3'>
            //       <div className='flex items-center gap-2'>
            //             <input
            //                   type="radio"
            //                   value={"product"}
            //                   onChange={(e) => setPostType(e.target.value)}
            //                   checked={postType === "product"} />
            //             <p>Product</p>
            //       </div>
            //       <div className='flex items-center gap-2'>
            //             <input
            //                   type="radio"
            //                   value={"general"}
            //                   onChange={(e) => setPostType(e.target.value)}
            //                   checked={postType === "general"} />
            //             <p>General</p>
            //       </div>
            // </div>
      );
};

export default PostsFilter;