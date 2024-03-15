import React, { useState } from 'react';
import Description from './Description';
import Reviews from './Reviews';

const MiddleContainer = ({ product }) => {
      const { description, reviews, sellerReviews } = product;
      const [activeTab, setActiveTab] = useState("description");

      // what to render 
      let content;
      switch (activeTab) {
            case "description":
                  content = <Description
                        description={description}
                  />
                  break;
            case "product_review":
                  content = <Reviews
                        reviews={reviews}
                        type={"product"}
                  />
                  break;
            case "seller_review":
                  content = <Reviews
                        reviews={sellerReviews}
                        type={"seller"}
                  />
                  break;
            default:
                  content = <Description
                        description={description}
                  />
                  break;
      }
      return (
            <div className='w-full common_shadow mt-4 sm:mt-6'>
                  {/* tab list */}
                  <div className='w-full px-4 flex gap-4 border-b border-gray-300'>
                        <div onClick={() => setActiveTab("description")} className={`profile_tab_link ${activeTab === "description" ? "profile_tab_link_active" : ""}`}>
                              <span>Description</span>
                        </div>
                        <div onClick={() => setActiveTab("product_review")} className={`profile_tab_link ${activeTab === "product_review" ? "profile_tab_link_active" : ""}`}>
                              <span>Product Reviews</span>
                        </div>
                        <div onClick={() => setActiveTab("seller_review")} className={`profile_tab_link ${activeTab === "seller_review" ? "profile_tab_link_active" : ""}`}>
                              <span>Seller Reviews</span>
                        </div>
                  </div>
                  {/* tab body */}
                  <div className='w-full mt-4 p-4'>
                        {
                              content
                        }
                  </div>
            </div>
      );
};

export default MiddleContainer;