import React from 'react';

const Conditions = ({ isAgree, setIsAgree }) => {
      return (
            <div className='my-6 common_shadow p-6'>
                  <h1 className='text-base font-semibold text-gray-800'>Read the terms  carefully below.</h1>
                  <ul className='list-inside list-none text-sm font-semibold text-gray-600 px-4 my-3 space-y-2'>
                        <li>{`১।
প্রোডাক্ট ক্রয় করার পূর্বে আপনাকে ভালো করে প্রোডাক্ট সম্পর্কে রিভিউ,  
ছবি, ভিডিও, দেখে এমন কি বিক্রেতার সাথে যোগাযোগ করে সবকিছু 
যেনে শুনে তারপর পণ্য ক্রয় করবেন। যাতে করে আপনার ক্রয় করা পণ্যের 
গুনগত মান বজায় থাকে এবং ভালো মানের পণ্য ক্রয় করতে পারেন।`}</li>
                        <li>{`২।
পণ্য বা সেবা ক্রয় করার পর আপনি এই অর্ডার বাতিল করতে হলে, 
বিক্রেতা আপনার ক্রয় করা পণ্যটি ডেলিভারি দেওয়ার পূর্বে তা বাতিল 
করুন। অন্যতায় পণ্যটি ডেলিভারি হয়ে গেলে তার ডাক মাসুল আপনাকেই 
বহন করতে হবে। `}</li>
                        <li>{`৩। 
কোন কারন ছাড়া যদি পণ্য ফেরত দিতে চান তবে তার ডাক মাসুল 
আপনাকে বহন করতে হবে তবে যদি পণ্যটি ত্রুতিপূর্ণ, কাজ করে না
বা অকেজু হয় তাহলে বিক্রেতা নতুন আরেকটি পণ্য প্রেরন করবেন
অথবা আপনাকে টাকা ফেরত দিবেন। `}</li>
                        <li>{`৪। 
পণ্য বা সেবার উল্লেখিত বিবরন, ছবি বা ভিডিও ইত্যাদি তত্ত্ববিবরনের 
সাথে যদি আপনার ক্রয়কৃত পণ্যের অবিকল কোন মিল খুঁজে না পান তবে তা
আমাদেরকে এবং বিক্রেতাকে সত্তর জানান, বিক্রেতা আপনাকে সটীক পণ্য 
অথবা টাকা ফেরত দিতে বাদ্য থাকিবেন।`}</li>
                  </ul>
                  <label className='flex items-center gap-2 select-none cursor-pointer w-fit'>
                        <input className='w-[15px] h-[15px]' type="checkbox" name="" id="condition" checked={isAgree} onChange={(e) => setIsAgree((prevCheck) => !prevCheck)} />
                        <span className='font-bold text-sm text-gray-800'>I have read and agree to the terms.</span>
                  </label>
            </div>
      );
};

export default Conditions;