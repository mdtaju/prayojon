import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../dashboard/Products/ProductCard';
import SearchBar from './SearchBar';
// const FunctionalArticle = forwardRef((props, ref) => (
//       <ProductCard
//             ref={ref}
//             product={props.p}
//             isDialogStay={true}
//       >
//             {props.p}
//       </ProductCard>
// ));

// FunctionalArticle.displayName = "FunctionalArticle";


const ProductsContainer = ({ products }) => {
      const [pageProduct, setPageProduct] = useState([]);
      const [numberOfPages, setNumberOfPages] = useState([]);
      const [activePage, setActivePage] = useState(1);

      // page count and set first page product
      useEffect(() => {
            if (products) {
                  const getPagesNumber = Math.ceil(products.length / 24);
                  let pages = []
                  for (let i = 1; i <= getPagesNumber; i++) {
                        pages.push(i);
                  }
                  setNumberOfPages(pages);
                  const getFirstPageProduct = products?.slice(0, 24);
                  setPageProduct(getFirstPageProduct);
            }
      }, [products]);

      // handle product page link 
      const handlePageLink = (num) => {
            setActivePage(num);
            const sliceStart = (num - 1) * 24;
            const sliceEnd = 24 * num;
            const getPageProducts = products?.slice(sliceStart, sliceEnd);
            setPageProduct(getPageProducts);
      }

      const handleIncrement = () => {
            const pageWillBe = activePage + 1;
            const sliceStart = (pageWillBe - 1) * 24;
            if (sliceStart > products?.length) {
                  return
            }
            const sliceEnd = 24 * pageWillBe;
            const getPageProducts = products?.slice(sliceStart, sliceEnd);
            setPageProduct(getPageProducts);
            setActivePage(activePage + 1);
      }

      const handleDecrement = () => {
            let pageWillBe;
            if (activePage > 1) {
                  pageWillBe = activePage - 1;
            } else {
                  pageWillBe = 1;
            }
            const sliceStart = (pageWillBe - 1) * 24;
            const sliceEnd = 24 * pageWillBe;
            const getPageProducts = products?.slice(sliceStart, sliceEnd);
            setPageProduct(getPageProducts);
            setActivePage(pageWillBe);
      }

      return (
            <div className='w-full md:w-[calc(100%-340px)] min-h-screen mt-0 md:mt-[80px] flex flex-col justify-between pb-6 px-4 md:px-0'>
                  {/* search bar */}
                  <div>

                        <SearchBar />
                        <div className='w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                              {/* <FlipMove className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4"> */}
                              {
                                    pageProduct?.map((p, i) => (
                                          // <FunctionalArticle key={p.id} p={p} {...p} />
                                          <ProductCard
                                                key={i}
                                                // ref={ref}
                                                product={p}
                                                isDialogStay={true}
                                          />
                                    ))
                              }
                              {/* </FlipMove> */}
                        </div>
                  </div>
                  {/* footer */}
                  <div className='mt-4 w-fit mx-auto common_shadow rounded-full flex items-center gap-4'>
                        <button onClick={handleDecrement} className='w-[30px] h-[30px] grid place-items-center rounded-full bg-orange-500 text-white'>
                              <FontAwesomeIcon
                                    icon={faAngleLeft}
                              />
                        </button>
                        {
                              numberOfPages?.slice(0, 5)?.map((n) => (
                                    <span onClick={() => handlePageLink(n)} className={`text-base font-semibold underline cursor-pointer hover:text-primary ${activePage === n ? "text-primary" : ""}`} key={n}>{n}</span>
                              ))
                        }
                        {
                              numberOfPages?.length === 6 &&
                              <span onClick={() => handlePageLink(6)} className='text-base font-semibold underline cursor-pointer hover:text-primary'>6</span>
                        }
                        {
                              numberOfPages?.length > 6 &&
                              <span className='text-base font-semibold'>...</span>
                        }
                        {
                              numberOfPages?.length > 6 &&
                              <span onClick={() => handlePageLink(numberOfPages?.length - 1)} className='text-base font-semibold underline cursor-pointer hover:text-primary'>{numberOfPages[numberOfPages?.length - 1]}</span>
                        }
                        <button onClick={handleIncrement} className='w-[30px] h-[30px] grid place-items-center rounded-full bg-orange-500 text-white'>
                              <FontAwesomeIcon
                                    icon={faAngleRight}
                              />
                        </button>
                  </div>
            </div>
      );
};

export default ProductsContainer;