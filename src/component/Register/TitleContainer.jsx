import React from 'react';

const TitleContainer = ({ title }) => {
      return (
            <div className='mb-4 text-center border-b border-gray-300 pb-2'>
                  <h1 className='text-primary text-2xl font-bold'>Prayojon</h1>
                  <p>{title}</p>
            </div>
      );
};

export default TitleContainer;