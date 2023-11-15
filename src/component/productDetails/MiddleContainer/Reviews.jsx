import { Avatar, Rating } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

const Reviews = ({ reviews }) => {
      const [starCount, setStarCount] = useState({
            oneStar: 0,
            twoStar: 0,
            threeStar: 0,
            fourStar: 0,
            fiveStar: 0
      });
      const [avgRating, setAvgRating] = useState(0);

      useEffect(() => {
            if (reviews?.length) {
                  const starCountInitial = {
                        oneStar: 0,
                        twoStar: 0,
                        threeStar: 0,
                        fourStar: 0,
                        fiveStar: 0
                  }
                  let initialAvgStar = 0;
                  reviews.forEach(r => {
                        switch (r?.star) {
                              case 5:
                                    starCountInitial.fiveStar += 1
                                    break;
                              case 4:
                                    starCountInitial.fourStar += 1
                                    break;
                              case 3:
                                    starCountInitial.threeStar += 1
                                    break;
                              case 2:
                                    starCountInitial.twoStar += 1
                                    break;
                              case 1:
                                    starCountInitial.oneStar += 1
                                    break;
                              default:
                                    break;
                        }
                        initialAvgStar += r?.star;
                  })
                  const avgCalculating = initialAvgStar / reviews?.length;
                  setAvgRating(avgCalculating);
                  setStarCount(starCountInitial);
            }
      }, [reviews]);

      return (
            <div>
                  <h1 className='text-xl font-bold text-gray-800'>Rating and Reviews</h1>
                  <div className='flex flex-col sm:flex-row items-start gap-6 mt-6 pb-4 border-b border-gray-300'>
                        <div className='space-y-2'>
                              <h4 className='text-4xl font-semibold text-gray-800'>{avgRating}</h4>
                              <Rating
                                    name="read-only"
                                    value={avgRating}
                                    readOnly
                                    size="large"
                              />
                              <p className='text-sm font-medium text-gray-500'>{reviews?.length} ratings</p>
                        </div>
                        <div className='space-y-3'>
                              <div className='flex items-center gap-2'>
                                    <Rating
                                          name="read-only"
                                          value={5}
                                          readOnly
                                          size="medium"
                                    />
                                    <span>{starCount?.fiveStar}</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                    <Rating
                                          name="read-only"
                                          value={4}
                                          readOnly
                                          size="medium"
                                    />
                                    <span>{starCount?.fourStar}</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                    <Rating
                                          name="read-only"
                                          value={3}
                                          readOnly
                                          size="medium"
                                    />
                                    <span>{starCount?.threeStar}</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                    <Rating
                                          name="read-only"
                                          value={2}
                                          readOnly
                                          size="medium"
                                    />
                                    <span>{starCount?.twoStar}</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                    <Rating
                                          name="read-only"
                                          value={1}
                                          readOnly
                                          size="medium"
                                    />
                                    <span>{starCount?.oneStar}</span>
                              </div>
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
                                                            value={r?.star}
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