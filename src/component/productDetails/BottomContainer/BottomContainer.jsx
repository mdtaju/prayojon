import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axiosInstance from "../../../config/axios";
import ProductCard from '../../dashboard/Products/ProductCard';



function NextArrow(props) {
      const { onClick } = props;
      return (
            <div
                  className={`absolute right-1 top-[50%] translate-y-[-50%] z-10 cursor-pointer rounded-full w-[32px] h-[32px] grid place-items-center bg-primary text-white`}
                  onClick={onClick}>
                  <FontAwesomeIcon
                        icon={faAngleRight}
                  />

            </div>
      );
}

function PrevArrow(props) {
      const { onClick } = props;
      return (
            <div
                  className={`absolute left-1 top-[50%] translate-y-[-50%] z-10 cursor-pointer rounded-full w-[32px] h-[32px] grid place-items-center bg-primary text-white`}
                  onClick={onClick}>
                  <FontAwesomeIcon
                        icon={faAngleLeft}
                  />
            </div>
      );
}


const BottomContainer = ({ id }) => {
      const [products, setProducts] = useState([]);
      const settings = {
            dots: false,
            // rows: 1,
            infinite: false,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 4,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                  {
                        breakpoint: 1024,
                        settings: {
                              slidesToShow: 4,
                        }
                  },
                  {
                        breakpoint: 768,
                        settings: {
                              slidesToShow: 2,
                        }
                  },
                  {
                        breakpoint: 425,
                        settings: {
                              slidesToShow: 1,
                        }
                  }
            ]
      };

      useEffect(() => {
            if (id) {
                  async function getProducts() {
                        const res = await axiosInstance.get(`/similar_product/${id}`);
                        if (res?.data?.length > 0) {
                              setProducts(res?.data)
                        }
                  }
                  getProducts()
            }
      }, [id]);

      return (
            <div className='w-full my-4 sm:my-6'>
                  <h1 className='text-lg font-semibold text-gray-800 mb-4'>Similar Products</h1>
                  <div className=''>
                        <Slider {...settings}>
                              {
                                    products?.map((p, i) => (
                                          <div key={i} className='px-1'>
                                                <ProductCard
                                                      product={p}
                                                      isDialogStay={true}
                                                />
                                          </div>
                                    ))
                              }
                        </Slider>
                  </div>
            </div>
      );
};

export default BottomContainer;
// <div className='border border-gray-300 rounded-md' key={i}>
//       <Link href={`/marketplace/${p.product_id}`}>
//             <div className='w-full h-[200px] relative'>
//                   <Image
//                         src={p.file}
//                         alt={p.product_title}
//                         layout='fill'
//                         className='rounded-t-md absolute object-cover object-center'
//                   />
//             </div>
//             <div className='p-2'>
//                   <h1 className='text-sm font-medium text-gray-700'>{p.product_title}</h1>
//                   <p className='text-orange-500 font-medium'>BTD {thousandFormate(+p.price)}</p>
//             </div>
//       </Link>
// </div>