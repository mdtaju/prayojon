import { faCaretDown, faEarthAmerica, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import React from 'react';

const CreatePostHeader = ({
      handleClose,
      postTypeValue,
      setPostTypeValue,
      postAudience,
      setPostAudience,
      name,
      photo,
      postError
}) => {
      const options = ['General', 'Product']
      const handleChange = (e) => {
            setPostTypeValue(e.target.value)
      }
      return (
            <>
                  <div className='relative'>
                        <div className='text-center p-2'>
                              <DialogTitle className='p-0' id="scroll-dialog-title">Create Post</DialogTitle>
                              <p className='text-xs text-red-600 font-semibold'>{postError}</p>
                        </div>
                        <button
                              onClick={handleClose}
                              className='absolute top-[50%] translate-y-[-50%] right-4 w-[35px] h-[35px] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 active:scale-95 duration-150'>
                              <FontAwesomeIcon
                                    icon={faXmark}
                              />
                        </button>
                  </div>
                  <div className='w-full h-[1px] bg-gray-300'></div>
                  {/* down header container */}
                  <div className='px-4 py-3 flex items-center justify-between'>
                        {/* avatar area */}
                        <div className='flex items-center gap-3'>
                              <div>
                                    <Avatar
                                          alt="Remy Sharp"
                                          src={photo}
                                          sx={{ width: 44, height: 44 }}
                                    />
                              </div>
                              <div>
                                    <span className='text-base text-gray-800 font-semibold'>{name}</span>
                                    {/* Post access public/friend */}
                                    <div className='group px-2 py-[2px] bg-gray-200 w-fit flex items-center gap-1 rounded-md cursor-pointer relative'>
                                          {
                                                postAudience === "Followers" ?
                                                      <FontAwesomeIcon
                                                            icon={faUserGroup}
                                                            className='text-[10px]'
                                                      /> :
                                                      <FontAwesomeIcon
                                                            icon={faEarthAmerica}
                                                            className='text-[10px]'
                                                      />
                                          }
                                          <span className='text-sm font-semibold text-gray-800'>
                                                {postAudience === "Followers" ? "Followers" : "Public"}
                                          </span>
                                          <FontAwesomeIcon
                                                icon={faCaretDown}
                                                className='text-[12px]'
                                          />
                                          {/* popup on hover for select post audience */}
                                          <div className='absolute top-8 left-0 invisible group-hover:visible transform group-hover:-translate-y-2 duration-150 w-[150px] bg-white shadow-lg p-2 border border-gray-200 rounded-md z-[100]'>
                                                <FormControl>
                                                      <FormLabel id="demo-radio-buttons-group-label">Post Audience</FormLabel>
                                                      <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="Public"
                                                            name="radio-buttons-group"
                                                            className='mt-2'
                                                            onChange={(e) => setPostAudience(e.target.value)}
                                                      >
                                                            <FormControlLabel
                                                                  sx={{ height: '30px', fontSize: '10px' }}
                                                                  value="Public"
                                                                  control={<Radio />}
                                                                  label={`Public`} />

                                                            <FormControlLabel
                                                                  sx={{ height: '30px', fontSize: '10px' }}
                                                                  value="Followers"
                                                                  control={<Radio />}
                                                                  label="Followers" />
                                                      </RadioGroup>
                                                </FormControl>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        {/* post category drop down */}
                        <div className='w-[140px]'>
                              {/* <div className='mb-2'>
                                    <span className='text-sm font-semibold'>Post Type {"*"}</span>
                              </div> */}
                              <FormControl
                                    fullWidth
                                    size='small'
                                    variant="outlined"
                              >
                                    <InputLabel id="demo-simple-select-label">Select a post type</InputLabel>
                                    <Select
                                          sx={{ width: '100%', height: '38px', fontSize: '14px' }}
                                          required
                                          fullWidth
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={postTypeValue}
                                          label={'Select a post type'}
                                          onChange={handleChange}
                                          variant="outlined"
                                    >
                                          {
                                                options.map((item, i) => (
                                                      <MenuItem value={item} key={i}>{item}</MenuItem>
                                                ))
                                          }
                                    </Select>
                              </FormControl>
                        </div>
                  </div>
            </>
      );
};

export default CreatePostHeader