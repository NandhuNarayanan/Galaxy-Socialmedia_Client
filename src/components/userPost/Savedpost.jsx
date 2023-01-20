import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../post/Post'

function Savedpost({userId}) {
    const [savedPosts, setSavedPosts] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/post/getSavedPost/${userId}/`).then((response)=>{
                setSavedPosts(response.data)
            })
      },[])
  return (
    <>
    <div className='posts'>
    {savedPosts?.savedPost?.length===0?'No Saved posts yet':null}
          {savedPosts?.savedPost?.map(post=>(
           <Post post={post} key={post.id}/>
       ))}
   </div>
    </>
  )
}

export default Savedpost