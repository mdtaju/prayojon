import { Avatar, Rating } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

const Reviews = ({ reviews, type }) => {

      const [reviewCategories, setReviewCategories] = useState({
            avgTotal: 0,
            productQuality: 0,
            valueForMoney: 0,
            accurateDescription: 0,
            accuratePhoto: 0,
            deliveryService: 0,
            sellerService: 0
      });

      useEffect(() => {
            if (reviews?.length) {
                  if (type === "product") {
                        let totalRating = {
                              avg: 0,
                              productQuality: 0,
                              valueForMoney: 0
                        }
                        reviews.forEach((rating) => {
                              totalRating.productQuality += rating.product_quality_rating;
                              totalRating.valueForMoney += rating.value_for_money_rating;
                              totalRating.avg += rating.total_avg_rating
                        })
                        setReviewCategories((prevRating) => {
                              return {
                                    ...prevRating,
                                    productQuality: totalRating.productQuality / reviews.length,
                                    valueForMoney: totalRating.valueForMoney / reviews.length,
                                    avgTotal: totalRating.avg / reviews.length
                              }
                        })
                  } else {
                        let totalRating = {
                              avg: 0,
                              accurateDescription: 0,
                              accuratePhoto: 0,
                              deliveryService: 0,
                              sellerService: 0
                        }
                        reviews.forEach((rating) => {
                              totalRating.accurateDescription += rating.accurate_description_rating;
                              totalRating.accuratePhoto += rating.accurate_photo;
                              totalRating.deliveryService += rating.delivery_service;
                              totalRating.sellerService += rating.seller_service;
                              totalRating.avg += rating.total_avg_rating
                        })
                        setReviewCategories((prevRating) => {
                              return {
                                    ...prevRating,
                                    accurateDescription: totalRating.accurateDescription / reviews.length,
                                    accuratePhoto: totalRating.accuratePhoto / reviews.length,
                                    deliveryService: totalRating.deliveryService / reviews.length,
                                    sellerService: totalRating.sellerService / reviews.length,
                                    avgTotal: totalRating.avg / reviews.length
                              }
                        })
                  }
            }
      }, [reviews, type]);


      // what to render 
      let content;
      if (type === "product") {
            content = <>
                  <div className=''>
                        <h6 className='text-sm font-semibold'>Product Quality</h6>
                        <div className='flex items-center gap-2'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={reviewCategories.productQuality}
                                    readOnly
                                    size="medium"
                              />
                              <span>{reviewCategories.productQuality}</span>
                        </div>
                  </div>
                  <div className=''>
                        <h6 className='text-sm font-semibold'>Value for money</h6>
                        <div className='flex items-center gap-2'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={reviewCategories.valueForMoney}
                                    readOnly
                                    size="medium"
                              />
                              <span>{reviewCategories.valueForMoney}</span>
                        </div>
                  </div>
            </>
      } else {
            content = <>
                  <div className=''>
                        <h6 className='text-sm font-semibold'>Accurate Description</h6>
                        <div className='flex items-center gap-2'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={reviewCategories.accurateDescription}
                                    readOnly
                                    size="medium"
                              />
                              <span>{reviewCategories.accurateDescription}</span>
                        </div>
                  </div>
                  <div className=''>
                        <h6 className='text-sm font-semibold'>Accurate Photo</h6>
                        <div className='flex items-center gap-2'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={reviewCategories.accuratePhoto}
                                    readOnly
                                    size="medium"
                              />
                              <span>{reviewCategories.accuratePhoto}</span>
                        </div>
                  </div>
                  <div className=''>
                        <h6 className='text-sm font-semibold'>Delivery Service</h6>
                        <div className='flex items-center gap-2'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={reviewCategories.deliveryService}
                                    readOnly
                                    size="medium"
                              />
                              <span>{reviewCategories.deliveryService}</span>
                        </div>
                  </div>
                  <div className=''>
                        <h6 className='text-sm font-semibold'>Seller Service</h6>
                        <div className='flex items-center gap-2'>
                              <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={reviewCategories.sellerService}
                                    readOnly
                                    size="medium"
                              />
                              <span>{reviewCategories.sellerService}</span>
                        </div>
                  </div>
            </>
      }
      return (
            <div>
                  <h1 className='text-xl font-bold text-gray-800'>Rating and Reviews</h1>
                  <div className='flex flex-col sm:flex-row items-start gap-6 mt-6 pb-4 border-b border-gray-300'>
                        <div className='space-y-2'>
                              <h4 className='text-4xl font-semibold text-gray-800'>{reviewCategories.avgTotal}</h4>
                              <Rating
                                    name="read-only"
                                    value={reviewCategories.avgTotal}
                                    precision={0.5}
                                    readOnly
                                    size="large"
                              />
                              <p className='text-sm font-medium text-gray-500'>{reviews?.length} ratings</p>
                        </div>
                        <div className='space-y-3'>
                              {
                                    content
                              }
                        </div>
                  </div>

                  {/* review message */}
                  <div className=''>
                        {
                              reviews?.map((r, i) => (
                                    <div className='border-b py-2 border-gray-300' key={i}>
                                          <div className='flex items-start sm:items-center gap-4'>
                                                <Avatar
                                                      alt="Remy Sharp"
                                                      src={r?.buyer_info?.photo_url}
                                                      sx={{ width: 36, height: 36 }}
                                                />
                                                <div>
                                                      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-1 text-xs font-medium text-gray-600'>
                                                            <span className='hidden sm:block'>By</span>
                                                            <h1 className='text-base text-gray-800'>{r?.buyer_info?.name}</h1>
                                                            <span>{moment(r?.created_at).format("DD-MM-YYYY")}</span>
                                                      </div>
                                                      <Rating
                                                            name="read-only"
                                                            precision={0.5}
                                                            value={r?.total_avg_rating}
                                                            readOnly
                                                            size="small"
                                                      />
                                                </div>
                                          </div>
                                          <div className='mt-3'>
                                                {r?.message}
                                          </div>
                                    </div>
                              ))
                        }
                  </div>
            </div>
      );
};

export default Reviews;