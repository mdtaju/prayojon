
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Fade, Popper } from '@mui/material';
import React from 'react';
const CustomPopper = ({ children, ...rest }) => {
      const { setOpenPopper, anchorEl, open, placement } = { ...rest };

      // click capture outside of the element
      const handleClickAway = () => {
            setOpenPopper(false);
      }
      return (
            <>
                  {
                        open &&
                        <ClickAwayListener
                              mouseEvent="onClick"
                              // touchEvent="onTouchStart"
                              disableReactTree={true}
                              onClickAway={() => handleClickAway()}>
                              <Popper
                                    anchorEl={anchorEl}
                                    open={open}
                                    placement={placement}
                                    transition
                                    style={{ zIndex: '6000', overflowY: 'auto', maxHeight: '85vh', overscrollBehaviorY: "contain" }}
                              // className='custom_scrollbar'
                              >
                                    {({ TransitionProps }) => (
                                          <Fade {...TransitionProps} timeout={100}>
                                                <div
                                                      className='border border-gray-200 shadow-md bg-white rounded-md w-fit h-full'>
                                                      {children}
                                                </div>
                                          </Fade>
                                    )}
                              </Popper>
                        </ClickAwayListener>
                  }
            </>
      );
};

export default CustomPopper;