import React, { useEffect, useState } from 'react'
import './profile.scss'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Posts from '../../components/posts/Posts'
import { useSelector } from 'react-redux';
import axios from 'axios'
import ProfileEditModal from '../../components/profileEditModal/ProfileEditModal'
import { useNavigate, useParams } from 'react-router-dom'
import FollowButton from '../../components/followComponents/FollowButton'
import {  setUser } from '../../features/auth/authSlice'
import Viewfollowers from '../../components/friendsList/viewFollowList/Viewfollowers'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Userpost from '../../components/userPost/Userpost'
import Savedpost from '../../components/userPost/Savedpost'

function Profile() {
  const [getProfile, setGetProfile] = useState({})

  const [followingList, setFollowingList] = useState(false)
  const [followersList, setFollowersList] = useState(false)

  const [profileEdit, setProfileEdit] = useState(false)

  const [value, setValue] = useState(0);
  const [userPosts, setUserPosts] = useState([])

  const [tabChange, setTabChange] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  const navigate = useNavigate()

 const profile =  localStorage.getItem('profileId')
 const {id} = useParams()


 const userPostShow =  useSelector(state => state)
 
  const userId = useSelector(state => state.auth.newUser)
  const user = userId._id;



  const profileGet =async () => {
    await axios.get(`http://localhost:3001/profile/${profile}`).then((response)=>{
      setGetProfile(response.data)
    })
  }

  const createChatRoom = async () => {
    try {
   const {data}  = await axios.post('http://localhost:3001/chat',{
      senderId:user,
      receiverId:id
    })
    console.log(data);
    navigate('/chat')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    axios.get(`http://localhost:3001/post/getUserPost/${id}`).then((response)=>{
            console.log(response,'userPost is Here');
            setUserPosts(response.data)
        })
  },[id])
 
  
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
          src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
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
              <button onClick={createChatRoom} style={{backgroundColor:'lightgray',color:'black'}}>
                Message
              </button>
              <MoreVertIcon style={{fontSize:'25px'}} />
            </div>)}
            <div className="bottom">
              <div className="postsCount">
                <span >
                 {userPosts?.length} posts
                </span>
              </div>
              <div className="following">
                <span onClick={()=> setFollowingList(true)} >
                  {getProfile?.following?.length} Following
                </span>
              </div>
              <div className="followers">
                <span onClick={()=> setFollowersList(true)}>
                  {getProfile?.followers?.length} Followers
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
        <Tabs value={value} onChange={handleChange} centered>
        <Tab onClick={()=> setTabChange(1)} label="POSTS" />
        {userId._id===profile?<Tab onClick={()=> setTabChange(2)} label="SAVED" />:null}
      </Tabs>
        </div>
        {tabChange===1?<Userpost userProfile={true} userPosts={userPosts}/>:null}
        {tabChange===2?<Savedpost userId={id}/>:null}
      {profileEdit && <ProfileEditModal  open={profileEdit} close={setProfileEdit}/>}
      {followersList && <Viewfollowers  open={followersList} close={setFollowersList} Viewfollowers={true} />}
      {followingList && <Viewfollowers  open={followingList} close={setFollowingList} Viewfollowing={true}/>}
      
      </div>
    </div>
  )
}

export default Profile
