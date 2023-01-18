import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import { UilMailbox } from '@iconscout/react-unicons'

const noPost = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 45,
  fontSize: 30,
  flexDirection: 'column',
}

function Userpost({userProfile,userPosts}) {


  return (
    <>
    
    <div className='posts'>
      <div style={noPost}>
    <UilMailbox/>
    {userPosts.length===0?'No posts yet':null}
      </div>
          {userProfile?userPosts.map(post=>(
           <Post post={post} key={post.id}/>
       )):null}
   </div>
   </>
  )
}

export default Userpost