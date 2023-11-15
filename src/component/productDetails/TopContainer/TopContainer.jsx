import dynamic from 'next/dynamic';
import React from 'react';
import DetailsArea from './DetailsArea';
import InfoRightArea from './InfoRightArea';
const ImageArea = dynamic(() => import("./ImageArea"), { ssr: false })

const TopContainer = ({ product = {} }) => {
      const { id, files, user, product_title, color, original_price, price, status, quantity, type, location } = product;
      return (
            <div className='w-full flex flex-col md:flex-row items-center md:items-start gap-4 common_shadow py-4'>
                  <ImageArea files={files} />
                  {/* <div className='flex-1 flex items-start justify-between gap-4'> */}
                  <DetailsArea
                        id={id}
                        title={product_title}
                        color={color}
                        originalPrice={original_price}
                        price={price}
                        status={status}
                        quantity={quantity}
                        condition={type}
                        location={location}
                  />
                  <InfoRightArea
                        user={user}
                  />
                  {/* </div> */}
            </div>
      );
};

export default TopContainer;