
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Fade, Popper } from '@mui/material';
import React from 'react';
const CustomPopper = ({ children, ...rest }) => {
      const { setOpenPopper, anchorEl, open, placement } = { ...rest };
      const handleClickAway = () => {
            setOpenPopper(false);
      }
      return (
            <ClickAwayListener
                  mouseEvent="onMouseDown"
                  // touchEvent="onTouchStart"
                  onClickAway={() => handleClickAway()}>
                  <Popper
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                        transition
                        style={{ zIndex: '100' }}
                  >
                        {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={100}>
                                    <div
                                          className='p-3 shadow-md bg-white rounded-md w-fit h-fit'>
                                          {children}
                                    </div>
                              </Fade>
                        )}
                  </Popper>
            </ClickAwayListener>
      );
};

export default CustomPopper;