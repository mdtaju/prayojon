import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React from 'react';

const PostTopArea = () => {
      return (
            // in this component. there are two part here. one is header and another is post description 
            <div className='w-full px-4'>
                  {/* post header */}
                  <div className='w-full flex items-center justify-between'>
                        <div className='flex gap-3'>
                              <Avatar
                                    alt="Remy Sharp"
                                    //   src="/static/images/avatar/1.jpg"
                                    sx={{ width: 40, height: 40 }}
                              />
                              <div className='flex flex-col'>
                                    <div><h1 className='text-base text-gray-800 font-semibold'>Korimullah</h1></div>
                                    <div><p className='text-xs font-semibold text-gray-500'>5h</p></div>
                              </div>
                        </div>
                        <div className='p-1 cursor-pointer'>
                              <FontAwesomeIcon
                                    className='text-2xl text-gray-500'
                                    icon={faEllipsis}
                              />
                        </div>
                  </div>





                  {/* Text toggle see more and less see with React and Tailwindcss like Facebook post text with a code example?

Below is an example of how to create a "See More/See Less" toggle using React and TailwindCSS.

First, import React, the useState hook, and TailwindCSS in App.js:

import React, { useState } from "react";
import "../tailwind.css";

Then, create a component which will hold our text and toggle:

const TextToggle = () => {
  const [textVisible, setTextVisible] = useState(false);
  const toggleText = () => setTextVisible(!textVisible);

  return (
    <div>
      <div className="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
      {textVisible ? (
        <div className="text-gray-700 text-base">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      ) : null}
      <div className="text-center mt-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleText}
        >
          {textVisible ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default TextToggle;

Finally, render the component in App.js:

function App() {
  return (
    <div className="App">
      <TextToggle />
    </div>
  );
}

export default App; */}
                  {/* post description */}
                  <div className='py-2'>
                        <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam ipsam, temporibus soluta reiciendis, vitae sed, illo tempora voluptate dignissimos nostrum harum dolore labore recusandae. Aliquam corrupti placeat similique doloribus.</p>
                  </div>
            </div>
      );
};

export default PostTopArea;