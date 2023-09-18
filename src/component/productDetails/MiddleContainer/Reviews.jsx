import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Reviews = () => {
      return (
            <div>
                  <h1 className='text-xl font-bold text-gray-800'>this is reviews page</h1>
                  <div className='flex items-start gap-6 mt-6'>
                        <div className='space-y-2'>
                              <h4 className='text-4xl font-semibold text-gray-800'>5.0<span className='text-xl text-gray-500'>/5</span></h4>
                              <div className='flex items-center gap-1 text-xl'>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                              </div>
                              <p className='text-sm font-medium text-gray-500'>9 ratings</p>
                        </div>
                        <div className='space-y-3'>
                              <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1 text-sm'>
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                    </div>
                                    <h1 className='text-sm text-gray-600 font-semibold'>3</h1>
                              </div>
                              <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1 text-sm'>
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                    </div>
                                    <h1 className='text-sm text-gray-600 font-semibold'>3</h1>
                              </div>
                              <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1 text-sm'>
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                    </div>
                                    <h1 className='text-sm text-gray-600 font-semibold'>3</h1>
                              </div>
                              <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1 text-sm'>
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                    </div>
                                    <h1 className='text-sm text-gray-600 font-semibold'>3</h1>
                              </div>
                              <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1 text-sm'>
                                          <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                          <FontAwesomeIcon icon={faStar} className='text-gray-300' />
                                    </div>
                                    <h1 className='text-sm text-gray-600 font-semibold'>3</h1>
                              </div>

                        </div>

                  </div>
            </div>
      );
};

export default Reviews;