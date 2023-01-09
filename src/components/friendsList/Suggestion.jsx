import React, { useEffect, useState } from 'react'
import FollowButton from '../followComponents/FollowButton'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Suggestion({ user }) {
  const loginUser = useSelector((state) => state.auth.newUser)

  const isFollowed = loginUser.following.includes(user._id)

  const navigate = useNavigate()

  const profileId = () => {
    localStorage.setItem('profileId', post.userId._id)
    navigate(`/profile/${post.userId._id}`)
  }



  return (
    <Link onClick={profileId}>
    <div className='singleUser'>
      {user.profilePicture ? (
        <img src={user.profilePicture} alt="" />
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          alt=""
        />
      )}
      <span>{user.firstName}</span>
      <div className="buttons">
        <FollowButton isFollowed={isFollowed} followUserId={user._id} />
      </div>
    </div>
    </Link>
  )
}

export default Suggestion
