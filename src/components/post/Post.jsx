import { Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './post.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { MessageCircle2 } from 'tabler-icons-react'
import SendIcon from '@mui/icons-material/Send'
import Comments from '../comments/Comments'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {format} from 'timeago.js'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UserReport from '../postReportTable/UserReport'

function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likedUsers?.length)
  const [saved, setSaved] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const [reportPost, setReportPost] = useState(false)
  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.newUser)
  const postId = post._id
  const userId = user._id

  const postLiked = (id) => {
    axios
      .patch('http://localhost:3001/post/liked', {
        userId: user._id,
        postId: id,
      })
      .then((response) => {
        if (response.data.liked) {
          setLiked(true)
          setLikeCount(likeCount + 1)
        } else if (response.data.unLike) {
          setLiked(false)
          setLikeCount(likeCount - 1)
        }
      })
  }
  const postSaved = (id) => {
    axios
      .patch('http://localhost:3001/post/savedPost', {
        SavedUserId: user._id,
        savePostId: id,
      })
      .then((response) => {
        console.log(response,'huhuhoooooooooooooooooo')
        if (response.data.savePost) {
          setSaved(true)
        } else if (response.data.unSave) {
          setSaved(false)
        }
      })
      post()
  }

  const postDelete = (id) => {
    axios.patch('http://localhost:3001/post/deletePost',{
          postId:id
    }).then((response)=>{
      console.log(response);
      toast.success(response.data, {
        style: {
          width: '80px',
          height: '80px'
        },
      })
    })
  }
  console.log(post.likedUsers,'junuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuunnnnnnn');

  useEffect(() => {
    {
      {post.likedUsers?.includes(userId)?setLiked(true):setLiked(false)}
      {user.savedPost?.includes(postId)?setSaved(true):setSaved(false)}
    }
  }, [postId])

  const profileId = () => {
    localStorage.setItem('profileId', post.userId._id)
    navigate(`/profile/${post.userId._id}`)
  }



  
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    postDelete(null)
  }


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {post.userId?.profilePicture ? (
              <img src={post.userId?.profilePicture} alt="" />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt=""
              />
            )}
            <div className="details">
              <Link
                onClick={profileId}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="name">{post.userId?.firstName}</span>
              </Link>
              <span className="date">{format(post.createdAt)}</span>
            </div>
          </div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: '20',
                width: '12ch',
              },
            }}
          >
            {post.userId?._id == user?._id ? (
              <>
                <MenuItem onClick={()=>{postDelete(post._id);handleClose(false)}}>Delete</MenuItem>
                <MenuItem onClick={handleClose} >Edit</MenuItem>
              </>
            ) : (
              <MenuItem onClick={()=> {setReportPost(true);handleClose(false)}}>Report</MenuItem>
            )}
          </Menu>
        </div>
        <div className="content">
          <p>{post.caption}</p>

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
            {saved ? (
              <BookmarkIcon
                onClick={() => postSaved(post._id)}
                className="bookmark"
              />
            ) : (
              <BookmarkBorderIcon
                onClick={() => postSaved(post._id)}
                className="bookmark"
              />
            )}
          </div>
        </div>
        {commentOpen && (
          <Comments postId={post._id} style={{ fontSize: '30px' }} />
        )}
          {reportPost && (
          <UserReport open={reportPost} close={setReportPost} postId={post._id} />
        )}
      </div>
    </div>
  )
}

export default Post
