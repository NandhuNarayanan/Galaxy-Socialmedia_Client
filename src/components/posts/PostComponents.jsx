import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../post/Post'
import './posts.scss'

function PostComponents() {

    const [posts, setPosts] = useState([])
    const refresh = useSelector((state) => state.refresh);
    console.log(refresh,'refreshhh');



    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/post/getpost`).then((response)=>{
            setPosts(response.data)
        })
        
    },[])


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