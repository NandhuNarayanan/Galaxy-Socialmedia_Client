import React, { useEffect, useRef, useState } from 'react'
// import Modal from 'react-modal'
import './postModel.scss'
import ImageSharpIcon from '@mui/icons-material/ImageSharp'
import axios from 'axios'
import { useSelector } from 'react-redux'

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
  display: 'flex,',
  border: 'none',
}

const uploadButton = {
  backgroundColor: 'green',
  color: 'white',
  width: '80px',
  cursor: 'pointer',
  fontSize: '15px',
  border: 'none',
  borderRadius: '20px',
}
const input = {
  borderRadius: '5px',
  width: '40vh',
  height: '8vh',
}
const icons = {
  fontSize:'14px',
}

function Modals({ open, close }) {
  const [imageSelected, setImageSelected] = useState()
  const [caption, setCaption] = useState()

  const userId = useSelector((state) => state.auth.newUser)

  const CloudinaryRef = useRef()
  const widgetRef = useRef()

  const openWidget = () => {
    widgetRef.current.open()
  }
  const uploadImage = () => {
    const formData = new FormData()
    console.log(imageSelected)
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'zwmavdgu')

    axios
      .post('https://api.cloudinary.com/v1_1/dnz0safyt/image/upload', formData)
      .then((response) => {
        console.log(response)
        const url = response.data.secure_url
        return axios
          .post('http://localhost:3001/post/uploadpost', {
            url,
            userId,
            caption,
          })
          .then((response) => {
            console.log(response)
          })
      })
    close(false)
  }

  useEffect(() => {
    CloudinaryRef.current = window.cloudinary
    widgetRef.current = CloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dnz0safyt',
        uploadPreset: 'zwmavdgu',
        multiple: false, // restrict upload to a single file
        clientAllowedFormats: ['images', 'png', 'webp', 'jpeg'], // restrict uploading to image files only
      },
      function (err, result) {
        if (!err && result && result.event === 'success') {
          setImageSelected(result.info.secure_url)
        }
      },
    )
  }, [])

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => close(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="box" sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <h3>Create new post</h3>
            </Typography>
            <input
              className="input"
              style={input}
              type="text"
              placeholder="Write a caption..."
              onChange={(event) => setCaption(event.target.value)}
            />
            <div style={icons} onClick={openWidget} className="icons">
              <Fab color="primary" aria-label="add">
                <ImageSharpIcon  />
              </Fab>
                <span>Select Image</span>
            </div>
            <img
              style={{ height: '300px', objectFit: 'cover' }}
              src={imageSelected}
              alt=""
            />
            <div>
              <button style={uploadButton} onClick={uploadImage}>
                Upload
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Modals
