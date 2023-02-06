
import { Fade, Popper } from '@mui/material';
import React from 'react';
const CustomPopper = ({ children, ...rest }) => {
      return (
            <Popper
                  {...rest}
                  transition
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
      );
};

export default CustomPopper;