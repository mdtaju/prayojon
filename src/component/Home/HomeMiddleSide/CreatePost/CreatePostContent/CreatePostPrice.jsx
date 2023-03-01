import { faBangladeshiTakaSign, faDollarSign, faEuroSign, faIndianRupeeSign, faSterlingSign, faYenSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, Select, TextField } from '@mui/material';
import React, { memo } from 'react';

const CreatePostPrice = ({
      productPrice,
      setProductPrice,
      currencySign,
      setCurrencySign
}) => {

      // set currency function
      const handleChange = (event) => {
            setCurrencySign(event.target.value);
      };
      // Currencies 
      const Currency = [
            <FontAwesomeIcon icon={faDollarSign} className='text-gray-600' key={0} />,
            <FontAwesomeIcon icon={faEuroSign} className='text-gray-600' key={1} />,
            <FontAwesomeIcon icon={faBangladeshiTakaSign} className='text-gray-600' key={2} />,
            <FontAwesomeIcon icon={faIndianRupeeSign} className='text-gray-600' key={3} />,
            <FontAwesomeIcon icon={faYenSign} className='text-gray-600' key={4} />,
            <FontAwesomeIcon icon={faSterlingSign} className='text-gray-600' key={5} />
      ]
      return (
            <div>
                  {/* Select currency */}
                  <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currencySign}
                        onChange={handleChange}
                        size="small"
                        sx={{ width: '60px', "& fieldset": { borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' } }}
                  >
                        {
                              Currency.map((item, i) => (
                                    <MenuItem value={i} key={i}>{item}</MenuItem>
                              ))
                        }
                  </Select>
                  {/* write product price */}
                  <TextField
                        required
                        sx={{ width: 'fit-content', "& fieldset": { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' } }}
                        type='number'
                        size='small'
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        className='mb-4'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                  />
            </div>
      );
};

export default memo(CreatePostPrice);