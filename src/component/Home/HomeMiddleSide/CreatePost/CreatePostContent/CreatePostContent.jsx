import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import React, { memo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CreatePostPrice from './CreatePostPrice';
const CreatePostDropZone = dynamic(() => import('./CreatePostDropZone'), { ssr: false });
const CreatePostImgList = dynamic(() => import('./CreatePostImgList'), { ssr: false });
const CustomPopper = dynamic(() => import('../../../../common/CustomPopper'), { ssr: false });
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

const CreatePostContent = ({
      chooseImgToggle,
      setChooseImgToggle,
      postTypeValue,
      storeFiles,
      setStoreFiles,
      description,
      setDescription,
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
      const [fileSizeWarning, setFileSizeWarning] = useState("");
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();

      // file size validation
      const onDrop = useCallback(selectedFiles => {
            const acceptedFiles = [];
            if (storeFiles?.length === 0 && !isImageFile(selectedFiles[0])) {
                  setFileSizeWarning(`Your selected first file must be an image`)
                  return setTimeout(() => { setFileSizeWarning([]) }, 5000)
            }
            // Add the files to the state
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
            return setStoreFiles((prevState) => [...prevState, ...acceptedFiles])
      }, [setStoreFiles])

      // check is first file an image 
      const isImageFile = (file) => {
            return file.type.startsWith("image/");
      };

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

      // emoji popper click function
      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };

      return (
            <div>
                  {/* Product currency and price input component */}
                  {
                        postTypeValue === 'Product' &&
                        <CreatePostPrice
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
                        />
                  }
                  {/* Write post text here */}
                  <textarea
                        placeholder={postTypeValue === 'General' ? 'Whats on your mind?' : 'Write your product description.'}
                        className='w-full min-h-[200px] h-fit outline-none resize-none placeholder:text-2xl placeholder:font-normal text-[.9375rem] leading-[1.3333] placeholder:leading-4 text-black overflow-hidden'
                        autoFocus='autofocus'
                        wrap='hard'
                        value={description}
                        onChange={(e) => {
                              setDescription(e.target.value);
                              e.target.style.height = 'inherit';
                              e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                  />
                  {/* Emoji button to open emojis */}
                  <div
                        onClick={handleClick('top')}
                        className='p-1 w-fit ml-auto mb-2 cursor-pointer'>
                        <FontAwesomeIcon
                              icon={faFaceSmile}
                              className='text-2xl text-gray-600'
                        />
                  </div>
                  {/* Emoji popper */}
                  <CustomPopper
                        setOpenPopper={setOpen}
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                  >
                        {/* emoji picker package from external package */}
                        <EmojiPicker
                              skinTonesDisabled={true}
                              searchDisabled={true}
                              width={360}
                              height={350}
                              autoFocusSearch={false}
                              emojiStyle='facebook'
                              previewConfig={{ showPreview: false }}
                              lazyLoadEmojis={true}
                              onEmojiClick={(e) => setDescription((prevState) => prevState + e.emoji)}
                        />
                  </CustomPopper>
                  {/* File size warning messages */}
                  {
                        fileSizeWarning &&
                        <p
                              className='text-xs font-semibold text-red-400 text-center mb-1'
                        >
                              {fileSizeWarning}
                        </p>
                  }
                  {
                        // drag drop file input & show main container
                        chooseImgToggle &&
                        <div className='w-full p-2 border border-gray-300 rounded-md relative group'>

                              {/* close button */}
                              <div
                                    onClick={() => { setChooseImgToggle(false); setStoreFiles([]) }}
                                    className='z-10 absolute w-[38px] h-[38px] bg-white border border-gray-200 hover:bg-gray-200 rounded-full shadow-sm grid place-items-center top-4 right-4 cursor-pointer'>
                                    <FontAwesomeIcon
                                          icon={faXmark}
                                          className='text-lg text-gray-600'
                                    />
                              </div>
                              {/* after image select. choose image more button */}
                              {
                                    storeFiles.length !== 0 &&
                                    <div
                                          {...getRootProps()}
                                          className='bg-white hover:bg-gray-100 active:scale-95 duration-150 border border-gray-200 py-2 px-3 rounded-md cursor-pointer absolute top-5 left-5 z-10 invisible group-hover:visible'>
                                          <FontAwesomeIcon
                                                icon={faCloudArrowUp}
                                          />
                                          <span className='text-base font-semibold select-none'> Add Photos/Videos</span>
                                    </div>
                              }
                              {/* file input and show container */}
                              {
                                    storeFiles.length === 0 ?
                                          // This component is input to drag & drop/select images and videos 
                                          <CreatePostDropZone
                                                getRootProps={getRootProps}
                                                getInputProps={getInputProps}
                                          /> :
                                          // this component displaying images and videos after select.
                                          <CreatePostImgList
                                                storeFiles={storeFiles}
                                                setStoreFiles={setStoreFiles}
                                          />
                              }
                        </div>
                  }
            </div>
      );
};

export default memo(CreatePostContent);