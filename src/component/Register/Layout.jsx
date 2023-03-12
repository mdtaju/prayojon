import React from 'react';

const Layout = ({ children }) => {
      return (
            <section className='container min-h-screen mx-auto py-6'>
                  <div className='w-[300px] sm:w-[420px] flex flex-col gap-4 mx-auto'>
                        <div className='w-full mx-auto p-4 bg-white rounded-md shadow-md'>
                              {children}
                        </div>
                  </div>
            </section>
      );
};

export default Layout;