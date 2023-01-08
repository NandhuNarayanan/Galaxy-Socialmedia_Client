import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../post/Post'

function Userpost({userProfile,userPosts}) {


  return (
    <>
    
    <div className='posts'>
    {userPosts.length===0?'No posts yet':null}
          {userProfile?userPosts.map(post=>(
           <Post post={post} key={post.id}/>
       )):null}
   </div>
   </>
  )
}

export default Userpost