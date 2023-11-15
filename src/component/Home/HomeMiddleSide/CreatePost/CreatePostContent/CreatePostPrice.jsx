import { faBangladeshiTakaSign, faDollarSign, faEuroSign, faIndianRupeeSign, faSterlingSign, faYenSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import thousandFormate from '../../../../../utils/thousandFormate';

const CreatePostPrice = ({
      productPrice,
      setProductPrice,
      currencySign,
      setCurrencySign,
      productTitle,
      setProductTitle,
      location,
      setLocation,
      category,
      setCategory,
      discount,
      setDiscount,
      productType,
      setProductType,
      productQuantity,
      setProductQuantity,
      shippingCharge,
      setShippingCharge,
      termsAgreement,
      setTermsAgreement,
      districts,
      brandName,
      setBrandName,
      color,
      setColor,
      size,
      setSize,
      model,
      setModel,
      estimateTime,
      setEstimateTime,
      paymentAddType,
      setPaymentAddType,
      subCategory,
      setSubCategory
}) => {
      const [disCountPrice, setDiscountPrice] = useState("");
      const [subCategoryOption, setSubCategoryOption] = useState([]);

      useEffect(() => {
            switch (category) {
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
      }, [category]);

      useEffect(() => {
            const inDiscount = productPrice * discount / 100;
            const price = productPrice - inDiscount;
            setDiscountPrice(price + +shippingCharge);
      }, [productPrice, discount, shippingCharge]);


      const colorOption = ["Black", "White", "Red", "Blue", "Green", "Pink", "Yellow", "Orange", "Purple", "Brown", "Gray", "Gold", "Silver", "Lime", "Other's"]


      // set currency function
      const handleChange = (event) => {
            setCurrencySign(event.target.value);
      };
      // Currencies 
      const Currency = [
            <FontAwesomeIcon icon={faDollarSign} className='text-gray-600' key={0} />,
            <FontAwesomeIcon icon={faEuroSign} className='text-gray-600' key={1} />,
            <FontAwesomeIcon icon={faBangladeshiTakaSign} className='text-gray-600' key={2} />,
            <FontAwesomeIcon icon={faIndianRupeeSign} className='text-gray-600' key={3} />,
            <FontAwesomeIcon icon={faYenSign} className='text-gray-600' key={4} />,
            <FontAwesomeIcon icon={faSterlingSign} className='text-gray-600' key={5} />
      ]
      return (
            <div>
                  {/* Select currency */}
                  {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currencySign}
                        onChange={handleChange}
                        size="small"
                        sx={{ width: '60px', "& fieldset": { borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' } }}
                  >
                        {
                              Currency.map((item, i) => (
                                    <MenuItem value={i} key={i}>{item}</MenuItem>
                              ))
                        }
                  </Select> */}
                  {/* product title */}
                  <TextField
                        required
                        sx={{ width: '100%', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                        type='text'
                        size='small'
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        inputProps={{ maxLength: 200 }}
                  />
                  <br />
                  {/* category selection input */}
                  <div className='w-full mt-4 flex flex-col sm:flex-row items-center gap-4'>
                        <FormControl
                              fullWidth
                              size='small'
                              required
                        >
                              <InputLabel id="demo-simple-select-label">Category</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={e => setCategory(e.target.value)}
                              >
                                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                                    <MenuItem value={"Fashion"}>Fashion</MenuItem>
                                    <MenuItem value={"Home & Garden"}>Home & Garden</MenuItem>
                                    <MenuItem value={"Vehaicle"}>Vehaicle</MenuItem>
                                    {/* <MenuItem value={"Jewllery & Watches"}>Jewllery & Watches</MenuItem> */}
                                    <MenuItem value={"Health & Beauty"}>Health & Beauty</MenuItem>
                                    <MenuItem value={"Business Office & Industrial"}>Business Office & Industrial</MenuItem>
                                    <MenuItem value={"Sporting"}>Sporting</MenuItem>
                                    <MenuItem value={"Toyes & Games"}>Toyes & Games</MenuItem>

                              </Select>
                        </FormControl>
                        <FormControl
                              fullWidth
                              size='small'
                              required
                        >
                              <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subCategory}
                                    label="Sub Category"
                                    onChange={e => setSubCategory(e.target.value)}
                              >
                                    {
                                          subCategoryOption?.map((item, i) => (

                                                <MenuItem key={i} value={item}>{item}</MenuItem>
                                          ))
                                    }
                              </Select>
                        </FormControl>
                  </div>
                  {/* price input and category input container */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 items-center my-4'>
                        {/* brand name */}
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='text'
                              size='small'
                              id="outlined-basic"
                              label="Brand"
                              variant="outlined"
                              value={brandName}
                              onChange={(e) => setBrandName(e.target.value)}
                        />
                        {/* model name */}
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='text'
                              size='small'
                              id="outlined-basic"
                              label="Model"
                              variant="outlined"
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                        />
                        {/* color name */}
                        {/* <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='text'
                              size='small'
                              id="outlined-basic"
                              label="Color"
                              variant="outlined"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                        /> */}
                        <FormControl
                              fullWidth
                              size='small'
                              required
                        >
                              <InputLabel id="demo-simple-select-label">Color</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={color}
                                    label="Color"
                                    onChange={e => setColor(e.target.value)}
                              >
                                    {
                                          colorOption?.map((item, i) => (

                                                <MenuItem key={i} value={item}>{item}</MenuItem>
                                          ))
                                    }
                              </Select>
                        </FormControl>
                        {/* size name */}
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Size"
                              variant="outlined"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                        />
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Delivery Estimate Time"
                              placeholder='Number of days'
                              variant="outlined"
                              value={estimateTime}
                              onChange={(e) => setEstimateTime(e.target.value)}
                        />
                        {/* write product price */}
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Price"
                              variant="outlined"
                              value={productPrice}
                              onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <TextField
                              required
                              sx={{ "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Discount in %"
                              InputProps={{ inputProps: { min: 1, max: 100 } }}
                              variant="outlined"
                              className=''
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                        />
                        {/* payment premium add type */}
                        <FormControl
                              fullWidth
                              size='small'
                              required
                        >
                              <InputLabel id="demo-simple-select-label">Premium Ad Type</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={paymentAddType}
                                    label="Premium Ad Type"
                                    onChange={e => setPaymentAddType(e.target.value)}
                              >
                                    <MenuItem value={"Free"}>Free</MenuItem>
                                    <MenuItem value={"Top"}>Top</MenuItem>
                                    <MenuItem value={"Features"}>Features</MenuItem>
                              </Select>
                        </FormControl>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 items-center mb-4'>
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Shipping Charge"
                              variant="outlined"
                              value={shippingCharge}
                              onChange={(e) => setShippingCharge(e.target.value)}
                        />
                        <div className='py-2 px-3 bg-gray-100 rounded-md border border-gray-300'>
                              <h4 className='text-gray-800 text-base font-semibold select-none'>Total Price: {thousandFormate(disCountPrice)}</h4>
                        </div>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 items-center mb-4'>
                        <FormControl
                              fullWidth
                              size='small'
                              required
                        >
                              <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productType}
                                    label="Product Type"
                                    onChange={e => setProductType(e.target.value)}
                              >
                                    <MenuItem value={"New"}>Brand New</MenuItem>
                                    <MenuItem value={"Old"}>Old/Used</MenuItem>
                              </Select>
                        </FormControl>
                        <TextField
                              required
                              sx={{ "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Available In Stock"
                              InputProps={{ inputProps: { min: 1, max: 100 } }}
                              variant="outlined"
                              className=''
                              value={productQuantity}
                              onChange={(e) => setProductQuantity(e.target.value)}
                        />
                  </div>
                  {/* <TextField
                        required
                        fullWidth
                        sx={{ "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                        type='text'
                        size='small'
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                        className='mb-4'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                  /> */}
                  <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={districts}
                        sx={{ width: "100%" }}
                        size='small'
                        value={location}
                        onChange={(e, newInputValue) => setLocation(newInputValue)}
                        renderInput={(params) => <TextField {...params} label="Your City" />}
                  />
                  <div className='my-4'>
                        <label className='flex items-center gap-3 cursor-pointer w-fit'>
                              <input checked={termsAgreement} onChange={() => setTermsAgreement((prev) => !prev)} className='w-[18px] h-[18px]' type="checkbox" name="" id="" />
                              <p className='text-base font-semibold'>I agree with the <Link href={"/terms/product"} target='_blank'>
                                    <span className='text-primary hover:underline'>terms and conditions</span>
                              </Link>
                              </p>
                        </label>
                  </div>
            </div>
      );
};

export default CreatePostPrice


// Electronics
// Fashion
// Home & Garden
// Vehaicle
// Jewllery & Watches
// Health &  Beauty
// Business Office & Industrial
// Sporting
// Toyes & Games