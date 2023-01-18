import React, { useContext, useEffect, useState } from 'react'
import './leftBar.scss'
import HomeIcon from '@mui/icons-material/Home'
import Brightness2Icon from '@mui/icons-material/Brightness2'
import ExploreIcon from '@mui/icons-material/Explore'
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchIcon from '@mui/icons-material/Search'
import { BrandMessenger } from 'tabler-icons-react'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext'
import Model from '../postModal/PostModals'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../assets/image/logo_for_galaxy1.png'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { logOut } from '../../features/auth/authSlice'
import Search from '../search/Search'
import Notification from '../notification/Notification'
import axios from 'axios'

function LeftBar() {

  const location = useLocation()
  const user = useSelector((state) => state.auth.newUser)
  const local = localStorage.getItem('auth')
  const {token} = useSelector(state=>state.auth)
  const userid = user._id

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [searchModal, setSearchModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)

  const { toggle, darkMode } = useContext(DarkModeContext)

 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.get(`http://localhost:3001/logout/${userid}`,{
      headers:{authorization: token}
    })
    dispatch(logOut())
    navigate('/login')
  }

 

  return (
    <>
      <div className="leftBar">
        <div className="container">
          <div className="menu">
            <div className="item">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="logo">
                  <img className="logoImg" src={Logo} alt="" />
                  Galaxy
                </span>
              </Link>
            </div>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <div className="item active">
                <HomeIcon style={{ fontSize: '30px' }} />
                <span>Home</span>
              </div>
            </Link>
            <div onClick={() => setSearchModal(true) } className="item">
              <SearchIcon style={{ fontSize: '30px' }} />
              <span>Search</span>
            </div>
            <div className="item">
              {darkMode ? (
                <Brightness2Icon
                  onClick={toggle}
                  style={{ fontSize: '30px' }}
                />
              ) : (
                <LightModeIcon onClick={toggle} style={{ fontSize: '30px' }} />
              )}
              <span onClick={toggle}>Switch appearance</span>
            </div>
              <Link to="/explore" style={{ textDecoration: 'none' }}>
            <div className="item">
                <ExploreIcon style={{ fontSize: '30px' }} />
                <span>Explore</span>
            </div>
              </Link>
              <Link to='/chat' >
            <div className="item">
              <BrandMessenger style={{ fontSize: '30px' }} />
              <span>Message</span>
            </div>
            </Link>
            <div onClick={()=> setNotificationModal(true)} className="item">
              <CircleNotificationsIcon style={{ fontSize: '30px' }} />
              <span>Notification</span>
            </div>
            <div className="item">
              <AddCircleIcon style={{ fontSize: '30px' }} />
              <span onClick={() => setModalIsOpen(true)}>Create</span>
            </div>
            <div className="user"  onClick={() => {
                  localStorage.setItem('profileId', user._id)
                  navigate(`/profile/${user._id}`)
                }}>
                {user.profilePicture?<img
                  src={user.profilePicture}
                  alt=""
                />:<img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                  alt=""
                />}
                <span>{user.firstName ? user.firstName : null}</span>
              
            </div>
            <div className="menu-bar">
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            <Typography sx={{ minWidth: 70 }}><span className='more'>More</span></Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -10,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem>
          <ListItemIcon>
            <BookmarkBorderIcon fontSize="small" />
          </ListItemIcon>
          Saved
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
              
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && <Model open={modalIsOpen} close={setModalIsOpen} />}
      {searchModal && <Search open={searchModal} close={setSearchModal} />}
      {notificationModal && <Notification open={notificationModal} close={setNotificationModal} />}
      
    </>
  )
}

export default LeftBar
