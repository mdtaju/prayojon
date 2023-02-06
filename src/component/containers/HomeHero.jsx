import React from 'react';
import HomeLeftNavigation from '../csr/HomeLeftNavigation/HomeLeftNavigation';
import HomeRightSide from '../csr/HomeRightSide/HomeRightSide';
import HomeMiddleSide from '../ssr/HomeMiddleSide/HomeMiddleSide';

const HomeHero = () => {
      return (
            <div className='w-full min-h-full relative'>
                  <HomeLeftNavigation />
                  <HomeMiddleSide />
                  <HomeRightSide />
            </div>
      );
};

export default HomeHero;