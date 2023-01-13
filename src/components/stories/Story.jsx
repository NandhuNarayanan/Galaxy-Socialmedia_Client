import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Photo } from 'tabler-icons-react'
import { Abc } from 'tabler-icons-react'
import axios from 'axios'
import { SquareArrowRight } from 'tabler-icons-react';
import { useSelector } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
}

const boxcomponent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '40px',
}

const box = {
  height: 250,
  width: 200,
  borderRadius: '10%',
  backgroundColor: 'rgba(198, 195, 195, 0.507)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #000',
  flexDirection: 'column',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 420,
}

const image = {
  height: 550,
}

const shareContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'column'
}
const button = {
  height: 40,
  width: 150,
  backgroundColor: '#555',
  color:'white',
  borderRadius: '5%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border:'none',
  marginLeft: 370,
  cursor: 'pointer',
}

export default function TransitionsModal({ open, close }) {

  const [storyImageSelected, setStoryImageSelected] = useState()
  const [ file , setFile] = useState('')

  const userId = useSelector((state)=> state.auth.newUser._id)

const storyRef = useRef()

const uploadStoryImage = () => {
  const formData = new FormData()
  console.log(storyImageSelected)
  formData.append('file', storyImageSelected)
  formData.append('upload_preset', 'qogu1l1i')

  axios
    .post('https://api.cloudinary.com/v1_1/dnz0safyt/image/upload', 
    formData
    )
    .then((response) => {
      console.log(response)
      const storyUrl = response.data.secure_url
      return axios
      .post('http://localhost:3001/story/uploadStory', {
        storyUrl,
        userId,
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
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h3" component="h2">
              Your story
            </Typography>
            <hr style={{ width: '45%', border: '0.1px solid #ececec' }} />
            <div style={boxcomponent}>
             {file ==='' ? <>
              <div style={box} onClick={() => storyRef.current.click()}>
                <div>
                  <Photo />
                </div>
                <span>Create a Photo Story</span>
              </div>
             
              <input type="file"
                    hidden
                    ref={storyRef}
                    name="cover"
                    onChange={(event) => {
                      setStoryImageSelected(event.target.files[0]);
                      setFile(URL.createObjectURL(event.target.files[0]));
                    }}
                      />
              <div style={box}>
                <div>
                  <Abc />
                </div>
                <span>Create a Text Story</span>
              </div>
              </>
              :
              <div style={shareContainer}>
              <div >
                <img style={image} src={file} alt="" />
              </div>
              <button onClick={uploadStoryImage} style={button}>
                <span>Share Your Story</span>
                <SquareArrowRight/>
              </button>
              </div>
              }
              
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
