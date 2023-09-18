import { faComment, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import LikeStatus from './LikeStatus';

const PostBtmStatusBar = ({ postReacts }) => {
      const [reacts, setReacts] = useState([]);
      const [likes, setLikes] = useState("");
      const [loves, setLoves] = useState("");
      const [dislikes, setDislikes] = useState("");

      useEffect(() => {
            if (postReacts) {
                  const getLikes = postReacts?.reduce((sum, curr) => {
                        let total = 0;
                        if (curr?.react_type?.toLowerCase() === "like") {
                              total++;
                        }
                        return total + sum;
                  }, 0);
                  const getLoves = postReacts?.reduce((sum, curr) => {
                        let total = 0;
                        if (curr?.react_type?.toLowerCase() === "love") {
                              total++;
                        }
                        return total + sum;
                  }, 0);
                  const getDislikes = postReacts?.reduce((sum, curr) => {
                        let total = 0;
                        if (curr?.react_type?.toLowerCase() === "dislike") {
                              total++;
                        }
                        return total + sum;
                  }, 0);
                  setLikes(getLikes);
                  setLoves(getLoves);
                  setDislikes(getDislikes);
                  setReacts(postReacts);
            }
      }, [postReacts]);

      return (
            <div className='w-full flex items-center justify-between p-1'>
                  {/* like status area */}
                  <div className='flex items-center'>
                        {/* <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faThumbsUp}
                              /> */}
                        <LikeStatus
                              likes={likes}
                              loves={loves}
                              dislikes={dislikes}
                        />
                        <span className='text-base font-bold text-gray-600 ml-[2px]'>{reacts?.length}</span>
                  </div>
                  {/* comment status area */}
                  <div className='flex items-center gap-2'>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faComment}
                              />
                              <span className='text-base font-bold text-gray-600 ml-[2px]'>5</span>
                        </div>
                        {/* share status area */}
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faShareFromSquare}
                              />
                              <span className='text-base font-bold text-gray-600 ml-[2px]'>5</span>
                        </div>
                  </div>
            </div>
      );
};

export default PostBtmStatusBar;