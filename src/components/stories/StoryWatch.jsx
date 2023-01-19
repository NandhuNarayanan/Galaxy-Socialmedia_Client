import React, { useEffect, useState } from 'react'
import './storyWatch.scss'
import Modal from '@mui/material/Modal';
import { HexagonLetterX } from 'tabler-icons-react'
import Box from '@mui/material/Box';
 
const storie = {

  borderRadius: '10px',
  minWidth: '13rem',

      position: 'absolute',
      bottom: '10px',
      left: '10px', 
      color: 'white',
      fontWeight: 400,
      fontSize: '14.5px',  
       
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height:'100vh',
    bgcolor: 'background',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function StoryWatch({ showStory, openStory, closeStory }) {
  const [index, setIndex] = useState(0)

  const mod = (n, m) => {
    let result = n % m

    //return a position value
    return result >= 0 ? result : result + m
  }

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % showStory.getStories.length)
    }, 8000)
  }, [index])

  return (
    <>
    <Modal
    open={openStory}
        onClose={()=> closeStory(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" className="storyView" >
          <Box sx={style}>
      <div onClick={() => closeStory(false)}>
        <HexagonLetterX />
      </div>

      <div className="carousel">
        {showStory?.getStories?.map((item, i) => {
          const indexLeft = mod(index - 1, showStory.getStories.length)
          const indexRight = mod(index + 1, showStory.getStories.length)

          let className = ''
          if (i === index) {
            className = 'card card--active'
          } else if (i === indexRight) {
            className = 'card card--right'
          } else if (i === indexLeft) {
            className = 'card card--left'
          } else {
            className = 'card'
          }

          return (
            <div >
              <div >
              <span style={storie}>{item.userId.firstName}</span>
              <img
                key={item._id}
                src={item.storyImg}
                alt="Story"
                className={className}
              />
              </div>
            </div>
          )
        })}
      </div>
      </Box>
    </Modal>
    </>
  )
}

export default StoryWatch
