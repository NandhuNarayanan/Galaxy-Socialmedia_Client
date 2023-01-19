import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

const style = {
  position: 'absolute',
  top: '53%',
  left: '32%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 700,
  bgcolor: 'background.paper',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
  
}

const inputStyle = {
  borderRadius: '5px',
  width: 300,
  height: 40,
}

export default function BasicModal({ open, close }) {
  const [notification, setNotification] = useState([])

  const userNotification = useSelector(
    (state) => state.auth.newUser.notification,
  )

  const userId = useSelector((state) => state.auth.newUser)

  const profileId = () => {
    localStorage.setItem('profileId', userId._id)
    navigate(`/profile/${userId._id}`)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Notification
          </Typography>
          <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
          <div>
          {userNotification ?.length < 1 ? <h1>No Notifications</h1> : null}
            {userNotification?.map((obj, index) => {
              return (
                <>
                  <div className="followUser">
                    <Link onClick={profileId}>
                      <div className="followUserInfo">
                        <img
                          src={
                            obj?.profilepic
                              ? obj.profilepic
                              : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                          }
                          alt=""
                        />
                        <span>{obj.notificationContent}</span>
                      </div>
                      <div>{format(obj.time)}</div>
                    </Link>
                    <div>
                      {obj.Image
                        ? obj.Image.map((obj, index) => {
                            return <img style={{width:'5rem',height:'6rem',borderRadius:'10%'}} src={obj} alt="" />
                          })
                        : null}
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
