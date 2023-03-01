import { Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../../../hook/useWindowSize';
import CreatePostContent from './CreatePostContent/CreatePostContent';
import CreatePostFooter from './CreatePostFooter';
import CreatePostHeader from './CreatePostHeader';

const CreatePostDialog = ({ open, setOpen }) => {
      const [chooseImgToggle, setChooseImgToggle] = useState(false)
      const [postTypeValue, setPostTypeValue] = useState("General");
      const [productPrice, setProductPrice] = useState("");
      const [description, setDescription] = useState("");
      const [storeFiles, setStoreFiles] = useState([]);
      const [currencySign, setCurrencySign] = useState(0);
      const [postAudience, setPostAudience] = useState("Public");
      const descriptionElementRef = useRef(null);
      const windowSize = useWindowSize();

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
                              />
                        </DialogActions>
                  </Dialog>
            </div>
      );
};

export default CreatePostDialog;