import React, { useContext, useState } from 'react'
import './leftBar.scss'
import HomeIcon from '@mui/icons-material/Home'
import Brightness2Icon from '@mui/icons-material/Brightness2'
import ExploreIcon from '@mui/icons-material/Explore'
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchIcon from '@mui/icons-material/Search'
import { BrandMessenger } from 'tabler-icons-react'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext'
import Model from '../postModal/PostModals'
import { useSelector } from 'react-redux'
import Logo from '../../assets/image/logo_for_galaxy1.png'

function LeftBar() {

  const location = useLocation()
  const user = useSelector((state) => state.auth.newUser)
  const local = localStorage.getItem('auth')

  const navigate = useNavigate()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { toggle, darkMode } = useContext(DarkModeContext)

  // const menuItem = document.querySelectorAll('.item')

  // const removeActiveClass = () => {
  //   menuItem.forEach(item => {
  //     item.classList.remove('active')
  //   })
  // }

  // menuItem.forEach(item => {
  //   item.addEventListener('click',() => {
  //     removeActiveClass()
  //     item.classList.add('active')
  //   })
  // })
 

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
            <div className="item">
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
            <div className="item">
              <BrandMessenger style={{ fontSize: '30px' }} />
              <span>Message</span>
            </div>
            <div className="item">
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
                  src="https://www.clipartmax.com/png/middle/296-2969961_no-image-user-profile-icon.png"
                  alt=""
                />}
                <span>{user.firstName ? user.firstName : null}</span>
              
            </div>
            <div className="menu-bar">
              <MenuIcon style={{ fontSize: '30px' }} />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && <Model open={modalIsOpen} close={setModalIsOpen} />}
      
    </>
  )
}

export default LeftBar
