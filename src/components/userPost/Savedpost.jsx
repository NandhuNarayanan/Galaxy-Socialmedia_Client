import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../post/Post'

function Savedpost({userId}) {
    console.log(userId,'uuuuuuuuuuuuserrrrrrr');
    const [savedPosts, setSavedPosts] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/post/getSavedPost/${userId}/`).then((response)=>{
                console.log(response,'Saved Post is Here');
                setSavedPosts(response.data)
            })
      },[])
      console.log(savedPosts,'savedPostssss');
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