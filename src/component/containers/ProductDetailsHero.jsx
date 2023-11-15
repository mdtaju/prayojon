import React from 'react';
import BottomContainer from '../productDetails/BottomContainer/BottomContainer';
import MiddleContainer from '../productDetails/MiddleContainer/MiddleContainer';
import TopContainer from '../productDetails/TopContainer/TopContainer';

const ProductDetailsHero = ({ product }) => {

      return (
            <div className='container mx-auto mt-[20px] md:mt-[80px]'>
                  {/* Top Container */}
                  <TopContainer product={product} />
                  {/* Middle Container */}
                  <MiddleContainer product={product} />
                  {/* Bottom container */}
                  <BottomContainer id={product?.id} />
            </div>
      );
};

export default ProductDetailsHero;