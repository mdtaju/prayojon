import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import Availability from './Availability';
import Categories from './Categories';
import Condition from './Condition';
import PriceRange from './PriceRange';
import SellerType from './SellerType';

const MobileSidebar = ({ filters, setFilters }) => {
      const [open, setOpen] = useState(false);

      const handleClose = () => {
            setOpen(false);
      }
      return (
            <>
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
                        </div>

                        <DialogContent
                              sx={{ paddingX: '15px' }}
                        >
                              <PriceRange
                                    filters={filters}
                                    setFilters={setFilters}
                                    margin="10px" />
                              <SellerType
                                    filters={filters}
                                    setFilters={setFilters}
                              />
                              <Availability
                                    filters={filters}
                                    setFilters={setFilters}
                              />
                              <Condition
                                    filters={filters}
                                    setFilters={setFilters}
                              />
                              <Categories
                                    filters={filters}
                                    setFilters={setFilters}
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

export default MobileSidebar;