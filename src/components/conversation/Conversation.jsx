import React, { useEffect, useState } from 'react'
import { getUser } from '../../app/api/chatRequests'
import './conversation.scss'

function Conversation({ data, currentUser, online }) {
  console.log(currentUser,'currentUser');
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = data?.members.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          {userData?.newUser.profilePicture ? (
            <img
              src={userData.newUser.profilePicture}
              alt=""
              className="followersImage"
              
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              alt=""
              className="followersImage"
              
            />
          )}
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>{userData?.newUser.firstName}</span>
            <span>{online ?'Online':'Offline'}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  )
}

export default Conversation
