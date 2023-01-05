import React from 'react'
import './stories.scss'

function Story({story}) {
  return (
    <div>
        <div className='stories'>
         <div className='story'>
                <img src="https://images.pexels.com/photos/13622696/pexels-photo-13622696.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" /> 
                <span>NAZ</span>
                <button>+</button>
            </div>
            <div className='story' key={story.id}>
                <img src={story.img} alt="" /> 
                <span>{story.name}</span>
            </div>
    </div>
    </div>
  )
}

export default Story