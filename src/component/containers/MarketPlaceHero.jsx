import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductPostsQuery } from '../../features/userPost/userPostApi';
import { addProductPost } from '../../features/userPost/userPostSlice';
import ProductsContainer from '../marketplace/ProductsContainer/ProductsContainer';
import Sidebar from '../marketplace/Sidebar/Sidebar';

const MarketPlaceHero = () => {
      const [filters, setFilters] = useState({
            priceRange: [100, 1000000],
            sizeRange: [0, 100],
            categories: "",
            subCategories: [],
            type: [],
            sort: [],
            colorType: [],
            availability: [],
            // Add more filter options as needed
      });
      const { data } = useGetProductPostsQuery();
      const [products, setProducts] = useState([]);
      const dispatch = useDispatch();
      const { searchProductPost } = useSelector(state => state?.userPost)

      useEffect(() => {
            if (data) {
                  dispatch(addProductPost(data));
            }
      }, [data, dispatch]);

      useEffect(() => {
            if (searchProductPost) {
                  const filteredProducts = searchProductPost.filter((product) => {
                        // Apply filters here
                        const { priceRange, sizeRange, categories, subCategories, type, colorType, sort, availability } = filters;
                        const getArrFromServer = product.color?.split(",")

                        // Apply price range filter
                        if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) {
                              return false;
                        }

                        // Apply size range filter
                        if (sizeRange && (product?.size < sizeRange[0] || product?.size > sizeRange[1])) {
                              return false;
                        }

                        // Apply Type filter
                        if (type.length > 0 && !type.includes(product.type)) {
                              return false;
                        }

                        // Apply Colors filter
                        if (colorType.length > 0) {
                              const getPureArr = colorType.find((item) => {
                                    return getArrFromServer.includes(item);
                              });
                              if (!getPureArr) {
                                    return false;
                              }
                        }

                        // Apply categories filter
                        if (categories.length > 0 && !categories.includes(product.category)) {
                              return false;
                        }

                        // Apply sub categories filter
                        if (subCategories.length > 0 && !subCategories.includes(product.sub_category)) {
                              return false;
                        }

                        // Apply availability filter
                        if (availability.length > 0 && !availability.includes(product.status)) {
                              return false;
                        }

                        // Add more filter conditions as needed

                        return true;
                  });
                  setProducts(filteredProducts);
            }
      }, [searchProductPost, filters]);

      return (
            <div className='w-full min-h-screen flex flex-col md:flex-row items-start gap-4'>
                  <Sidebar
                        filters={filters}
                        setFilters={setFilters}
                  />
                  <ProductsContainer
                        products={products}
                  />
            </div>
      );
};

export default MarketPlaceHero;