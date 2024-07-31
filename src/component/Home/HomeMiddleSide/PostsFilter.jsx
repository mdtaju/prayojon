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
            <div className='w-full grid grid-cols-2'>
                  {/* product type post button */}
                  <div onClick={handleProduct} className={`p-1 cursor-pointer grid place-items-center hover:bg-gray-100 rounded-tl-md ${postType === "product" ? "border-b-2 border-primary" : "border-b-2 border-gray-400"}`}>
                        <div className={`w-fit text-center ${postType === "product" ? "text-primary" : "text-gray-700"} flex items-center gap-2 py-2`}>
                              {/* <FontAwesomeIcon
                                    className='text-base'
                                    icon={faRocket}
                              /> */}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={postType === "product" ? "#1979F4" : "#8190A3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.307 9.739L15 9L14.261 12.693C14.1836 13.0801 13.9935 13.4356 13.7144 13.7148C13.4354 13.994 13.08 14.1844 12.693 14.262L9 15L9.739 11.307C9.81654 10.9201 10.0068 10.5648 10.2858 10.2858C10.5648 10.0068 10.9201 9.81654 11.307 9.739Z" stroke={postType === "product" ? "#1979F4" : "#8190A3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                              <p className='text-sm font-bold'>DISCOVER</p>
                        </div>
                  </div>
                  {/* general type post button */}
                  <div onClick={handleGeneral} className={`p-1 cursor-pointer grid place-items-center hover:bg-gray-100 rounded-tr-md ${postType === "general" ? "border-b-2 border-primary" : "border-b-2 border-gray-400"}`}>
                        <div className={`w-fit text-center ${postType === "general" ? "text-primary" : "text-gray-700"} flex items-center gap-3 py-2`}>
                              {/* <FontAwesomeIcon
                                    className='text-base'
                                    icon={faClipboard}
                              /> */}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99934 19.5493 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99934 5 3H15.175C15.4417 3 15.696 3.05 15.938 3.15C16.18 3.25 16.3923 3.39167 16.575 3.575L20.425 7.425C20.6083 7.60834 20.75 7.821 20.85 8.063C20.95 8.305 21 8.559 21 8.825V19C21 19.55 20.804 20.021 20.412 20.413C20.02 20.805 19.5493 21.0007 19 21H5ZM5 19H19V9H16C15.7167 9 15.479 8.904 15.287 8.712C15.095 8.52 14.9993 8.28267 15 8V5H5V19ZM16 17C16.2833 17 16.521 16.904 16.713 16.712C16.905 16.52 17.0007 16.2827 17 16C17 15.7167 16.904 15.479 16.712 15.287C16.52 15.095 16.2827 14.9993 16 15H8C7.71667 15 7.479 15.096 7.287 15.288C7.095 15.48 6.99934 15.7173 7 16C7 16.2833 7.096 16.521 7.288 16.713C7.48 16.905 7.71734 17.0007 8 17H16ZM11 9C11.2833 9 11.521 8.904 11.713 8.712C11.905 8.52 12.0007 8.28267 12 8C12 7.71667 11.904 7.479 11.712 7.287C11.52 7.095 11.2827 6.99934 11 7H8C7.71667 7 7.479 7.096 7.287 7.288C7.095 7.48 6.99934 7.71734 7 8C7 8.28334 7.096 8.521 7.288 8.713C7.48 8.905 7.71734 9.00067 8 9H11ZM16 13C16.2833 13 16.521 12.904 16.713 12.712C16.905 12.52 17.0007 12.2827 17 12C17 11.7167 16.904 11.479 16.712 11.287C16.52 11.095 16.2827 10.9993 16 11H8C7.71667 11 7.479 11.096 7.287 11.288C7.095 11.48 6.99934 11.7173 7 12C7 12.2833 7.096 12.521 7.288 12.713C7.48 12.905 7.71734 13.0007 8 13H16Z" fill={postType === "general" ? "#1979F4" : "#8190A3"} />
                              </svg>

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