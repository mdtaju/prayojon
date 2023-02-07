import React from 'react';
import HomeLeftNavigation from '../csr/HomeLeftNavigation/HomeLeftNavigation';
import HomeRightSide from '../csr/HomeRightSide/HomeRightSide';
import HomeMiddleSide from '../ssr/HomeMiddleSide/HomeMiddleSide';

const HomeHero = () => {
      return (
            <div className='w-full max-w-[1536px] mx-auto min-h-screen flex justify-between mt-[20px] sm:mt-[65px]'>
                  <HomeLeftNavigation />
                  <HomeMiddleSide />
                  <HomeRightSide />
            </div>
      );
};

export default HomeHero;