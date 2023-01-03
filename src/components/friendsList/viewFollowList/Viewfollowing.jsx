import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AllUser from '../AllUser';
import './viewFollowers.scss'
import FollowButton from '../../followComponents/FollowButton';
import { useSelector } from 'react-redux';
import { XboxX } from 'tabler-icons-react';

function Viewfollowing() {
  return (
    <div>
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
    </div>
  )
}

export default Viewfollowing