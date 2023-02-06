import React from 'react';
import HomeLeftNavigation from '../csr/HomeLeftNavigation/HomeLeftNavigation';
import HomeRightSide from '../csr/HomeRightSide/HomeRightSide';
import HomeMiddleSide from '../ssr/HomeMiddleSide/HomeMiddleSide';

const HomeHero = () => {
      return (
            <div className='container mx-auto min-h-screen flex justify-between mt-[65px]'>
                  <HomeLeftNavigation />
                  <HomeMiddleSide />
                  <HomeRightSide />
            </div>
      );
};

export default HomeHero;