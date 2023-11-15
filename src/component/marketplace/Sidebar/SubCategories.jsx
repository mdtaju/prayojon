import React, { useEffect, useState } from 'react';

function SubCategories({ filters, setFilters }) {
      const [subCategoryOption, setSubCategoryOption] = useState([]);

      useEffect(() => {

            switch (filters?.categories) {
                  case "Electronics":
                        setSubCategoryOption([
                              "Smartphone",
                              "Mobile Phones",
                              "Mobile Phone Accessories",
                              "Wearables",
                              "SIM Cards",
                              "Mobile Phone Services",
                              "Laptops",
                              "Washing Machine",
                              "Freez & Freezer",
                              "Desktop Computers",
                              "Audio & Sound Systems",
                              "ACs",
                              "Home Electronics",
                              "Home Appliances",
                              "TVs",
                              "Printing Equipment",
                              "Cameras, Camcorders & Accessories",
                              "Computers & Tablets Accessories",
                              "TV & Video Accessories",
                              "Other Electronics",
                              "Video Game Consoles & Accessories",
                              "Photocopiers"
                        ])
                        break;
                  case "Fashion":
                        setSubCategoryOption([
                              "Women's Fashion & Beauty",
                              "Women's Jewellery",
                              "Sharees",
                              "Women's Dresses",
                              "Women's Watches",
                              "Women's Beauty & Personal Care",
                              "Western Wear",
                              "Bridal clothing",
                              "Women's Bags & Accessories",
                              "Women's Shoes",
                              "Baby Girl's Fashion",
                              "Women's Lingerie & Sleepwear",
                              "Womens Winter Wear",
                              "Womens Sunglasses",
                              "Men's Shirts & T-Shirts",
                              "Mens Watches",
                              "Mens Jewellery",
                              "Mens Shoes",
                              "Bags",
                              "Panjabi",
                              "Grooming Clothing",
                              "Mens Pants",
                              "Mens Jacket & Coat",
                              "Optical & Sunglasses",
                              "Wholesale - Bulk",
                              "Baby Boy's Fashion"
                        ])
                        break;
                  case "Home & Garden":
                        setSubCategoryOption([
                              "Home Appliances",
                              "Home Interiors",
                              "Home Decor",
                              "Doors & Windows",
                              "Bathrooms Product",
                              "DIY Tools",
                              "Table & Chair Sets",
                              "Lighting",
                              "Fans",
                              "Dining Furniture",
                              "Living Room Furniture",
                              "Beds",
                              "Bedroom Furniture",
                              "Other Household Goods",
                              "Garden Tools",
                              "Garden Accessories",
                              "Plant & Seeds",
                              "Kitchenware"
                        ])
                        break;
                  case "Vehaicle":
                        setSubCategoryOption([
                              "Cars",
                              "Motorbikes & Scooters",
                              "Bicycles",
                              "Three Wheelers",
                              "Car Rentals & Auto Services",
                              "Auto Parts & Accessories",
                              "Trucks, Vans & Buses",
                              "Boats",
                              "Tractors"
                        ])
                        break;
                  case "Health & Beauty":
                        setSubCategoryOption([
                              "Mobility, Disability & Medical",
                              "Make Up & Cosmetics",
                              "Health Care",
                              "Hair Care & Styling",
                              "Fragrances",
                              "Bath & Body",
                              "Facial Skin Care",
                              "Shaving & Hair Removal",
                              "Massage Products",
                              "Dental Care",
                              "Vision & Eye Care"
                        ])
                        break;
                  case "Business Office & Industrial":
                        setSubCategoryOption([
                              "Agriculture & Farming Machinery",
                              "Building Materials & Supplies",
                              "Electrical Equipment & Supplies",
                              "Industrial Tools",
                              "Power Tools",
                              "Hand Tools",
                              "Other Business & Industry Items",
                              "Office Equipment & Supplies",
                              "Medical Equipment & Supplies",
                              "Raw Materials & Industrial Supplies",
                              "Restaurant & Catering Supplies",
                              "Licences, Titles & Tenders",
                              "Printing & Graphic Arts",
                              "Safety & Security Items",
                              "Web Domain/Emails/Software"
                        ])
                        break;
                  case "Sporting":
                        setSubCategoryOption([
                              "Bicycles",
                              "Fitness & Gym Equipment",
                              "Bicycle Accessories",
                              "Other Sports & Leisure",
                              "Water Sports",
                              "Fishing Equipment",
                              "Camping & Hiking",
                              "Ball & Racquet Sport Equipment",
                              "Luggage & Travel Equipment",
                              "Winter Sports",
                              "Boxing & Martial Arts Equipment",
                              "Gym Memberships"
                        ])
                        break;
                  case "Toyes & Games":
                        setSubCategoryOption([
                              "Action Figures & Accessories",
                              "Beanies",
                              "Construction & Building Toys",
                              "Creative Toys & Activities",
                              "Diecast & Vehicles",
                              "Educational Toys",
                              "Electronic Pets",
                              "Fast Food, Cereal & Sweet Toys",
                              "Games",
                              "Jigsaws & Puzzles",
                              "Models & Kits",
                              "Other Toys & Games",
                              "Outdoor Toys & Activities",
                              "Preschool Toys & Pretend Play",
                              "Radio Control & RC Toys",
                              "Scalextric & Slot Car",
                              "Soft Toys & Stuffed Animals",
                              "Steam",
                              "Toy Soldiers",
                              "Vintage & Classic Toys",
                              "Wargames & Role-Playing"
                        ])
                        break;
                  default:
                        setSubCategoryOption([])
                        break;
            }
      }, [filters?.categories]);

      const handleChange = (event) => {
            const { name, checked } = event.target;
            setFilters((prevState) => ({
                  ...prevState,
                  subCategories: checked ? [...prevState.subCategories, name] : prevState.subCategories.filter((item) => item !== name),
            }));
      }
      return (
            <div className='mt-2 pb-2'>
                  <h1 className='text-lg text-orange-500 font-semibold'>Sub Categories</h1>
                  {
                        subCategoryOption?.map((item, i) => (
                              <label key={i} className='flex items-center select-none mt-2 cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md'>
                                    <input type="checkbox" className='w-[16px] h-[16px]' name={item} checked={filters.subCategories.includes(item)} onChange={handleChange} />
                                    <span className='pl-2 text-sm font-medium'>{item}</span>
                              </label>
                        ))
                  }
            </div>
      )
}

export default SubCategories