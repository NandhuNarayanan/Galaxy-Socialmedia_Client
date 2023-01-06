import React, { useEffect, useState } from 'react'
import { getUser } from '../../app/api/chatRequests'

function Conversation({ data, currentUser }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser)
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
          <div className="online-dot"></div>
          {userData?.newUser.profilePicture ? (
            <img
              src={userData.newUser.profilePicture}
              alt=""
              className="followersImage"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              alt=""
              className="followersImage"
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          )}
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>{userData?.newUser.firstName}</span>
            <span>Online</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  )
}

export default Conversation
