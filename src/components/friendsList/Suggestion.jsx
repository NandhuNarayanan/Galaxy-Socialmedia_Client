import React, { useEffect, useState } from 'react'
import FollowButton from '../followComponents/FollowButton'
import { useSelector } from 'react-redux'

function Suggestion({ user }) {
  const loginUser = useSelector((state) => state.auth.newUser)

  const isFollowed = loginUser.following.includes(user._id)



  return (
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
  )
}

export default Suggestion
