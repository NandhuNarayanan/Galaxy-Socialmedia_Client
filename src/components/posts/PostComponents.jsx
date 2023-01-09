import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../post/Post'
import './posts.scss'

function PostComponents() {

    const [posts, setPosts] = useState([])

  const postId = posts._id


    useEffect(()=>{
        axios.get('http://localhost:3001/post/getpost').then((response)=>{
            setPosts(response.data)
        })
        
    },[postId])


  return (
    <>
     <div className='posts'>
           {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div>
    </>
  )
}

export default PostComponents