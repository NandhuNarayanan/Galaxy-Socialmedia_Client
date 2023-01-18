import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../../pages/profile/profile.scss'
import Profile from '../../pages/profile/Profile'

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

function FollowButton({followUserId,isFollowed}) {

  const [following, setFollowing] = useState(isFollowed)
  const [followCheck, setFollowCheck ] = useState({})
  const [followCount, setfollowCount] = useState()

  const profile =  localStorage.getItem('profileId')

  const userId = useSelector(state => state.auth.newUser)
  const {token} = useSelector(state=>state.auth)
  const user = userId._id

  const follow = (followUserId)=>{
      axios.patch('http://localhost:3001/profile/follow',{
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

    const userid = userId._id
    useEffect(()=>{
      // const token = localStorage.getItem('auth')

      axios.get(`http://localhost:3001/getUsers/${userid}`,{headers:{authorization:`bearer ${token}`}}).then((response)=>{
        console.log(response,"ooo")
        if(response.data){
          console.log(response.data.newUser?.following,'99')
          // setFollowCheck(response.data.newUser?.following)
          // console.log(followCheck,90)
          setfollowCount(response.data.newUser?.following.length)
          const status = response.data.newUser?.following?.includes(profile) 
          setFollowing(status)
        }
        
      })
    },[])
    
  // useEffect(()=>{
  
    // followCheck?.includes(profile)? setFollowing(true):setFollowing(false)
    
  // },[])
  return (
    <div className="top" >
      <button style={following ? followingButtonStyle : followButtonStyle } onClick={() => {follow(followUserId)}}>{following? 'Following' :  'Follow'  }</button>
    </div>
  )
}

export default FollowButton