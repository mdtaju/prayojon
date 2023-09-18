import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { memo, useEffect, useRef, useState } from 'react';
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
      const [currencySign, setCurrencySign] = useState(0);
      const [postAudience, setPostAudience] = useState("Public");
      const [location, setLocation] = useState("");
      const [category, setCategory] = useState('');
      const [discount, setDiscount] = useState("");
      const [productType, setProductType] = useState("");
      const [productQuantity, setProductQuantity] = useState("");
      const [termsAgreement, setTermsAgreement] = useState(false);
      const [shippingCharge, setShippingCharge] = useState("");
      const [districts, setDistricts] = useState([]);
      const descriptionElementRef = useRef(null);
      const windowSize = useWindowSize();
      const [addGeneralPost, { data, isLoading, isError, error }] = useAddGeneralPostMutation();
      const [addProductPost, { data: productData, isLoading: productIsLoading }] = useAddProductPostMutation();
      const { data: authData } = useSession();

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

      const handleClose = () => {
            setOpen(false);
      };

      useEffect(() => {
            if ((!isLoading && !isError && data) || (!productIsLoading && productData)) {
                  setProductTitle("")
                  setProductPrice("")
                  setDescription("")
                  setStoreFiles([])
                  setCurrencySign("")
                  setLocation("")
                  setCategory("")
                  setOpen(false);
                  setLocation("")
                  setCategory("")
                  setDiscount("")
            }
            // if (!productIsLoading && productData) {
            //       setProductTitle("")
            //       setProductPrice("")
            //       setDescription("")
            //       setStoreFiles([])
            //       setCurrencySign("")
            //       setLocation("")
            //       setCategory("")
            //       setOpen(false);
            //       setLocation("")
            //       setCategory("")
            //       setDiscount("")
            // }
      }, [isLoading, isError, data, setOpen, productIsLoading, productData]);


      // post_type, post_title, post_content, post_audience, created_at, product

      // post submit handler
      const handlePostSubmit = async () => {
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
            const inDiscount = productPrice * discount / 100;
            const price = productPrice - inDiscount;
            fromProductData.append("price", price);

            // files making 
            for (let i = 0; i < storeFiles.length; i++) {
                  formData.append('files', storeFiles[i]);
                  fromProductData.append("files", storeFiles[i]);
            }

            if (postTypeValue === "General") {
                  addGeneralPost(formData);
            } else {
                  addProductPost(fromProductData);
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
                              />
                        </DialogContent>

                        <DialogActions>
                              {/* footer component include images action */}
                              <CreatePostFooter
                                    setChooseImgToggle={setChooseImgToggle}
                                    postTypeValue={postTypeValue}
                                    description={description}
                                    storeFiles={storeFiles}
                                    productPrice={productPrice}
                                    handlePostSubmit={handlePostSubmit}
                                    productTitle={productTitle}
                                    location={location}
                                    category={category}
                                    productType={productType}
                                    productQuantity={productQuantity}
                                    termsAgreement={termsAgreement}
                                    shippingCharge={shippingCharge}
                              />
                        </DialogActions>
                  </Dialog>
            </div>
      );
};

export default memo(CreatePostDialog);