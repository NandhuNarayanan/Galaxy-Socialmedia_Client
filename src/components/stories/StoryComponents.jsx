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


    // const stories = [
    //     {
    //         id: 1,
    //         name: "Aswandh",
    //         img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 2,
    //         name: "Aswandh",
    //         img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 3,
    //         name: "Aswandh",
    //         img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 4,
    //         name: "Aswandh",
    //         img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
      
    // ];

    useEffect(()=>{
        axios.get('http://localhost:3001/story/getStory').then((response)=>{
            console.log(response);
            setShowStory(response.data)
        })
    },[])

    console.log(viewStory,'asdjadkjweuhdjsancsdh;vealiul');

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