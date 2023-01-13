import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './stories.scss'

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

const imageShow = {
    height:50
}

export default function BasicModal({openStory, closeStory,showStory}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={openStory}
        onClose={()=>closeStory(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {showStory?.getStories?.map(story => (
            <div onClick={()=> setViewStory(true)} className='story' key={story.id}>
                <img style={imageShow} src={story.storyImg} alt="" /> 
                <span>{story.userId.firstName} {story.userId.lastName}</span>
            </div>
        ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}