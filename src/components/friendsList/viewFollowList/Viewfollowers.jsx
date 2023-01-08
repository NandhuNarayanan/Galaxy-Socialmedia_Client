import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './viewFollowers.scss'
import { useSelector } from 'react-redux';
import { XboxX } from 'tabler-icons-react';
import FollowButton from '../../followComponents/FollowButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  


function Viewfollowers({open,close,Viewfollowers,Viewfollowing, userFollowers}) {
  console.log(Viewfollowers,'userFollowers');

const [userList , setUserList] = useState([])
const [userFollowingList , setUserFollowingList] = useState([])
const id = useSelector(state => state.auth.newUser._id)
const profileId =  localStorage.getItem('profileId')

useEffect(()=>{
    axios.get(`http://localhost:3001/profile/userList/${profileId}`).then((response)=>{
        console.log(response,'userlist')
        setUserList(response.data.followersList)
        setUserFollowingList(response.data.followingList)

    }).catch((e)=>console.log(e,"o"))
},[])
   
console.log(userList,"userList");
  return (
    <>
      <Modal
        open={open}
        onClose={() => close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='followHeader'>
          <h2>{Viewfollowers ? "Followers" : 'Following'}</h2>
            <XboxX onClick={()=> close(false)}/>
            </div>
            {Viewfollowers ?userList?.length < 1 ? <h1>No Followers</h1> : null : null}
            {Viewfollowing ?userFollowingList?.length < 1 ? <h1>No Following</h1> : null : null}

        { Viewfollowers ? userList?.map((userFollowing)=>(
          <>
        <div className="followUser">
      <div className="followUserInfo">
      <img
          src={userFollowing?.profilePicture?userFollowing.profilePicture:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
          alt=""
        />
        <span>{userFollowing.firstName}</span>
      </div>
      <div className="followButtons">
       <FollowButton/>
      </div>
    </div> 
    </>
    )) :


    userFollowingList?.map((userFollowing)=>(
      <>
       
    <div className="followUser">
  <div className="followUserInfo">
  <img
          src={userFollowing?.profilePicture?userFollowing.profilePicture:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
          alt=""
        />
    <span>{userFollowing?.firstName}</span>
  </div>
  <div className="followButtons">
   <FollowButton/>
  </div>
</div> 
</>
))

     }


        </Box>
      </Modal>
    </>
  )
}

export default Viewfollowers