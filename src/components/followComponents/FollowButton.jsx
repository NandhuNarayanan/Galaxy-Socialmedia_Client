import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../../pages/profile/profile.scss'
import Profile from '../../pages/profile/Profile'

function FollowButton({followUserId,isFollowed}) {

  const [following, setFollowing] = useState(isFollowed)
  const [followCheck, setFollowCheck ] = useState({})
  const [userPost, setUserPost] = useState()
  const [followCount, setfollowCount] = useState()

  const profile =  localStorage.getItem('profileId')

  const userId = useSelector(state => state.auth.newUser)
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
      axios.get(`http://localhost:3001/getUsers/${userid}`).then((response)=>{
        if(response.data){
          setFollowCheck(response.data.newUser)
        }
        
      })
    },[])
    
  useEffect(()=>{
    {followCheck?.following?.includes(profile)? setFollowing(true):setFollowing(false)}
    
  },[followCheck])
  return (
    <div className="top" >
     {/* {following?(<button className='followingButton' onClick={follow} style={{backgroundColor:'gray'}}>Following</button>): (<button onClick={follow}>Follow</button>)} */}
      <button className='followingButton' onClick={() => {follow(followUserId)}}>{following ? 'Following' : 'Follow' }</button>
    </div>
  )
}

export default FollowButton