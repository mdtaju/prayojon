import { Autocomplete, Avatar, TextField } from '@mui/material';
import moment from 'moment/moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from 'react-dropzone';
import { useAddCoverPicMutation, useAddPersonalInfoMutation, useAddProfilePicMutation, useGetUserQuery } from '../../../features/profile/profileApi';
import { bd_districts } from '../../../utils/bd_districts';
import CoverPhoto from './CoverPhoto';

const professions = [
      "No one",
      "Architect",
      "Accountant",
      "Advertising Media",
      "App Developer",
      "App Designer",
      "Agriculture",
      "Agro Firms",
      "Air Conditioner Cleaning",
      "Artist",
      "Arts",
      "Baby Care",
      "BabySitter",
      "Bags & Buggage",
      "Bangla Teacher",
      "Beautician",
      "Beauty Product",
      "Beauty Parlor",
      "Boys Clothing",
      "Boys Shoes & Accessories",
      "Brockers",
      "Builders",
      "Buying House",
      "Carpet Cleaning",
      "Catering Service",
      "CCTV & Cameras",
      "Collages",
      "Content Creator",
      "Classes",
      "Cleaners",
      "CNG Driver",
      "Carers",
      "Car Part & Spares",
      "Cas Mechanics",
      "Car Workshop",
      "Computer & Accessories",
      "Computer Repairing",
      "Construction",
      "Consulting",
      "Cosmetics",
      "Dairy Firms",
      "Digital Marketing",
      "Delivery Man",
      "Dentist",
      "Doctors",
      "Drivers",
      "Elderly Care",
      "Elderly Home",
      "Electrician",
      "Electronics",
      "Email Marketing",
      "English Tutors",
      "Engineer",
      "Engineering Workshop",
      "Entertainer",
      "Event Management",
      "Event Planner",
      "Farms",
      "Fashion House",
      "Financial Services",
      "Fish & Meat",
      "Food & bevareg",
      "Freelancer",
      "Fruite Shop",
      "Furniture",
      "Gardenar",
      "Game Development & Design",
      "Gedgets",
      "Gifts & Accessories",
      "Girls Dress",
      "Girls Shoes & Accessories",
      "Graphics Design",
      "Grocery",
      "Home Applaince",
      "Home Assistance",
      "Home Cleaning",
      "Handymans",
      "Health Product",
      "Import/Export",
      "Industrial Equipment",
      "Insurence",
      "Jewellers",
      "Jewellery Mens",
      "Jewellery Womans",
      "Keyword Research",
      "Kids Clothing & Accessories",
      "Kids Toys",
      "Labourer",
      "Librery",
      "Laundry Shop",
      "Laundry Service",
      "Laryers",
      "Legal Services",
      "Locksmith",
      "Logo Design",
      "Marketing",
      "Mans Clothing",
      "Mans Shoes & Accessories",
      "Maids",
      "Maid Service",
      "Math Tutor",
      "Math Classes",
      "Mechanics",
      "Menufecturer",
      "Media",
      "Medicin",
      "Mobile Accessories",
      "Motorcycle Patrs",
      "Mover",
      "Nurse",
      "Nanny",
      "NGo",
      "online Quran Teaching",
      "Office Equipment",
      "Panjabi House",
      "Personal Trainrs",
      "Pest Control",
      "Pharmecy",
      "Phone, Laptop & Camera",
      "Phone, Cmera, Watch Repairing",
      "Photo Editing",
      "Photographer",
      "Photoshop",
      "Plumber",
      "Poultry",
      "Printing",
      "Privet Scholl",
      "Quran Teacher",
      "Real Estate",
      "Rentals",
      "Rent A Cars",
      "Retail Shop",
      "Scholls",
      "SEO",
      "Security",
      "Security Service",
      "Singing Tutors",
      "Social Worker",
      "Social Media Marketing",
      "Software Engineer",
      "Software Developer",
      "Software & Services",
      "Students",
      "Retail Suppliers",
      "Telecommiunications",
      "Therapist",
      "Tools & DIY",
      "Transportation",
      "Truck Driver",
      "Tutors",
      "TV & Fridge Repairing",
      "Utilities",
      "Van Driver",
      "Video Editing",
      "Watches",
      "Womans Clothing",
      "Woman Shoes & Accessories",
      "Website Designer",
      "Website Developer",
      "Welding Workshop",
      "Wholesale",
      "Work from Home",
      "Others"
];

const EditPersonalInfo = () => {
      const [fileSizeWarning, setFileSizeWarning] = useState([]);
      const [storeFiles, setStoreFiles] = useState([]);
      const [coverPhoto, setCoverPhoto] = useState([]);
      const [addPersonalInfo, { data, personalInfo }] = useAddPersonalInfoMutation();
      const [addProfilePic, { data: profileData }] = useAddProfilePicMutation();
      const [addCoverPic, { data: coverPic }] = useAddCoverPicMutation();
      const { data: authData } = useSession();
      const { data: getAuthUser, refetch } = useGetUserQuery(authData?.user?.email);
      const [name, setName] = useState("");
      const [city, setCity] = useState("");
      const [address, setAddress] = useState("");
      const [birthday, setBirthday] = useState("");
      const [providedBirthday, setProvidedBirthday] = useState("");
      const [bio, setBio] = useState("");
      const [profileUrl, setProfileUrl] = useState("");
      const [coverUrl, setCoverUrl] = useState("");
      const [userProfession, setUserProfession] = useState("Others");
      const [districts, setDistricts] = useState([]);
      const router = useRouter();



      // getting the district names
      useEffect(() => {
            if (bd_districts) {
                  let districtNames = [];
                  bd_districts?.map((d) => {
                        districtNames.push(d.name);
                  });
                  setDistricts(districtNames)
            }
      }, []);

      // get auth users name, address, photo and cover-photo 
      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.name) {
                  setName(getAuthUser[0].name);
            }
            if (getAuthUser && getAuthUser[0]?.profession) {
                  setUserProfession(getAuthUser[0].profession);
            }
            if (getAuthUser && getAuthUser[0]?.city) {
                  setCity(getAuthUser[0].city);
            }
            if (getAuthUser && getAuthUser[0]?.address) {
                  setAddress(getAuthUser[0]?.address);
            }
            if (getAuthUser && getAuthUser[0]?.birthday) {
                  setProvidedBirthday(getAuthUser[0]?.birthday);
            }
            if (getAuthUser && getAuthUser[0]?.bio) {
                  setBio(getAuthUser[0]?.bio);
            }
            if (getAuthUser && getAuthUser[0]?.photo_url) {
                  setProfileUrl(getAuthUser[0]?.photo_url);
            }
            if (getAuthUser && getAuthUser[0]?.cover_photo_url) {
                  setCoverUrl(getAuthUser[0]?.cover_photo_url);
            }
      }, [getAuthUser]);

      // file size validation - profile picture
      const onDrop = useCallback(selectedFiles => {
            const acceptedFiles = [];
            selectedFiles.forEach((item) => {
                  // calculation of each selected file size into MB(Mega byte).
                  const getSize = item.size / (1024 ** 2);
                  if (getSize < 25) {
                        acceptedFiles.push(item); // if file size small than 25MB then is accepted
                  } else {
                        setFileSizeWarning((prevState) => [...prevState, `Your selected file "${item.name}" is large than 25MB.`])
                  }
            })
            // after 5 seconds warning messages will remove.
            // console.log("called file fun")
            setTimeout(() => { setFileSizeWarning([]) }, 5000)
            return setStoreFiles(acceptedFiles)
      }, [setStoreFiles])

      // file type validation - profile picture
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            multiple: false,
            accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                  'image/gif': ['.gif']
            }
      })

      const handleSubmit = async (e) => {
            e.preventDefault();
            const birthdayDate = new Date(birthday).toUTCString();
            if (name || userProfession || city || address || birthday || bio) {
                  addPersonalInfo({ name, profession: userProfession, city, address, birthday: providedBirthday, bio, id: authData?.user?.email })
            }
            if (storeFiles?.length !== 0) {
                  const formData = new FormData();
                  formData.append("file", storeFiles[0]);
                  formData.append("id", authData?.user?.email);
                  // formData.append("type",);
                  addProfilePic(formData);
            }
            if (coverPhoto?.length !== 0) {
                  const coverForm = new FormData();
                  coverForm.append("file", coverPhoto[0]);
                  coverForm.append("id", authData?.user?.email);
                  // coverForm.append("type",);
                  addCoverPic(coverForm);
            }
            setStoreFiles([]);
            setCoverPhoto([]);
            if (personalInfo || profileData || coverPic) {
                  refetch(authData?.user?.email)
                  window.open("/profile")
            }
      }

      return (
            <div className='w-full'>
                  {/* title part */}
                  <div className='w-full pb-2 border-b border-gray-300'>
                        <h1 className='text-lg font-semibold text-gray-800'>Personal Info</h1>
                        <span className='text-sm font-medium text-gray-600'>Edit your personal information.</span>
                  </div>
                  <form onSubmit={handleSubmit}>
                        {/* profile picture */}
                        <div className='flex items-start gap-3 mt-4'>
                              <div>
                                    <Avatar
                                          alt="Remy Sharp"
                                          src={storeFiles.length === 0 ? profileUrl : URL.createObjectURL(storeFiles[0])}
                                          sx={{ width: 80, height: 80 }}
                                    />
                              </div>
                              <div>
                                    <div>
                                          <p className='text-base font-semibold text-gray-600 leading-[12px]'>Profile Picture</p>
                                          <span className='text-sm font-semibold text-gray-600'>Chose your profile picture</span>
                                    </div>
                                    <div className='mt-2'>
                                          <button {...getRootProps()} className='btn_primary mr-3 whitespace-nowrap'>Chose File</button>
                                          <input {...getInputProps()} />
                                          <span className='text-xs font-semibold text-gray-600'>{
                                                storeFiles.length !== 0 ?
                                                      storeFiles[0].name :
                                                      "No file chosen"
                                          }</span>
                                    </div>
                              </div>
                        </div>
                        {/* inputs container */}
                        <div className='w-full mt-6 grid grid-cols-1 items-end sm:grid-cols-2 gap-4'>
                              {/* user name input */}
                              <div className='flex flex-col gap-1'>
                                    <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_name">Your Full Name *</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} required className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your name' id='profile_user_name' />
                              </div>
                              <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={professions}
                                    sx={{ width: "100%" }}
                                    size='small'
                                    value={userProfession}
                                    onChange={(e, newInputValue) => setUserProfession(newInputValue)}
                                    renderInput={(params) => <TextField {...params} label="Profession" />}
                              />
                              <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={districts}
                                    sx={{ width: "100%" }}
                                    size='small'
                                    value={city}
                                    onChange={(e, newInputValue) => setCity(newInputValue)}
                                    renderInput={(params) => <TextField {...params} label="Your City" />}
                              />
                              {/* user city input */}
                              {/* <div className='flex flex-col gap-1'>
                                    <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_city">City</label>
                                    <input value={city} onChange={(e) => setCity(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your city' id='profile_user_city' />
                              </div> */}
                              {/* user address input */}
                              <div className='flex flex-col gap-1'>
                                    <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_address">Your Address</label>
                                    <input value={address} onChange={(e) => setAddress(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your address' id='profile_user_address' />
                              </div>
                              {/* user birthday input */}
                              <div className='flex flex-col gap-1'>
                                    <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_date">Birthday / {moment(providedBirthday).format('LL')}</label>
                                    <input type="date" value={providedBirthday} onChange={(e) => setProvidedBirthday(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' placeholder='Your address' id='profile_user_date' />
                                    {/* <DatePicker
                                          selected={birthday}
                                          onChange={(date) => setBirthday(date)}
                                          dateFormat="dd/MM/yyyy"
                                          className='outline-none py-1 px-2 border border-gray-300 rounded-md'
                                    /> */}
                              </div>
                        </div>
                        {/* user bio input */}
                        <div className='flex flex-col gap-1 mt-4'>
                              <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_date">Bio</label>
                              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' placeholder='Your self' id='profile_user_date' />
                              <span className='text-xs font-semibold text-gray-800'>Max length 150 character ({bio.length}).</span>
                        </div>

                        {/* cover photo title and container */}
                        <CoverPhoto
                              coverPhoto={coverPhoto}
                              setCoverPhoto={setCoverPhoto}
                              coverUrl={coverUrl}
                        />
                  </form>
            </div>
      );
};

export default EditPersonalInfo;