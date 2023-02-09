
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Fade, Popper } from '@mui/material';
import React from 'react';
const CustomPopper = ({ children, ...rest }) => {
      const { setOpenPopper, anchorEl, open, placement } = { ...rest };
      const handleClickAway = () => {
            setOpenPopper(false);
            // console.log("Handle Click Away")
      }
      return (
            <ClickAwayListener onClickAway={() => handleClickAway()}>
                  <Popper
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                        transition
                        style={{ zIndex: '100' }}
                        modifiers={[
                              {
                                    name: 'flip',
                                    enabled: true,
                                    options: {
                                          altBoundary: true,
                                          rootBoundary: 'document',
                                          padding: 8,
                                    },
                              },
                              {
                                    name: 'preventOverflow',
                                    enabled: true,
                                    options: {
                                          altAxis: true,
                                          altBoundary: true,
                                          tether: true,
                                          rootBoundary: 'document',
                                          padding: 8,
                                    },
                              }]}
                  >
                        {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={100}>
                                    <div className='p-3 shadow-md bg-white rounded-md'>
                                          {children}
                                    </div>
                              </Fade>
                        )}
                  </Popper>
            </ClickAwayListener>
      );
};

export default CustomPopper;