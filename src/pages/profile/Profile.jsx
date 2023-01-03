import React, { useEffect, useState } from 'react'
import './profile.scss'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Posts from '../../components/posts/Posts'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import ProfileEditModal from '../../components/profileEditModal/ProfileEditModal'
import { useParams } from 'react-router-dom'
import FollowButton from '../../components/followComponents/FollowButton'
import {  setUser } from '../../features/auth/authSlice'

function Profile() {
  const [getProfile, setGetProfile] = useState({})

  // const [following, setFollowing] = useState(false)

  const [profileEdit, setProfileEdit] = useState(false)

  // const [followCheck, setFollowCheck ] = useState({})

  // const [followCount, setfollowCount] = useState()

  // const [userPost, setUserPost] = useState()
  
 const profile =  localStorage.getItem('profileId')
 const {id} = useParams()


 const userPostShow =  useSelector(state => state)
 console.log(userPostShow,'userPostShow');
 
  const userId = useSelector(state => state.auth.newUser)
  const user = userId._id
const dispatch = useDispatch()

  // const follow = ()=>{
  //   axios.patch('http://localhost:3001/profile/follow',{
  //         profile,user
  //   }).then((response)=>{
  //     if (response.data.followingUser) {
  //       setFollowing(true)
  //       setfollowCount(followCount+1)
  //     }else {
  //       setFollowing(false)
  //       setfollowCount(followCount-1)
  //     }
  //   })
  // }





  // const userid = userId._id
  // useEffect(()=>{
  //   axios.get(`http://localhost:3001/getUsers/${userid}`).then((response)=>{
  //     if(response.data){
  //       setFollowCheck(response.data.newUser)
  //     }
      
  //   })
  //   axios.get('http://localhost:3001/profile/userPost').then((response)=>{
  //           setUserPost(response.data)
  //       })
  // },[])

  // console.log(userPost,"userpost");

  // useEffect(()=>{
  //   {followCheck?.following?.includes(profile)? setFollowing(true):setFollowing(false)}
  // },[followCheck])


  const profileGet =async () => {
    await axios.get(`http://localhost:3001/profile/${profile}`).then((response)=>{
      setGetProfile(response.data)
    })
  }
  const UserInfo = ()=>{
     axios.get(`http://localhost:3001/profile/${user}`).then((response)=>{
      console.log(response.data,"OOOOOOOOOOOOOOOOOOOOOO")
    // if(response.data)  dispatch(setUser(response.data))
  })
  }
useEffect(()=>
{UserInfo()
},[])
  
  useEffect(()=>{
profileGet()

},[id])



  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://cdn.statically.io/img/timelinecovers.pro/facebook-cover/thumbs/life-cycle-facebook-cover.jpg"
          alt=""
          className="cover"
        />
        {getProfile.profilePicture?(<img
          src={getProfile.profilePicture}
          alt=""
          className="profilePic"
        />):(<img
          src='https://www.clipartmax.com/png/middle/296-2969961_no-image-user-profile-icon.png'
          alt=""
          className="profilePic"
        />)}
      </div>
      <div className="profileContainer">
        <div className="urInfo">
          <div className="left">
            <span>{getProfile.firstName ? getProfile.firstName : ''}</span>
            <span style={{ fontSize: '13px', fontWeight: '50' }}>
              @{getProfile.lastName}
            </span>
            <span>
              <p>
              {getProfile.bio}
              </p>
            </span>
            <span
              style={{ fontSize: '13px', fontWeight: '50', display: 'flex' }}
            >
              <CalendarMonthIcon />
              {getProfile.createdAt ? getProfile.createdAt : ''}

            </span>
          </div>
          <div className='right'>
            {profile === user ?(<div className="top">
              <button onClick={()=> setProfileEdit(true)}  style={{backgroundColor:'lightgray',color:'black'}}> 
              Edit Profile</button>
              
              <MoreVertIcon style={{fontSize:'25px'}} />
            </div>) :(<div className="top">
              <FollowButton followUserId={getProfile._id} />
              <button style={{backgroundColor:'lightgray',color:'black'}}>
                Message
              </button>
              <MoreVertIcon style={{fontSize:'25px'}} />
            </div>)}
            <div className="bottom">
              <div className="postsCount">
                <span >
                  7 posts
                </span>
              </div>
              <div className="following">
                <span>
                  {getProfile?.following?.length} Following
                </span>
              </div>
              <div className="followers">
                <span>
                  {getProfile?.followers?.length} Followers
                </span>
              </div>
            </div>
          </div>
        </div>
        <Posts />
      {profileEdit && <ProfileEditModal  open={profileEdit} close={setProfileEdit}/>}
      </div>
    </div>
  )
}

export default Profile
