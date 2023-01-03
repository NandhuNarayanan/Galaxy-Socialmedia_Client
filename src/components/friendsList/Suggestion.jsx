import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import FollowButton from '../followComponents/FollowButton';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Suggestion({user}) {
  const loginUser = useSelector(state => state.auth.newUser)

  const isFollowed = loginUser.following.includes(user._id)

  console.log(loginUser.following.includes(user._id),'loginUser.following.includes');

  return (
    <>
       
        {user.profilePicture?<img
          src={user.profilePicture}
          alt=""
        />:<img
        src="https://www.clipartmax.com/png/middle/296-2969961_no-image-user-profile-icon.png"
        alt=""
      />}
        <span>{user.firstName}</span>
      <div className="buttons">
        <FollowButton isFollowed={isFollowed}  followUserId={user._id} />
      </div>
    </>
  )
}

export default Suggestion