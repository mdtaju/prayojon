import React from 'react';

const TopAreaItem = ({ classes, title, price }) => {
      return (
            <div className={`py-2 border-dashed border-gray-400 flex items-center justify-between text-base text-gray-800 ${classes}`}>
                  <h4>{title}</h4>
                  <h4>{price} TK.</h4>
            </div>
      );
};

export default TopAreaItem;