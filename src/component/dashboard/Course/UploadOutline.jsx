import React from 'react';

const UploadOutline = () => {
      return (
            <div className='w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 dashboard_cart_shadow mt-6 rounded-sm'>
                  {/* Primary course details */}
                  <div className='flex gap-4 items-start'>
                        <div className='w-[35px] h-[35px] grid place-items-center rounded-full bg-primary text-white shadow-lg'>
                              <h1 className='text-lg font-bold'>1</h1>
                        </div>
                        <div>
                              <h1 className='text-lg font-semibold text-gray-800'>Primary Course Details</h1>
                              <ul className='list-disc list-inside pl-2 text-base font-semibold mt-2 text-orange-500'>
                                    <li>Course Title</li>
                                    <li>Course Description</li>
                                    <li>Course Price</li>
                                    <li>Enrollment Date</li>
                                    <li>Intro Video</li>
                              </ul>
                        </div>
                  </div>
                  {/* About Instructors */}
                  <div className='flex gap-4 items-start'>
                        <div className='w-[35px] h-[35px] grid place-items-center rounded-full bg-primary text-white shadow-lg'>
                              <h1 className='text-lg font-bold'>2</h1>
                        </div>
                        <div>
                              <h1 className='text-lg font-semibold text-gray-800'>About Instructors</h1>
                              <ul className='list-disc list-inside pl-2 text-base font-semibold mt-2 text-orange-500'>
                                    <li>Instructor Name</li>
                                    <li>Instructor Qualification</li>
                                    <li>About Instructor</li>
                                    <li>Instructor Image</li>
                              </ul>
                        </div>
                  </div>
                  {/* upload your course */}
                  <div className='flex gap-4 items-start'>
                        <div className='w-[35px] h-[35px] grid place-items-center rounded-full bg-primary text-white shadow-lg'>
                              <h1 className='text-lg font-bold'>3</h1>
                        </div>
                        <div>
                              <h1 className='text-lg font-semibold text-gray-800'>Upload your course</h1>
                              <ul className='list-disc list-inside pl-2 text-base font-semibold mt-2 text-orange-500'>
                                    <li>Course Module</li>
                                    <li>Video & Title</li>
                                    <li>Description</li>
                                    <li>Note</li>
                              </ul>
                        </div>
                  </div>
            </div>
      );
};

export default UploadOutline;