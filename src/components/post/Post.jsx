import { Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './post.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { MessageCircle2 } from 'tabler-icons-react';
import SendIcon from '@mui/icons-material/Send'
import Comments from '../comments/Comments'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { image } from '@cloudinary/url-gen/qualifiers/source'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { profileVisit } from '../../features/pofileSlice'

function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likedUsers.length)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.newUser)

  const postLiked = (id) => {
    axios
      .patch('http://localhost:3001/post/liked', {
        userId: user._id,
        postId: id,
      })
      .then((response) => {
        if (response.data.liked) {
          setLiked(true)
          setLikeCount(likeCount+1)
        } else if (response.data.unLike) {
          setLiked(false)
          setLikeCount(likeCount-1)
        }
      })
  }
  useEffect(() => {
    {
      post.isLiked ? setLiked(true) : setLiked(false)
    }
  }, [])

  const profileId = () => {

    localStorage.setItem('profileId',post.userId._id)
    navigate(`/profile/${post.userId._id}`)
  }

  //TEMPORARY
  const saved = false
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          {post.userId.profilePicture?<img
            src={post.userId.profilePicture}
            alt=""
          />:<img
          src="https://www.clipartmax.com/png/middle/296-2969961_no-image-user-profile-icon.png"
          alt=""
        />}
            <div className="details">
              <Link
                onClick={profileId}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="name">{post.userId.firstName}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>

          {post.image
            ? post.image.map((obj, index) => {
                return <img src={obj} alt="" />
              })
            : null}
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <FavoriteIcon
                onClick={() => postLiked(post._id)}
                style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => postLiked(post._id)}
                className="heart"
              />
            )}
            {likeCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <MessageCircle2 className="commenticon" />
            Comments
          </div>
          <div className="item">
            <SendIcon style={{ fontSize: '20px' }} />
            Share
          </div>
          <div className="item">
            {saved ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon className="bookmark" />
            )}
          </div>
        </div>
        {commentOpen && (
          <Comments postId={post._id} style={{ fontSize: '30px' }} />
        )}
      </div>
    </div>
  )
}

export default Post
