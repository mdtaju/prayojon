import { faClose, faEllipsis, faShop, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dialog, IconButton } from '@mui/material';
import moment from 'moment/moment';
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAddNotificationMutation } from "../../../../../features/notification/notificationApi";
import { useGetUserQuery } from '../../../../../features/profile/profileApi';
import { useAddFollowerMutation, useGetFollowerQuery, useGetFollowingQuery, useUnfollowMutation } from '../../../../../features/userPost/userPostApi';
import useWindowSize from '../../../../../hook/useWindowSize';
const CustomPopper = dynamic(() => import('../../../../common/CustomPopper'), {
  ssr: false,
});

const PostTopArea = ({ postContent = "", postAudience, createdAt, name, photo, uid, isEPost }) => {
  const [textExpand, setTextExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [addFollower, { data }] = useAddFollowerMutation();
  const { data: session } = useSession();
  const { data: getAuthUser } = useGetUserQuery(session?.user?.email);
  const { data: getFollower } = useGetFollowerQuery(uid);
  const [warnMss, setWarnMss] = useState("");
  const [diaOpen, setDiaOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const windowSize = useWindowSize();
  const { data: getFollowing } = useGetFollowingQuery(session?.user?.email);
  const [unfollow, { data: getUnfollow }] = useUnfollowMutation();
  const [isFollow, setIsFollow] = useState(false);
  const [addNotification] = useAddNotificationMutation();
  const d = new Date();

  // check is follow the user
  useEffect(() => {
    if (getFollowing) {
      const getFollowingUser = getFollowing.find((u) => u.user_id == uid);
      if (getFollowingUser) {
        setIsFollow(true)
      }
    }
  }, [getFollowing, uid]);

  // check is follow the user after unfollow action dispatch
  useEffect(() => {
    if (getUnfollow) {
      setIsFollow(false)
    }
  }, [getUnfollow]);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // post text expand function
  useEffect(() => {
    if (postContent.length > 200) {
      setTextExpand(false)
    } else {
      setTextExpand(true)
    }
  }, [postContent]);



  const handleClickOpen = () => {
    if (!session) {
      setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/login">login</Link> to follow others</p>)
    }
    if (session && !getAuthUser[0]?.name) {
      setWarnMss(<p className='text-lg font-bold'>Please <Link className='text-primary underline' href="/profile/edit">update</Link> your profile to follow others</p>)
    }
    if (!session || !getAuthUser[0]?.name) {
      setSnackOpen(true)
    }
  };

  // handle addFollower
  const handleFollower = () => {
    if (session && getAuthUser[0]?.name) {
      addFollower({
        user_id: uid,
        followerId: session?.user?.email
      })
      addNotification({
        sender_id: session?.user?.email,
        receiver_id: uid,
        message: "following you",
        link: `/profile/${session?.user?.email}`,
        date: d.toUTCString()
      })
    } else {
      handleClickOpen()
    }
  }

  // handle unfollow 
  const handleUnFollow = () => {
    if (session && getAuthUser[0]?.name) {
      unfollow({
        user_id: uid,
        follower_id: session?.user?.email?.toString()
      })
      addNotification({
        sender_id: session?.user?.email,
        receiver_id: uid,
        message: "following you",
        link: `/profile/${session?.user?.email}`,
        date: d.toUTCString()
      })
    } else {
      handleClickOpen()
    }
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        className='float-right bg-orange-500 w-[35px] h-[35px] hover:bg-orange-500'
        onClick={() => setSnackOpen(false)}
      >
        <FontAwesomeIcon
          className='text-white'
          icon={faClose}
        />
      </IconButton>
    </>
  );

  return (
    // in this component. there are two part here. one is header and another is post description 
    <div className='w-full'>
      {/* post header */}
      <div className='w-full px-4 py-3 flex items-center justify-between border-b border-gray-300'>
        <div className={`flex gap-3 ${isEPost ? "items-center" : ""}`}>
          <Avatar
            alt="Remy Sharp"
            src={photo}
            sx={{ width: 40, height: 40 }}
            variant='rounded'
          />
          <div className={`flex flex-col`}>
            <Link href={`/profile/${uid}`}>
              <h1 className='text-base text-gray-800 font-semibold'>{name}</h1>
            </Link>
            {
              !isEPost &&
              <div className='flex items-center gap-3'>
                <p className='text-xs font-semibold text-gray-500'>{moment(createdAt).fromNow()}</p>
                <div className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_405_872)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C7.19347 1 8.33807 1.47411 9.18198 2.31802C10.0259 3.16193 10.5 4.30653 10.5 5.5C10.5 7.037 9.662 8.295 8.779 9.1975C8.33776 9.64345 7.85639 10.0478 7.341 10.4055L7.128 10.5505L7.028 10.617L6.8395 10.737L6.6715 10.8395L6.4635 10.9605C6.32225 11.0409 6.16252 11.0832 6 11.0832C5.83748 11.0832 5.67775 11.0409 5.5365 10.9605L5.3285 10.8395L5.0685 10.6795L4.9725 10.617L4.7675 10.4805C4.21149 10.1042 3.69353 9.67446 3.221 9.1975C2.338 8.294 1.5 7.037 1.5 5.5C1.5 4.30653 1.97411 3.16193 2.81802 2.31802C3.66193 1.47411 4.80653 1 6 1ZM6 2C5.07174 2 4.1815 2.36875 3.52513 3.02513C2.86875 3.6815 2.5 4.57174 2.5 5.5C2.5 6.661 3.136 7.68 3.9355 8.498C4.27931 8.84595 4.65087 9.16534 5.0465 9.453L5.2755 9.616C5.3495 9.6675 5.4205 9.7155 5.489 9.76L5.684 9.885L5.8555 9.9895L6 10.074L6.2275 9.9395L6.411 9.8245C6.5085 9.7625 6.6135 9.693 6.7245 9.616L6.9535 9.453C7.34913 9.16534 7.72069 8.84595 8.0645 8.498C8.864 7.6805 9.5 6.661 9.5 5.5C9.5 4.57174 9.13125 3.6815 8.47487 3.02513C7.8185 2.36875 6.92826 2 6 2ZM6 3.5C6.53043 3.5 7.03914 3.71071 7.41421 4.08579C7.78929 4.46086 8 4.96957 8 5.5C8 6.03043 7.78929 6.53914 7.41421 6.91421C7.03914 7.28929 6.53043 7.5 6 7.5C5.46957 7.5 4.96086 7.28929 4.58579 6.91421C4.21071 6.53914 4 6.03043 4 5.5C4 4.96957 4.21071 4.46086 4.58579 4.08579C4.96086 3.71071 5.46957 3.5 6 3.5ZM6 4.5C5.73478 4.5 5.48043 4.60536 5.29289 4.79289C5.10536 4.98043 5 5.23478 5 5.5C5 5.76522 5.10536 6.01957 5.29289 6.20711C5.48043 6.39464 5.73478 6.5 6 6.5C6.26522 6.5 6.51957 6.39464 6.70711 6.20711C6.89464 6.01957 7 5.76522 7 5.5C7 5.23478 6.89464 4.98043 6.70711 4.79289C6.51957 4.60536 6.26522 4.5 6 4.5Z" fill="#8190A3" />
                  </g>
                  <defs>
                    <clipPath id="clip0_405_872">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                  <span className='text-xs font-semibold text-gray-500'>Dhaka</span>
                </div>
              </div>
            }
          </div>
        </div>
        {/* tree dot small menu */}
        <div onClick={handleClick('bottom')} className='p-1 cursor-pointer w-[30px] h-[30px] hover:bg-gray-200 rounded-full grid place-items-center active:scale-95 duration-150'>
          <FontAwesomeIcon
            className='text-xl text-gray-500'
            icon={faEllipsis}
          />
        </div>
        {/* popper */}
        <CustomPopper
          setOpenPopper={setOpen}
          anchorEl={anchorEl}
          open={open}
          placement={placement}
        >
          <div className=''>
            {
              data || isFollow ?
                <div onClick={handleUnFollow} className='flex items-center gap-3 text-sm font-semibold text-gray-800 cursor-pointer px-3 py-2 hover:bg-gray-200'>
                  <FontAwesomeIcon
                    icon={faUserMinus}
                    className='text-orange-500'
                  />
                  <span>Unfollow</span>
                </div> :
                <div onClick={handleFollower} className='flex items-center gap-3 text-sm font-semibold text-gray-800 cursor-pointer px-3 py-2 hover:bg-gray-200'>
                  <FontAwesomeIcon
                    icon={faUserCheck}
                    className='text-orange-500'
                  />
                  <span>Follow</span>
                </div>
            }
            {
              isEPost &&
              <Link href={`/profile/${uid}?tab=lists`}>
                <div className='flex items-center gap-3 text-sm font-semibold text-gray-800 cursor-pointer px-3 py-2 hover:bg-gray-200'>
                  <FontAwesomeIcon
                    icon={faShop}
                    className='text-orange-500'
                  />
                  <span>View Shop</span>
                </div>
              </Link>
            }
          </div>
        </CustomPopper>
      </div>


      {/* post description */}

      {
        !isEPost &&
        <div className='p-4'>
          <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-800'>
            {
              !textExpand ?
                <>
                  {postContent.slice(0, 220)}
                  {"... "}
                  <span
                    onClick={() => setTextExpand(true)}
                    className='font-semibold cursor-pointer hover:underline'>{"See more"}</span>
                </> :
                <>
                  {postContent}
                </>
            }
          </p>
        </div>
      }

      {/* warning massage for login */}
      <Dialog
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        fullScreen
        PaperProps={windowSize.width > 768 ?
          {
            style: {
              borderRadius: '10px',
              width: '500px',
              height: "400px"
            }
          } :
          {}
        }
      >
        <div className='p-4 bg-orange-200 w-full h-full'>
          {action}
          <div className='w-full h-[80%] grid place-items-center'>
            {warnMss}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PostTopArea