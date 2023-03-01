import React from 'react';
import useWindowSize from '../../hook/useWindowSize';
import HomeLeftNavigation from '../Home/HomeLeftNavigation/HomeLeftNavigation';
import HomeMiddleSide from '../Home/HomeMiddleSide/HomeMiddleSide';
import HomeRightSide from '../Home/HomeRightSide/HomeRightSide';

const HomeHero = () => {
      const useWindow = useWindowSize();
      return (
            <div className='w-full max-w-[1536px] mx-auto min-h-screen flex justify-between mt-[20px] sm:mt-[65px]'>
                  {
                        useWindow.width > 768 &&
                        <HomeLeftNavigation />
                  }
                  <HomeMiddleSide />
                  <HomeRightSide />
            </div>
      );
};

export default HomeHero;