import { faArrowLeft, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import HomeLeftNavigation from '../../../Home/HomeLeftNavigation/HomeLeftNavigation';

const MenuTabTopSide = () => {
      const [open, setOpen] = useState(false);
      const handleClose = () => {
            setOpen(false);
      };
      return (
            <>
                  {/* content in dialog */}
                  <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        fullScreen
                  >
                        {/* post header component include title and avatar */}
                        <div className='flex items-center justify-between px-4 py-2 gap-2 border-b border-gray-400'>
                              <button
                                    className='p-2'
                                    onClick={() => setOpen(false)}>
                                    <FontAwesomeIcon
                                          className="text-gray-600 text-lg"
                                          icon={faArrowLeft}
                                    />
                              </button>
                              <div className="w-fit flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                                    <FontAwesomeIcon
                                          className="text-gray-400 text-base"
                                          icon={faMagnifyingGlass}
                                    />
                                    <input className="outline-none border-none bg-transparent placeholder:text-gray-500 font-medium placeholder:font-normal" placeholder="Search prayojon" type="text" />
                              </div>
                        </div>

                        <DialogContent
                              sx={{ padding: '5px' }}
                        >
                              {/* post content component include product price, text, emoji and images */}
                              <HomeLeftNavigation
                              />
                        </DialogContent>
                  </Dialog>

                  {/* tree line menu */}
                  <div
                        onClick={() => setOpen(true)}
                        className='nav_icon_round_btn'>
                        <FontAwesomeIcon
                              className="text-gray-600 text-base"
                              icon={faBars}
                        />
                  </div>
            </>
      );
};

export default MenuTabTopSide;