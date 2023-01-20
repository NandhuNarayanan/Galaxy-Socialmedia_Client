import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './stories.scss'
import Story from './Story'
import StoryWatch from './StoryWatch'

function StoryComponents() {

    const [openStory, setOpenStory] = useState(false);
    const [viewStory, setViewStory] = useState(false)

    const [ showStory , setShowStory] = useState();

    const user = useSelector((state)=> state.auth.newUser);


    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/story/getStory`).then((response)=>{
            console.log(response,'qqqqqqqqqqrrrrrrrqqqqqqqqqq');
            setShowStory(response.data)
        })
    },[])


  return (
<div className='stories'>
         <div className='story'>
         <img
                          src={
                            user?.profilePicture
                              ? user.profilePicture
                              : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                          }
                          alt=""
                        /> 
                <span>Create story</span>
                <button onClick={()=> setOpenStory(true)}>+</button>
            </div>
        {showStory?.getStories?.map(story => (
            <div onClick={()=> setViewStory(true)} className='story' key={story.id}>
                <img src={story.storyImg} alt="" /> 
                <span>{story.userId.firstName} {story.userId.lastName}</span>
            </div>
        ))}
        {openStory && < Story open={openStory} close={setOpenStory} />}   
        <StoryWatch showStory={showStory} openStory={viewStory} closeStory={setViewStory} />
         </div>
  )
}

export default StoryComponents