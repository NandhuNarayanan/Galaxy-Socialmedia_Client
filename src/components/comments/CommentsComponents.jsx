import { current } from '@reduxjs/toolkit'
import React, { useContext, useEffect, useState } from 'react'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp'
import './comments.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

function CommentComponents({ postId }) {

  const userId = useSelector((state) => state.auth.newUser._id)
  const [comment, setComment] = useState('')
  const [allComments, setAllcomments] = useState({})

  const postComment = () => {
    if (comment.trim() === '') {
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/post/comment`, {
          postId,
          userId,
          content: comment,
        })
        .then((response) => {
          setAllcomments(response.data.comments)
          setComment('')
        })
    }
  }

  const deleteComment = (postCommentId, commentId) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/post/deleteComment`, {
        postCommentId,
        commentId,
      })
      .then((response) => {
        console.log(response)
      })
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/post/getComments/${postId}`)
      .then((response) => {
        setAllcomments(response.data)
      })
  }, [comment])

  return (
    <>
      <div className="comments">
        <div className="write">
          {
            <img
              src={
                allComments?.userId
                  ? allComments?.userId?.profilePicture
                  : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
              }
              alt=""
            />
          }
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="write a comment"
          />
          <button onClick={postComment}>Send</button>
        </div>
        <div className="noComments">
          {allComments?.comments?.length === 0 ? 'No Comments yet' : null}
        </div>
        {allComments?.comments?.map((comment) => (
          <div className="comment">
            {comment?.userId ? (
              <img src={comment?.userId?.profilePicture} alt="" />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt=""
              />
            )}
            <div className="info">
              <span>{comment?.userId?.firstName}</span>
              <p>{comment?.content}</p>
              <span className="time">{format(comment?.date)}</span>
              {comment?.userId?._id === userId ? (
                <div>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      deleteComment(allComments?._id, comment?._id)
                    }
                  >
                    Delete
                  </span>
                </div>
              ) : null}
            </div>
            <div className="reply">
              <span className="reply">reply </span>
            </div>
            <span className="commentLike">
              <FavoriteBorderSharpIcon />
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default CommentComponents
