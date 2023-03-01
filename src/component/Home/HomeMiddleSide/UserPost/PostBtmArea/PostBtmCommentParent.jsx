import React, { useEffect, useState } from 'react';
import PostBtmCommentChild from './PostBtmCommentChild';

const PostBtmCommentParent = () => {
      const [commentCount, setCommentCount] = useState(1);
      const [userComments, setUserComments] = useState([]);
      useEffect(() => {
            const arr = [
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Abdullah",
                        comment: "Prayojon will be awesome web app. Prayojon will be awesome web app. Prayojon will be awesome web app. Prayojon will be awesome web app. Prayojon will be awesome web app.",
                        reply: [
                              {
                                    _id: 1,
                                    imgUrl: "",
                                    name: "Abdullah Mamun",
                                    comment: "Prayojon will be awesome web app",
                              },
                              {
                                    _id: 2,
                                    imgUrl: "",
                                    name: "Abdur Rahman",
                                    comment: "Prayojon will be awesome web app. Prayojon will be awesome web app. Prayojon will be awesome web app. Prayojon will be awesome web app"
                              },
                              {
                                    _id: 1,
                                    imgUrl: "",
                                    name: "Korim",
                                    comment: "Prayojon will be awesome web app"
                              }
                        ]
                  },
                  {
                        _id: 2,
                        imgUrl: "",
                        name: "Abdur Rahman",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Hakim",
                        comment: "Prayojon will be awesome web app",
                        reply: [
                              {
                                    _id: 1,
                                    imgUrl: "",
                                    name: "Korim",
                                    comment: "Prayojon will be awesome web app"
                              }
                        ]
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Korim",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Abdullah Al Mamun Bin Hakim Ur Rahman Madani Bin Sultan Ahmed",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Rahim",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Hasina",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Jarina",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Rahima",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Bulbuli",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Kulkuli",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Hasan Ullah",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Sakib Al Hasan",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Mushfiqur Rahman",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Tamim Iqbal",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Mashrafi Bin Murtaja",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Mahmudullah Riyadh",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Liton Kumar Dash",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Mustafijur Rahman",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Virat Kholi",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Shchin Tandulkar",
                        comment: "Prayojon will be awesome web app"
                  },
                  {
                        _id: 1,
                        imgUrl: "",
                        name: "Kane Willamson",
                        comment: "Prayojon will be awesome web app"
                  }
            ]
            const commentsSliceLessAndMore = arr.slice(0, commentCount);
            setUserComments(commentsSliceLessAndMore);
      }, [commentCount])
      return (
            <div id="#1" className='flex flex-col gap-2 px-1 py-2'>
                  {/* User comment child component. In this component has comment "Reply Parent" component. */}
                  {
                        userComments.map((comment, i) => (
                              <PostBtmCommentChild
                                    key={i}
                                    reply={comment.reply ? comment.reply : []}
                                    name={comment.name}
                                    comment={comment.comment}
                              />
                        ))
                  }
                  {/* In this part has two button "View more and View less" */}
                  <div className='flex items-center gap-4 w-full'>
                        {
                              userComments.length >= commentCount &&
                              <span
                                    className='underline text-sm text-gray-600 font-bold cursor-pointer hover:text-gray-500'
                                    onClick={() => setCommentCount((prevCount) => prevCount + 5)}
                              >view more 5+</span>
                        }
                        {
                              commentCount !== 1 &&
                              <a href={'#1'}>
                                    <span
                                          className='underline text-sm text-gray-600 font-bold cursor-pointer hover:text-gray-500'
                                          onClick={() => setCommentCount(1)}
                                    >view less</span>
                              </a>
                        }
                  </div>
            </div>
      );
};

export default PostBtmCommentParent;