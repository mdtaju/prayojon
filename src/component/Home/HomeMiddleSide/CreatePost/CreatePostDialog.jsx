import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { useAddGeneralPostMutation, useAddProductPostMutation } from '../../../../features/userPost/userPostApi';
import useWindowSize from '../../../../hook/useWindowSize';
import { bd_districts } from '../../../../utils/bd_districts';
import CreatePostContent from './CreatePostContent/CreatePostContent';
import CreatePostFooter from './CreatePostFooter';
import CreatePostHeader from './CreatePostHeader';

const CreatePostDialog = ({ open, setOpen, name, photo }) => {
      const [chooseImgToggle, setChooseImgToggle] = useState(false)
      const [postTypeValue, setPostTypeValue] = useState("General");
      const [productTitle, setProductTitle] = useState("");
      const [productPrice, setProductPrice] = useState("");
      const [description, setDescription] = useState("");
      const [storeFiles, setStoreFiles] = useState([]);
      // const [productThumbnail, setProductThumbnail] = useState(null);
      const [currencySign, setCurrencySign] = useState(0);
      const [postAudience, setPostAudience] = useState("Public");
      const [location, setLocation] = useState("");
      const [category, setCategory] = useState('');
      const [discount, setDiscount] = useState(0);
      const [productType, setProductType] = useState("");
      const [productQuantity, setProductQuantity] = useState("");
      const [termsAgreement, setTermsAgreement] = useState(false);
      const [shippingCharge, setShippingCharge] = useState("");
      const [districts, setDistricts] = useState([]);
      const descriptionElementRef = useRef(null);
      const windowSize = useWindowSize();
      const [addGeneralPost] = useAddGeneralPostMutation();
      const [addProductPost] = useAddProductPostMutation();
      const { data: authData } = useSession();
      const [postError, setPostError] = useState("");
      const [brandName, setBrandName] = useState("");
      const [ram, setRam] = useState("");
      const [rom, setRom] = useState("");
      const [color, setColor] = useState([]);
      const [size, setSize] = useState(0);
      const [model, setModel] = useState("")
      const [estimateTime, setEstimateTime] = useState("");
      const [paymentAddType, setPaymentAddType] = useState("Free");
      const [subCategory, setSubCategory] = useState("");
      // check submit button - state 
      const [isProductReadyForSubmit, setIsProductReadyForSubmit] = useState(false);
      const [postLoading, setPostLoading] = useState(false);


      // getting the district names
      useEffect(() => {
            if (bd_districts) {
                  let districtNames = [];
                  bd_districts?.map((d) => {
                        districtNames.push(d.name);
                  });
                  setDistricts(districtNames)
            }
      }, []);

      useEffect(() => {
            if (open) {
                  const { current: descriptionElement } = descriptionElementRef;
                  if (descriptionElement !== null) {
                        descriptionElement.focus();
                  }
            }
      }, [open]);
      // check is first file an image 
      const isImageFile = (file) => {
            if (file?.type?.startsWith("image/")) {
                  return true
            } else {
                  return false
            }
      };
      // check is ready for submit 
      useEffect(() => {
            if (productPrice &&
                  isImageFile(storeFiles[0]) &&
                  storeFiles.length !== 0 &&
                  location &&
                  category &&
                  productTitle &&
                  productType &&
                  productQuantity &&
                  termsAgreement &&
                  shippingCharge &&
                  estimateTime &&
                  paymentAddType &&
                  subCategory) {
                  setIsProductReadyForSubmit(true);
            } else {
                  setIsProductReadyForSubmit(false);
            }
      }, [productPrice,
            storeFiles,
            location,
            category,
            productTitle,
            productType,
            productQuantity,
            termsAgreement,
            shippingCharge,
            brandName,
            color,
            size,
            model,
            estimateTime,
            paymentAddType,
            subCategory])

      const handleClose = () => {
            setOpen(false);
      };

      // post_type, post_title, post_content, post_audience, created_at, product
      // post submit handler
      const handlePostSubmit = async () => {
            setPostLoading(true);
            const d = new Date();

            const formData = new FormData();
            // general post making 
            formData.append("user_id", authData?.user?.email);
            formData.append("post_audience", postAudience);
            formData.append("created_at", d.toUTCString());
            formData.append("post_content", description);

            // product post making 
            const fromProductData = new FormData();
            fromProductData.append("user_id", authData?.user?.email);
            fromProductData.append("post_audience", postAudience);
            fromProductData.append("created_at", d.toUTCString());
            fromProductData.append("product_title", productTitle);
            fromProductData.append("description", description);
            fromProductData.append("status", "In-Stock");
            fromProductData.append("location", location);
            fromProductData.append("category", category);
            fromProductData.append("original_price", productPrice);
            fromProductData.append("discount", discount);
            fromProductData.append("type", productType);
            fromProductData.append("quantity", productQuantity);

            fromProductData.append("brand_name", brandName);
            fromProductData.append("color", color);
            fromProductData.append("size", size);
            fromProductData.append("ram", ram);
            fromProductData.append("rom", rom);
            fromProductData.append("model", model);
            fromProductData.append("estimate_time", estimateTime);
            fromProductData.append("payment_add_type", paymentAddType);
            fromProductData.append("sub_category", subCategory);
            const inDiscount = productPrice * discount / 100;
            const price = productPrice - inDiscount;
            fromProductData.append("price", price);

            // files making 
            for (let i = 0; i < storeFiles.length; i++) {
                  formData.append('files', storeFiles[i]);
                  fromProductData.append("files", storeFiles[i]);
            }

            if (postTypeValue === "General") {
                  addGeneralPost(formData).unwrap().then((d) => {
                        setProductTitle("")
                        setProductPrice("")
                        setDescription("")
                        setStoreFiles([])
                        setCurrencySign("")
                        setLocation("")
                        setCategory("")
                        setPostLoading(false);
                        setOpen(false);
                        setLocation("")
                        setCategory("")
                        setDiscount("")
                        setPostError("")
                  }).catch((e) => {
                        setPostLoading(false);
                        setPostError("Failed to post. Please, try again.")
                  })
            } else {
                  addProductPost(fromProductData).unwrap().then((d) => {
                        setProductTitle("")
                        setProductPrice("")
                        setDescription("")
                        setStoreFiles([])
                        setCurrencySign("")
                        setLocation("")
                        setCategory("")
                        setPostLoading(false);
                        setOpen(false);
                        setLocation("")
                        setCategory("")
                        setDiscount("")
                        setPostError("")
                  }).catch((e) => {
                        setPostLoading(false);
                        setPostError("Failed to post. Please, try again.")
                  })
            }
      }

      return (
            <div>
                  <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        fullScreen
                        PaperProps={windowSize.width > 768 ?
                              {
                                    style: {
                                          borderRadius: '10px',
                                          width: '500px'
                                    }
                              } :
                              {}
                        }
                  >
                        {/* post header component include title and avatar */}
                        <CreatePostHeader
                              handleClose={handleClose}
                              postTypeValue={postTypeValue}
                              setPostTypeValue={setPostTypeValue}
                              postAudience={postAudience}
                              setPostAudience={setPostAudience}
                              name={name}
                              photo={photo}
                              postError={postError}
                        />

                        <DialogContent
                              sx={
                                    windowSize.width > 425 ?
                                          {} :
                                          { padding: '10px 15px' }
                              }
                        >
                              {/* post content component include product price, text, emoji and images */}
                              <CreatePostContent
                                    chooseImgToggle={chooseImgToggle}
                                    setChooseImgToggle={setChooseImgToggle}
                                    postTypeValue={postTypeValue}
                                    storeFiles={storeFiles}
                                    setStoreFiles={setStoreFiles}
                                    description={description}
                                    setDescription={setDescription}
                                    productPrice={productPrice}
                                    setProductPrice={setProductPrice}
                                    currencySign={currencySign}
                                    setCurrencySign={setCurrencySign}
                                    productTitle={productTitle}
                                    setProductTitle={setProductTitle}
                                    location={location}
                                    setLocation={setLocation}
                                    category={category}
                                    setCategory={setCategory}
                                    discount={discount}
                                    setDiscount={setDiscount}
                                    productType={productType}
                                    setProductType={setProductType}
                                    productQuantity={productQuantity}
                                    setProductQuantity={setProductQuantity}
                                    shippingCharge={shippingCharge}
                                    setShippingCharge={setShippingCharge}
                                    termsAgreement={termsAgreement}
                                    setTermsAgreement={setTermsAgreement}
                                    districts={districts}
                                    brandName={brandName}
                                    setBrandName={setBrandName}
                                    color={color}
                                    setColor={setColor}
                                    size={size}
                                    setSize={setSize}
                                    model={model}
                                    setModel={setModel}
                                    estimateTime={estimateTime}
                                    setEstimateTime={setEstimateTime}
                                    paymentAddType={paymentAddType}
                                    setPaymentAddType={setPaymentAddType}
                                    subCategory={subCategory}
                                    setSubCategory={setSubCategory}
                                    ram={ram}
                                    setRam={setRam}
                                    rom={rom}
                                    setRom={setRom}
                              />
                        </DialogContent>

                        <DialogActions>
                              {/* footer component include images action */}
                              <CreatePostFooter
                                    setChooseImgToggle={setChooseImgToggle}
                                    postTypeValue={postTypeValue}
                                    description={description}
                                    storeFiles={storeFiles}
                                    handlePostSubmit={handlePostSubmit}
                                    isProductReadyForSubmit={isProductReadyForSubmit}
                                    postLoading={postLoading}
                              />
                        </DialogActions>
                  </Dialog>
            </div>
      );
};

export default CreatePostDialog