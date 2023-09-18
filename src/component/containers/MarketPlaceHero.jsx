import React, { useEffect, useState } from 'react';
import { useGetProductPostsQuery } from '../../features/userPost/userPostApi';
import ProductsContainer from '../marketplace/ProductsContainer/ProductsContainer';
import Sidebar from '../marketplace/Sidebar/Sidebar';

const MarketPlaceHero = () => {
      const [filters, setFilters] = useState({
            priceRange: [100, 1000000],
            categories: [],
            type: [],
            sort: [],
            availability: [],
            // Add more filter options as needed
      });
      const { data } = useGetProductPostsQuery();
      const [products, setProducts] = useState([]);

      useEffect(() => {
            if (data) {
                  const filteredProducts = data.filter((product) => {
                        // Apply filters here
                        const { priceRange, categories, type, sort, availability } = filters;

                        // Apply price range filter
                        if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) {
                              return false;
                        }

                        // Apply Type filter
                        if (type.length > 0 && !type.includes(product.type)) {
                              return false;
                        }

                        // Apply categories filter
                        if (categories.length > 0 && !categories.includes(product.category)) {
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
      }, [data, filters]);

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