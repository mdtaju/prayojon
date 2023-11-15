import React, { useState } from 'react';
import Description from './Description';
import Reviews from './Reviews';

const MiddleContainer = ({ product }) => {
      const { description, reviews } = product;
      const [activeTab, setActiveTab] = useState("description");
      return (
            <div className='w-full common_shadow mt-4 sm:mt-6'>
                  {/* tab list */}
                  <div className='w-full px-4 flex gap-4 border-b border-gray-300'>
                        <div onClick={() => setActiveTab("description")} className={`profile_tab_link ${activeTab === "description" ? "profile_tab_link_active" : ""}`}>
                              <span>Description</span>
                        </div>
                        <div onClick={() => setActiveTab("review")} className={`profile_tab_link ${activeTab === "review" ? "profile_tab_link_active" : ""}`}>
                              <span>Reviews</span>
                        </div>
                  </div>
                  {/* tab body */}
                  <div className='w-full mt-4 p-4'>
                        {
                              activeTab === "description" ?
                                    <Description
                                          description={description}
                                    /> :
                                    <Reviews
                                          reviews={reviews}
                                    />
                        }
                  </div>
            </div>
      );
};

export default MiddleContainer;