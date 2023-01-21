import React, { useEffect, useState } from 'react'
import FollowButton from '../followComponents/FollowButton'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const followButtonStyle = {
  backgroundColor: "green",
  color: "white",
  padding: 5,
  borderRadius: "15px",
  width: "80px",
  fontSize: "12PX",
  border: "0px ",
  cursor: "pointer",
}

const followingButtonStyle = {
backgroundColor: "grey",
color: "white",
padding: 5,
borderRadius: "15px",
width: "80px",
fontSize: "12PX",
border: "0px ",
cursor: "pointer",
};

function Suggestion({ user}) {
  const loginUser = useSelector((state) => state.auth.newUser)

  const isFollowed = loginUser.following.includes(user._id)

  const navigate = useNavigate()

  const profileId = () => {
    localStorage.setItem('profileId', post.userId._id)
    navigate(`/profile/${post.userId._id}`)
  }

  const [following, setFollowing] = useState()
  const [followCheck, setFollowCheck ] = useState({})
  const [followCount, setfollowCount] = useState()

  const profile =  localStorage.getItem('profileId')

  const {token} = useSelector(state=>state.auth)
  const userId = loginUser._id

  const follow = (followUserId)=>{
      axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/follow`,{
      followUserId,user
      }).then((response)=>{
        if (response.data.followingUser) {
          setFollowing(true)
          setfollowCount(followCount+1)
        }else {
          setFollowing(false)
          setfollowCount(followCount-1)
        }
      }).catch((error) => console.log(error))
    }

    const userid = loginUser._id
    useEffect(()=>{
      // const token = localStorage.getItem('auth')

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUsers/${userid}`,{headers:{authorization:`bearer ${token}`}}).then((response)=>{
        if(response.data){
          // setFollowCheck(response.data.newUser?.following)
          setfollowCount(response.data.newUser?.following.length)
          const status = response.data.newUser?.following?.includes(profile) 
          setFollowing(status)
        }
        
      })
    },[])



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
      <div className="top" >
      <button style={following ? followingButtonStyle : followButtonStyle  } onClick={() => {follow(followUserId)}}>{following? 'Following'  : 'Follow'    }</button>
    </div>
      </div>
    </div>
    </Link>
  )
}

export default Suggestion
