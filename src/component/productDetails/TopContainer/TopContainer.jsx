import dynamic from 'next/dynamic';
import React from 'react';
import DetailsArea from './DetailsArea';
import InfoRightArea from './InfoRightArea';
const ImageArea = dynamic(() => import("./ImageArea"), { ssr: false })

const TopContainer = ({ product = {} }) => {
      const { id, files, user, product_title, description, original_price, price, status, quantity, type, location } = product;
      return (
            <div className='w-full flex flex-col md:flex-row items-start gap-4 common_shadow'>
                  <ImageArea files={files} />
                  {/* <div className='flex-1 flex items-start justify-between gap-4'> */}
                  <DetailsArea
                        id={id}
                        title={product_title}
                        description={description}
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