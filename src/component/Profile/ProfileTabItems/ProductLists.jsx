import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetProductPostsQuery } from '../../../features/userPost/userPostApi';
import ProductCard from '../../dashboard/Products/ProductCard';

const ProductLists = ({ UID = false }) => {
      const [products, setProducts] = useState([]);
      const { data } = useGetProductPostsQuery();
      const { data: session } = useSession();

      useEffect(() => {
            if (session?.user?.email && data) {
                  const uId = UID ? UID : session?.user?.email;
                  const getProducts = data?.filter((pr) => pr.user_id == uId);
                  setProducts(getProducts);
            }
      }, [data, session, UID]);

      return (
            <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <h1 className='mt-4 text-xl font-semibold text-gray-900'>Lists</h1>
                  <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 place-content-center'>
                        {
                              products.map((pr, i) => (
                                    <ProductCard key={i} product={pr} isDialogStay />
                              ))
                        }
                  </div>
            </div>
      );
};

export default ProductLists;