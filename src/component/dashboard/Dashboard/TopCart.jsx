import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const TopCart = ({ Icon, amount, title, subtitle, bg, text }) => {
      return (
            <div
                  // style={{ backgroundImage: "url('/images/grhap.png')" }} 
                  className={`dashboard_cart_shadow bg-white rounded-sm p-3 flex flex-col gap-4 items-center bg-cover `}>
                  <div className={`py-4 px-6 rounded-sm ${bg}`}>
                        <FontAwesomeIcon
                              icon={Icon}
                              className={`${text} text-2xl font-bold`}
                        />
                  </div>
                  <h1 className='text-5xl font-bold text-gray-800'>{amount}</h1>
                  <h4 className={`${text} text-lg font-bold`}>{title}</h4>
                  <p className='text-sm text-gray-400 font-semibold'>{subtitle}</p>
            </div>
      );
};

export default TopCart;