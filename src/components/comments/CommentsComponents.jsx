import { current } from '@reduxjs/toolkit'
import React, { useContext, useEffect, useState } from 'react'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import './comments.scss'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {format} from 'timeago.js'

function CommentComponents({postId}) {
   console.log(postId,'prop')
    // const comments = [
    //     {
    //         id:1,
    //         desc:"With decades of maintenance of way expertise and experience, no one knows the rail like Loram. Today, with our Loram Technologies business group, we’re leveraging our accumulated data",
    //         name:"Aswandh",
    //         userId:1,
    //         profilePic:"https://images.pexels.com/photos/13622696/pexels-photo-13622696.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    //     },
    //     {
    //         id:2,
    //         desc:"With decades of maintenance of way expertise and experience, no one knows the rail like Loram. Today, with our Loram Technologies business group, we’re leveraging our accumulated data",
    //         name:"Aswandh",
    //         userId:2,
    //         profilePic:"https://images.pexels.com/photos/13622696/pexels-photo-13622696.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    //     },
    //     {
    //         id:1,
    //         desc:"With decades of maintenance of way expertise and experience, no one knows the rail like Loram. Today, with our Loram Technologies business group, we’re leveraging our accumulated data",
    //         name:"Aswandh",
    //         userId:3,
    //         profilePic:"https://images.pexels.com/photos/13622696/pexels-photo-13622696.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    //     },
    // ]
 const userId = useSelector(state => state.auth.newUser._id)
 console.log(userId);
    const [comment, setComment] = useState('')
    const [allComments,setAllcomments] = useState([])

    const postComment = () => {
        console.log(comment,'comments');
        axios.post('http://localhost:3001/post/comment',{
            postId,userId,content:comment
        }).then((response)=>{
            console.log(response)
            setAllcomments(response.data.comments)
            setComment('')
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/post/getComments/${postId}`).then((response)=>{
            setAllcomments(response.data.comments)
        })
    },[])

  return (
    <>
     <div className='comments'>
        <div className='write'>
        {comment.userId ?<img src={comment.userId.profilePicture} alt=''/>:<img src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' alt=''/>}
        <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} placeholder='write a comment' />
        <button onClick={postComment} >Send</button>
        </div>
        {allComments?.map((comment)=>(
            <div className='comment'>
                {comment.userId ?<img src={comment.userId.profilePicture} alt=''/>:<img src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' alt=''/>}
                <div className='info'>
                <span>{comment.userId.firstName}</span>
                <p>{comment.content}</p>
                <span className='time'>
                   {format(comment.date)}
                </span>
                </div>
                <div className="reply">

                    <span className='reply'>reply </span>
                </div>
                <span className='commentLike'>
                    <FavoriteBorderSharpIcon/>
                </span>
            </div>
        ))}
    </div>
    </>
  )
}

export default CommentComponents