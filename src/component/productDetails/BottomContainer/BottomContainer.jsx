import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axiosInstance from "../../../config/axios";
import thousandFormate from "../../../utils/thousandFormate";

const BottomContainer = ({ id }) => {
      const [products, setProducts] = useState([]);

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
      console.log(products)
      return (
            <div className='w-full common_shadow my-4 sm:my-6'>
                  <h1 className='text-lg font-semibold text-gray-800 mb-4'>Similar Products</h1>
                  <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                        {
                              products?.map((p, i) => (
                                    <div className='border border-gray-300 rounded-md' key={i}>
                                          <Link href={`/marketplace/${p.product_id}`}>
                                                <div className='w-full h-[200px] relative'>
                                                      <Image
                                                            src={p.file}
                                                            alt={p.product_title}
                                                            layout='fill'
                                                            className='rounded-t-md absolute object-cover object-center'
                                                      />
                                                </div>
                                                <div className='p-2'>
                                                      <h1 className='text-sm font-medium text-gray-700'>{p.product_title}</h1>
                                                      <p className='text-orange-500 font-medium'>BTD {thousandFormate(+p.price)}</p>
                                                </div>
                                          </Link>
                                    </div>
                              ))
                        }
                  </div>
            </div>
      );
};

export default BottomContainer;