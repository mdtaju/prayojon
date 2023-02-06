import React from 'react';
import CreatePost from './CreatePost';
import UserPost from './UserPost/UserPost';

const HomeMiddleSide = () => {
      return (
            <div className='w-[740px] mx-auto py-4 px-8'>

                  {/* Create post and post all width are 500px for large view */}
                  <div className='w-[500px] mx-auto'>
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