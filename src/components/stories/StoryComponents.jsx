import React from 'react'
import './stories.scss'

function StoryComponents() {
    const stories = [
        {
            id: 1,
            name: "Aswandh",
            img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            name: "Aswandh",
            img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 3,
            name: "Aswandh",
            img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 4,
            name: "Aswandh",
            img:"https://images.pexels.com/photos/13222469/pexels-photo-13222469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
      
    ];
  return (
<div className='stories'>
         <div className='story'>
                <img src="https://images.pexels.com/photos/13622696/pexels-photo-13622696.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" /> 
                <span>NAZ</span>
                <button>+</button>
            </div>
        {stories.map(story => (
            <div className='story' key={story.id}>
                <img src={story.img} alt="" /> 
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default StoryComponents