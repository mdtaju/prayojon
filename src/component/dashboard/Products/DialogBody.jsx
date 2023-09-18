import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useGetUPostsImagesQuery, useRemoveFileMutation, useUpdateProductMutation } from '../../../features/userPost/userPostApi';
import thousandFormate from '../../../utils/thousandFormate';

const DialogBody = ({ close, id, product = {}, setOpen, refetch }) => {
      const { product_title, description: productDes, location: productLoc, category: productCat, original_price, discount: productDis, user_id, quantity: proQuantity, type } = product;
      const [productTitle, setProductTitle] = useState("");
      const [description, setDescription] = useState("");
      const [storeFiles, setStoreFiles] = useState([]);
      const [serverFiles, setServerFiles] = useState([]);
      const [location, setLocation] = useState("");
      const [discount, setDiscount] = useState("");
      const [productQuantity, setProductQuantity] = useState("");
      const [category, setCategory] = useState("");
      const [originalPrice, setOriginalPrice] = useState("");
      const [updateProduct, { data: updatedProduct }] = useUpdateProductMutation();
      const [fileSizeWarning, setFileSizeWarning] = useState([]);
      const [disCountPrice, setDisCountPrice] = useState("");
      const [productType, setProductType] = useState("");
      const { data: getImages, refetch: fileRefetch } = useGetUPostsImagesQuery();
      const [removeFile, { data }] = useRemoveFileMutation();
      const [fileIdForRemove, setFileIdForRemove] = useState([]);
      const { data: session } = useSession()

      useEffect(() => {
            if (product) {
                  setProductTitle(product_title);
                  setDescription(productDes);
                  setLocation(productLoc);
                  setCategory(productCat);
                  setOriginalPrice(original_price);
                  setProductQuantity(proQuantity);
                  setDiscount(productDis);
                  setProductType(type);
            }
      }, [product, product_title, productDes, productLoc, original_price, proQuantity, productDis, productCat, type])

      useEffect(() => {
            if (getImages) {
                  const getProductImages = getImages.filter((im) => im.post_type === "Product" && im.post_id == id);
                  setServerFiles(getProductImages);
            }
      }, [getImages, id]);

      useEffect(() => {
            const inDiscount = originalPrice * discount / 100;
            const price = originalPrice - inDiscount;
            setDisCountPrice(price);
      }, [originalPrice, discount]);

      // close the dialog after successfully deleted the files
      useEffect(() => {
            if (data || updatedProduct) {
                  setOpen(false);
                  refetch(session?.user?.email)
                  fileRefetch()
            }
      }, [data, updatedProduct, setOpen, refetch, session, fileRefetch]);

      // file size validation
      const onDrop = useCallback(selectedFiles => {
            const acceptedFiles = [];
            selectedFiles.forEach((item) => {
                  // calculation of each selected file size into MB(Mega byte).
                  const getSize = item.size / (1024 ** 2);
                  if (getSize < 25) {
                        acceptedFiles.push(item); // if file size small than 25MB then is accepted
                  } else {
                        setFileSizeWarning((prevState) => [...prevState, `Your selected file "${item.name}" is large than 25MB.`])
                  }
            })
            // after 5 seconds warning messages will remove.
            // console.log("called file fun")
            setTimeout(() => { setFileSizeWarning([]) }, 5000)
            return setStoreFiles((prevState) => [...prevState, ...acceptedFiles])
      }, [setStoreFiles])

      // file type validation
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                  'image/gif': ['.gif'],
                  'video/mp4': ['.mp4'],
                  'video/mkv': ['.mkv'],
                  'video/ts': ['.ts']
            }
      })


      // product update handler
      const updateProductHandler = () => {
            const d = new Date();
            // product post making 
            const fromProductData = new FormData();
            fromProductData.append("updated_at", d.toUTCString());
            fromProductData.append("product_title", productTitle);
            fromProductData.append("description", description);
            fromProductData.append("location", location);
            fromProductData.append("category", category);
            fromProductData.append("original_price", originalPrice);
            fromProductData.append("discount", discount);
            fromProductData.append("type", productType);
            fromProductData.append("quantity", productQuantity);
            fromProductData.append("id", id);
            fromProductData.append("user_id", user_id);
            const inDiscount = originalPrice * discount / 100;
            const price = originalPrice - inDiscount;
            fromProductData.append("price", price);
            // files making 
            for (let i = 0; i < storeFiles.length; i++) {
                  fromProductData.append("files", storeFiles[i]);
            }
            const getProductImages = getImages.filter((im) => im.post_type === "Product" && im.post_id == id);
            fileIdForRemove?.map((fi) => {
                  const getInvalidFile = getProductImages.find((f, i) => i === fi);
                  removeFile(getInvalidFile?.id);
            })
            updateProduct(fromProductData);
      }

      const handleLocalImgRemove = (index) => {
            setStoreFiles((prevImages) => {
                  const getValidImg = prevImages.filter((im, i) => i !== index);
                  return getValidImg;
            })
      }

      const handleServerImgRemove = (index) => {
            setFileIdForRemove((prevIndex) => [...prevIndex, index]);
            setServerFiles((prevFiles) => {
                  const getCurrFiles = prevFiles.filter((f, i) => i !== index);
                  return getCurrFiles;
            });
      }

      return (
            <div className='w-full sm:w-[350px] md:w-[540px]'>
                  <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-primary text-xl font-semibold'>Edit this product</h1>
                        <button onClick={close} className='w-[35px] h-[35px] bg-red-500 text-white rounded-full shadow-md grid place-items-center'>
                              <FontAwesomeIcon
                                    icon={faClose}
                              />
                        </button>
                  </div>
                  {/* product title */}
                  <TextField
                        required
                        sx={{ width: '100%', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                        type='text'
                        size='small'
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        className='mb-4'
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        inputProps={{ maxLength: 200 }}
                  />
                  <br />
                  {/* price input and category input container */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 items-center mb-4'>
                        {/* write product price */}
                        <TextField
                              required
                              sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                              type='number'
                              size='small'
                              id="outlined-basic"
                              label="Original Price"
                              variant="outlined"
                              value={originalPrice}
                              onChange={(e) => setOriginalPrice(e.target.value)}
                        />

                        {/* category selection input */}
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
                                    <MenuItem value={"Jewllery & Watches"}>Jewllery & Watches</MenuItem>
                                    <MenuItem value={"Health &  Beauty"}>Health &  Beauty</MenuItem>
                                    <MenuItem value={"Business Office & Industrial"}>Business Office & Industrial</MenuItem>
                                    <MenuItem value={"Sporting"}>Sporting</MenuItem>
                                    <MenuItem value={"Toyes & Games"}>oyes & Games</MenuItem>

                              </Select>
                        </FormControl>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 items-center mb-4'>
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
                        <div className='py-2 px-3 bg-gray-100 rounded-md border border-gray-300'>
                              <h4 className='text-gray-800 text-base font-semibold select-none'>Price: {thousandFormate(disCountPrice)}</h4>
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
                  <TextField
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
                  />
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Edit the Description' className='w-full p-3 outline-none border border-gray-300 rounded-sm' name="" id="" cols="30" rows="10">

                  </textarea>

                  {/* image container */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        {
                              serverFiles?.map((file, i) => (
                                    <div key={i} className='w-full h-[220px] p-2 shadow-md rounded-md relative'>
                                          <Image
                                                src={file?.file_path}
                                                alt='demo-img'
                                                layout='fill'
                                                className='w-full h-full object-cover rounded-md'
                                          />
                                          <button onClick={() => handleServerImgRemove(i)} className='absolute top-2 right-2 w-[35px] h-[35px] bg-red-500 text-white rounded-full shadow-md grid place-items-center'>
                                                <FontAwesomeIcon
                                                      icon={faTrashCan}
                                                />
                                          </button>
                                    </div>
                              ))
                        }
                        {
                              storeFiles?.map((file, i) => (
                                    <div key={i} className='w-full h-[220px] p-2 shadow-md rounded-md relative'>
                                          <Image
                                                src={URL.createObjectURL(file)}
                                                alt='demo-img'
                                                layout='fill'
                                                className='w-full h-full object-cover rounded-md'
                                          />
                                          <button onClick={() => handleLocalImgRemove(i)} className='absolute top-2 right-2 w-[35px] h-[35px] bg-red-500 text-white rounded-full shadow-md grid place-items-center'>
                                                <FontAwesomeIcon
                                                      icon={faTrashCan}
                                                />
                                          </button>
                                    </div>
                              ))
                        }

                  </div>
                  {/* add new images */}
                  <div {...getRootProps()} className='px-6 py-2 bg-gray-100 border border-gray-300 rounded-md text-center mt-4 dashboard_cart_shadow cursor-pointer'><span className='text-gray-800 font-bold'>Add more images</span>
                        <input
                              {...getInputProps()}
                              name="files"
                        />
                  </div>
                  {/* submit button */}
                  <button onClick={updateProductHandler} className='btn_primary w-full mt-4'>Submit</button>
            </div>
      );
};

export default DialogBody;