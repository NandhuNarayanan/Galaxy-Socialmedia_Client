import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '29%',
  left: '32%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

const inputStyle = {
  borderRadius: '5px',
  width: 300,
  height: 40
}

export default function BasicModal({open,close}) {

  const [search , setSearch] = useState('')
  const [searchValues, setSearchValues] = useState([])

  const navigate = useNavigate()

  const userId = useSelector((state) => state.auth.newUser)

  const profileId = () => {
    localStorage.setItem('profileId', userId._id)
    navigate(`/profile/${userId._id}`)
  }


  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/searchUser`,{
      search
    }).then((response)=>{
      setSearchValues(response.data)
    })
  },[search])
  

  return (
    <div>
      <Modal
        open={open}
        onClose={()=>close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Search
          </Typography>
          <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
          <input onChange={(event)=> setSearch(event.target.value)} style={inputStyle} placeholder='Search'/>
          {searchValues?searchValues.map((obj, index) => {
                return   (<>
                  <div className="followUser">    
                    <Link onClick={profileId}>
                <div className="followUserInfo">
                <img
                    src={obj?.profilePicture?obj.profilePicture:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                    alt=""
                  />
                  <span>{obj.firstName}</span>
                </div>
                </Link>
              </div> 
              </>)
              }):null}
        
        </Box>
      </Modal>
    </div>
  );
}