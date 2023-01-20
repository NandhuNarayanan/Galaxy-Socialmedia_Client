import React, { useEffect, useRef, useState } from 'react'
import './profileEditModal.scss'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CameraPlus } from 'tabler-icons-react'
import zIndex from '@mui/material/styles/zIndex'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  overflowX: 'hidden',
}

const titleStyle = {
  position: 'sticky',
  margin: 'auto',
}

const imagesStyle = {
  width: '100%',
  height: '200px',
  position: 'relative',
}

const coverStyle = {
  width: '100%',
  height: '100%',
}

const profileStyle = {
  width: '120px',
  height: '120px',
  borderRadius: ' 50%',
  objectFit: 'cover',
  position: 'absolute',
  left: 0,
  right: 0,
  margin: 'auto',
  top: '130px',
  backgroundColor: 'transparent',
  filter: 'blur(.6px)',
}
const cameraStyle = {
  width: '30px',
  height: '30px',
  objectFit: 'cover',
  position: 'absolute',
  left: 0,
  right: 0,
  margin: 'auto',
  top: '20px',
  zIndex: 999,
}

const lconbackStyle = {
  height: '70px',
  width: '70px',
  objectFit: 'cover',
  position: 'absolute',
  left: 0,
  right: 0,
  margin: 'auto',
  top: '160px',

  borderRadius: '50%',
}

const contentStyle = {
  backgroundColor: '#fff',
  border: 'none',
  borderBottom: '2px solid #053271',

  padding: '20px 0',
  margin: '7rem 0',
  width: '57rem',
  display: 'flex',
  flexDirection: 'column',
}

function profileEditModal({ open, close }) {
  const [profilePicture, setProfilePicture] = useState(null)

  const [fname, setFname] = useState()
  const [bio, setBio] = useState()
  const [location, setLocation] = useState()
  const [gender, setGender] = useState()
  const [coverPhoto, setCoverPhoto] = useState()
  const [coverFile, setCoverFile] = useState('')

  const profileCoverRef = useRef()

  const CloudinaryRef = useRef()
  const widgetRef = useRef()

  const user = useSelector((state) => state.auth.newUser._id)

  const editInfo = (event) => {
    event.preventDefault()
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/profile/editProfile`, {
        fname,
        bio,
        location,
        gender,
        user,
      })
      .then((response) => {
        setFname(response.data.userInfo.firstName)
        setBio(response.data.userInfo.bio)
        setLocation(response.data.userInfo.location)
        setGender(response.data.userInfo.gender)
      })
  }

  const openWidget = () => {
    widgetRef.current.open()
  }

  useEffect(() => {
    CloudinaryRef.current = window.cloudinary
    widgetRef.current = CloudinaryRef.current.createUploadWidget(
      {
        cloudName: `${process.env.REACT_APP_CLOUDINARY_NAME}`,
        uploadPreset: `${process.env.REACT_APP_CLOUDINARY_CODE}`,
        cropping: true,
        sources: ['local', 'camera'],
        folder: 'user_profile',
        multiple: false, // restrict upload to a single file
        clientAllowedFormats: ['images', 'png', 'webp', 'jpeg'], // restrict uploading to image files only
      },
      function (err, result) {
        if (!err && result && result.event === 'success') {
          const url = result.info.secure_url
          axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/profile/profilePicture`, {
              url,
              user,
            })
            .then((response) => {
              setProfilePicture(response.data.profileUpdate.profilePicture)
            })
        }
      },
    )
  }, [profilePicture])

  const uploadCoverImage = () => {
    const formData = new FormData()
    formData.append('file', storyImageSelected)
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_IMAGE_CODE}`)
  
    axios
      .post(`${process.env.REACT_APP_CLOUDINARY_API_URL}`, 
      formData
      )
      .then((response) => {
        const storyUrl = response.data.secure_url
        return axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/profile/uploadCover`, {
          storyUrl,
          user,
        })
        .then((response) => {
          console.log(response)
        })
      })
    close(false)
  }

  return (
    <div>
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
          <Box sx={style}>
            <form onSubmit={{editInfo,uploadCoverImage}}>
              <div style={titleStyle}>
                <Typography
                  className="title"
                  id="transition-modal-title"
                  variant="h4"
                  component="h2"
                >
                  Edit profile
                  <button type="submit">Save</button>
                </Typography>
              </div>
              <div className="profileEdit">
                <div className="images" style={imagesStyle}>
                  <img
                    src={coverPhoto? coverFile : "https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt=""
                    className="cover"
                    style={coverStyle}
                    onClick={() => profileCoverRef.current.click()}
                  />
                  <input
                    type="file"
                    hidden
                    ref={profileCoverRef}
                    name="cover"
                    onChange={(event) => {
                      setCoverPhoto(event.target.files[0]);
                      setCoverFile(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt=""
                      className="profilePic"
                      style={profileStyle}
                      onClick={openWidget}
                    />
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                      alt=""
                      className="profilePic"
                      style={profileStyle}
                      onClick={openWidget}
                    />
                  )}
                  <div className="lconback" style={lconbackStyle}>
                    <CameraPlus onClick={openWidget} style={cameraStyle} />
                  </div>
                </div>

                <div style={contentStyle}>
                  <input
                    style={{ height: '50px', margin: '1rem' }}
                    name="firstName"
                    type="text"
                    value={fname}
                    placeholder="Name"
                    onChange={(event) => setFname(event.target.value)}
                  />
                  <input
                    style={{ height: '100px', margin: '1rem' }}
                    name="bio"
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                  <input
                    style={{ height: '50px', margin: '1rem' }}
                    name="location"
                    type="text"
                    value={location}
                    placeholder="Location"
                    onChange={(event) => setLocation(event.target.value)}
                  />
                  <input
                    style={{ height: '50px', margin: '1rem' }}
                    name="gender"
                    type="text"
                    value={gender}
                    placeholder="Gender"
                    onChange={(event) => setGender(event.target.value)}
                  />
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default profileEditModal
