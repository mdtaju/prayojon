import Image from 'next/legacy/image';
import React from 'react';

const TitleContainer = ({ title }) => {
      return (
            <div className='mb-4 text-center border-b border-gray-300 pb-2'>
                  <div className='w-[160px] h-[40px] relative mx-auto'>
                        <Image
                              src={"/images/logo-full.svg"}
                              alt='logo'
                              layout='fill'
                              className='object-contain'
                        />
                  </div>
                  <p className='text-sm font-semibold text-gray-800 italic'>{title}</p>
            </div>
      );
};

export default TitleContainer;