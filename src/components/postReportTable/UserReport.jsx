import  React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

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

export default function UserReport({open,close,postId}) {
    console.log(postId,'possrrrr');
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');
  
    const handleRadioChange = (event) => {
      setValue(event.target.value);
      setHelperText(' ');
      setError(false);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
        axios.post('http://localhost:3001/post/userReport',{
            value,
            postId
        }).then((response)=>{
            console.log(response);
        })
    };


  return (
    <div>
      <Modal
        open={open}
        onClose={()=> close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel id="demo-error-radios">Why are you reporting this post?</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="report"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="It's spam" control={<Radio />} label="It's spam." />
          <FormControlLabel value="Nudity or sexual activity" control={<Radio />} label="Nudity or sexual activity." />
          <FormControlLabel value="Violence or dangerous organisations" control={<Radio />} label="Violence or dangerous organisations." />
          <FormControlLabel value="Intellectual property violation" control={<Radio />} label="Intellectual property violation." />
          <FormControlLabel value="Scam or fraud" control={<Radio />} label="Scam or fraud." />
          <FormControlLabel value="False information" control={<Radio />} label="False information." />
          <FormControlLabel value="I just don't like it" control={<Radio />} label="I just don't like it." />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Submit
        </Button>
        <Button onClick={()=> close(false)} sx={{ mt: 1, mr: 1 ,color:'red'}} type="close" variant="outlined">
        Close
        </Button>
      </FormControl>
    </form>
        </Box>
      </Modal>
    </div>
  );
}