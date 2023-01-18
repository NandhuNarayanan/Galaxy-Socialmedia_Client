import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import './rightBar.scss'
import AllUser from '../friendsList/AllUser'
import Conversation from '../conversation/Conversation'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

function Rightbar() {
  const userNotification = useSelector(
    (state) => state.auth.newUser.notification,
  )

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span className="suggestion">Who to follow</span>
          <div className="user">
            <div className="userInfo">
              <AllUser />
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          
              {userNotification?.map((obj, index) => {
                return (
                  <>
                    
          <div className="user">
            <div className="userInfo">
                      
                        <div >
                          <img
                            src={
                              obj?.profilepic
                                ? obj.profilepic
                                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                            }
                            alt=""
                          />
                        </div>
                          <span>{obj.notificationContent}</span>
                      </div>
                        <div style={{fontSize:'10px'}}>{format(obj.time)}</div>
                    </div>
                  </>
                )
              })}
              {userNotification ?.length < 1 ? <h2>No Notifications</h2> : null}
              </div>


          <div className="item">
            <span>Online Friends</span>
            <div className="user">
              <div className="userInfo">
                
                    <img
                      src="https://images.pexels.com/photos/5264597/pexels-photo-5264597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <p>
                      <span>Nandhu</span>
                      change their cover picture
                    </p>
                  </div>
                  <span>1 min ago</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Rightbar
