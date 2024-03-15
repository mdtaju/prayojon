import { useRouter } from 'next/router';
import React from 'react';

const RouteToggle = ({ title, path }) => {
      const router = useRouter();
      return (
            <div className='text-center w-full'>
                  <button
                        onClick={() => router.replace(path)}
                        className='input_submit_btn w-full bg-green-600'>{title}</button>
            </div>
      );
};

export default RouteToggle;