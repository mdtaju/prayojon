import React from 'react';
import CreatePost from './CreatePost';
import UserPost from './UserPost/UserPost';
const HomeMiddleSide = () => {
      return (
            <div className='w-full md:w-[740px] mx-auto p-2 sm:py-4 sm:px-8'>

                  {/* Create post and post all width are 500px for large view */}
                  <div className='w-full sm:w-[500px] mx-auto'>
                        {/* CreatePost component */}
                        <CreatePost />
                        {/* Post component */}
                        <UserPost />
                        <UserPost />
                        <UserPost />
                  </div>
            </div>
      );
};

export default HomeMiddleSide;