import { faClose, faEllipsis, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';
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

const PostTopArea = ({ postContent = "", postAudience, createdAt, name, photo, uid }) => {
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
    <div className='w-full px-4'>
      {/* post header */}
      <div className='w-full flex items-center justify-between'>
        <div className='flex gap-3'>
          <Avatar
            alt="Remy Sharp"
            src={photo}
            sx={{ width: 40, height: 40 }}
          />
          <div className='flex flex-col'>
            <Link href={`/profile/${uid}`}>
              <h1 className='text-base text-gray-800 font-semibold'>{name}</h1>
            </Link>
            <div><p className='text-xs font-semibold text-gray-500'>{moment(createdAt).fromNow()}</p></div>
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
          </div>
        </CustomPopper>
      </div>


      {/* post description */}
      <div className='py-2'>
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