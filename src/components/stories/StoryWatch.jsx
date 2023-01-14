import React, { useEffect, useState } from 'react'
import './storyWatch.scss'
import Modal from 'react-modal'
import { HexagonLetterX } from 'tabler-icons-react';

function StoryWatch({showStory , openStory, closeStory}) {
   const [index, setIndex] = useState(0);


   const mod = (n,m) =>{
    let result = n % m;

    //return a position value
    return result >= 0 ? result : result + m;
   };   

   useEffect(()=>{
    setTimeout(()=> {
      setIndex((index + 1) % showStory.getStories.length);
    },3000);
   },[index]);

  return (
    <Modal className='storyView' isOpen={openStory}>
      <div style={{height:'100px'}} onClick={()=> closeStory(false)} >
        <HexagonLetterX/>
      </div>
    
      <div className="carousel">
      {showStory?.getStories?.map((item, i)=>{
        const indexLeft = mod(index - 1, showStory.getStories.length);
        const indexRight = mod(index + 1, showStory.getStories.length);

        let className = "";
        if (i === index) {
          className = "card card--active";
        }else if (i === indexRight){
          className = "card card--right";
        }else if (i === indexLeft){
          className = "card card--left";
        }else{
          className = "card";
        }

        return( <img key={item._id} src={item.storyImg} alt="Story" className={className} /> )
      })}

      </div>
    </Modal>
  )
}

export default StoryWatch