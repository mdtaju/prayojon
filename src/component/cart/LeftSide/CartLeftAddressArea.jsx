import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, IconButton } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';
import useWindowSize from '../../../hook/useWindowSize';

const CartLeftAddressArea = ({ setShippingInfo }) => {
      const { data: session } = useSession();
      const { data = [] } = useGetUserQuery(session?.user?.email);
      const [open, setOpen] = useState(false);
      const windowSize = useWindowSize();
      const [name, setName] = useState("");
      const [phone, setPhone] = useState("");
      const [city, setCity] = useState("");
      const [email, setEmail] = useState("");
      const [address, setAddress] = useState("");

      useEffect(() => {
            if (data && data?.length !== 0) {
                  setShippingInfo((prevInfo) => {
                        return {
                              ...prevInfo,
                              name: data[0]?.name,
                              phone: data[0]?.phone,
                              email: data[0]?.email,
                              country: data[0]?.country_name,
                              city: data[0]?.city,
                              address: data[0]?.address,
                        }
                  });
                  setName(data[0]?.name);
                  setPhone(data[0]?.phone);
                  setCity(data[0]?.city);
                  setEmail(data[0]?.email ? data[0].email : "");
                  setAddress(data[0]?.address);
            }
      }, [data, setShippingInfo]);

      const action = (
            <>
                  <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        className='float-right bg-orange-500 w-[35px] h-[35px] hover:bg-orange-500'
                        onClick={() => setOpen(false)}
                  >
                        <FontAwesomeIcon
                              className='text-white'
                              icon={faClose}
                        />
                  </IconButton>
            </>
      );

      const handleSubmit = (e) => {
            e.preventDefault();
            setShippingInfo((prevInfo) => {
                  return {
                        ...prevInfo,
                        name: name,
                        phone: phone,
                        email: email,
                        city: city,
                        address: address,
                  }
            });
            setOpen(false);
      }

      return (
            <div className='w-full mt-6 common_shadow flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-3'>
                  <h1 className='text-base font-bold whitespace-nowrap text-primary'>Shipping Info</h1>
                  <div>
                        <h4 className='text-sm font-bold text-gray-800'>Name: <span className='font-semibold text-gray-600'>{name}</span></h4>
                        <h4 className='text-sm font-bold text-gray-800'>Phone: <span className='font-semibold text-gray-600'>+{phone}</span></h4>
                        <h4 className='text-sm font-bold text-gray-800'>Email: <span className='font-semibold text-gray-600'>{email}</span></h4>
                        <h4 className='text-sm font-bold text-gray-800'>City: <span className='font-semibold text-gray-600'>{city}</span></h4>
                        <h4 className='text-sm font-bold text-gray-800'>Address: <span className='font-semibold text-gray-600'>{address}</span></h4>
                  </div>
                  <div onClick={() => setOpen(true)} className='flex gap-1 items-center text-base font-medium text-primary cursor-pointer p-1'>
                        <FontAwesomeIcon
                              icon={faPenToSquare}
                        />
                        <span>Edit</span>
                  </div>
                  <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
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
                        <div className='p-4 w-full h-full'>
                              {action}
                              <div className='w-full h-[80%]'>
                                    <h1 className='text-lg font-bold'>Edit Shipping Info</h1>
                                    <form onSubmit={handleSubmit}>
                                          <div className='flex flex-col gap-1 mt-4'>
                                                <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_name">Your Name *</label>
                                                <input required value={name} onChange={(e) => setName(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your Name' id='profile_user_name' />
                                          </div>
                                          <div className='flex flex-col gap-1 mt-4'>
                                                <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_phone">Your Phone *</label>
                                                <input required value={phone} onChange={(e) => setPhone(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="number" placeholder='Your Phone' id='profile_user_phone' />
                                          </div>
                                          <div className='flex flex-col gap-1 mt-4'>
                                                <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_email">Your Email *</label>
                                                <input required value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your Email' id='profile_user_email' />
                                          </div>
                                          <div className='flex flex-col gap-1 mt-4'>
                                                <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_city">Your City *</label>
                                                <input required value={city} onChange={(e) => setCity(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your city' id='profile_user_city' />
                                          </div>
                                          <div className='flex flex-col gap-1 mt-4'>
                                                <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_address">Your Address *</label>
                                                <input required value={address} onChange={(e) => setAddress(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your address' id='profile_user_address' />
                                          </div>
                                          <button type='submit' className='btn_primary w-full mt-6'>Confirm</button>
                                    </form>
                              </div>
                        </div>
                  </Dialog>
            </div>
      );
};

export default CartLeftAddressArea;