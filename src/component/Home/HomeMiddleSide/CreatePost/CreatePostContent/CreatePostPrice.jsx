import { Autocomplete, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
      setSubCategory,
      setStoreFiles,
      setFileSizeWarning,
      setChooseImgToggle,
      ram,
      setRam,
      rom,
      setRom
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

      const deliveryOptions = [
            "1 day",
            "2 days",
            "3 days",
            "4 days",
            "5 days",
            "6 days",
            "7 days",
            "8 days",
            "9 days",
            "10 days",
      ]

      // file size validation
      const onDrop = useCallback(selectedFiles => {
            const acceptedFiles = [];
            selectedFiles.forEach((item) => {
                  // calculation of each selected file size into MB(Mega byte).
                  const getSize = item.size / (1024 ** 2);

                  if (getSize < 25) {
                        acceptedFiles.push(item); // if file size small than 25MB then is accepted
                  } else {
                        setFileSizeWarning(`Your selected file "${item.name}" is large than 25MB.`);
                        return;
                  }
            })
            // after 5 seconds warning messages will remove.
            // console.log("called file fun")
            setTimeout(() => { setFileSizeWarning("") }, 5000)
            setChooseImgToggle(true)
            return setStoreFiles((prevState) => [selectedFiles[0], ...prevState])
      }, [setStoreFiles, setFileSizeWarning, setChooseImgToggle])

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
            }
      })

      const handleColorChange = (event) => {
            const {
                  target: { value },
            } = event;
            setColor(
                  // On autofill we get a stringified value.
                  typeof value === 'string' ? value.split(',') : value,
            );
      };

      return (
            <div>
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

                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='text'
                              size='small'
                              id="outlined-basic"
                              label="Model"
                              variant="outlined"
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                        />


                        <FormControl fullWidth
                              size='small'>
                              <InputLabel id="demo-multiple-checkbox-label">Color</InputLabel>
                              <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={color}
                                    onChange={handleColorChange}
                                    input={<OutlinedInput label="" />}
                                    renderValue={(selected) => selected.join(', ')}
                              >
                                    {colorOption.map((name) => (
                                          <MenuItem key={name} value={name}>
                                                <Checkbox checked={color.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                          </MenuItem>
                                    ))}
                              </Select>
                        </FormControl>
                        {/* size name */}
                        <TextField
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Size"
                              variant="outlined"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                        />
                        {/* ram */}
                        <TextField
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='text'
                              size='small'
                              id="outlined-basic"
                              label="Ram"
                              variant="outlined"
                              value={ram}
                              onChange={(e) => setRam(e.target.value)}
                        />
                        {/* rom */}
                        <TextField
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='text'
                              size='small'
                              id="outlined-basic"
                              label="Rom"
                              variant="outlined"
                              value={rom}
                              onChange={(e) => setRom(e.target.value)}
                        />
                        <FormControl
                              fullWidth
                              size='small'
                        >
                              <InputLabel id="demo-simple-select-label">Delivery Estimate Time</InputLabel>
                              <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={estimateTime}
                                    label="Delivery Estimate Time"
                                    onChange={e => setEstimateTime(e.target.value)}
                              >
                                    {
                                          deliveryOptions?.map((item, i) => (
                                                <MenuItem key={i} value={item}>{item}</MenuItem>
                                          ))
                                    }
                              </Select>
                        </FormControl>
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
                        renderInput={(params) => <TextField required {...params} label="Your City" />}
                  />
                  <div className='mt-4 flex flex-col gap-2'>
                        <label htmlFor="productThumbnail" className='text-sm font-bold'>Product Thumbnail (.png, .jpg, .jpeg) *</label>
                        <div {...getRootProps()} className='btn_primary'>Chose a image file</div>
                        <input {...getInputProps()} />
                  </div>
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