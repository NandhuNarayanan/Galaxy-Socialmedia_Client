import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AllUser from './AllUser';
import './viewFollowers.scss'
import FollowButton from '../followComponents/FollowButton';
import { useSelector } from 'react-redux';
import { XboxX } from 'tabler-icons-react';


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

  


function Viewfollowers({open,close}) {
const user = useSelector(state => state.auth.newUser)
   
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
            <h2>Followers</h2>
            <XboxX onClick={()=> close(false)}/>
            </div>
        <div className="followUser">
      <div className="followUserInfo">
        {user.profilePicture?<img
          src={user.profilePicture}
          alt=""
        />:<img
        src="https://www.clipartmax.com/png/middle/296-2969961_no-image-user-profile-icon.png"
        alt=""
      />}
        <span>{user.firstName}</span>
      </div>
      <div className="followButtons">
      </div>
    </div>
        </Box>
      </Modal>
    </>
  )
}

export default Viewfollowers