import React from 'react';
import useWindowSize from '../../hook/useWindowSize';
import MobileSidebar from './MobileSidebar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
      const windowWidth = useWindowSize();
      return (
            <div className='w-full h-auto flex flex-col md:flex-row'>
                  {
                        windowWidth.width > 768 ?
                              <Sidebar /> :
                              <MobileSidebar />
                  }
                  <div className='w-full md:w-[calc(100%-270px)] min-h-screen mt-4 md:mt-[70px] ml-0 md:ml-[270px] mr-0 md:mr-2 mb-0 md:mb-2 p-2 md:p-4'>
                        {children}
                  </div>
            </div>
      );
};

export default DashboardLayout;