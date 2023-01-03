import React from 'react'

function Notifications({notificationPost}) {
  return (
    <>
         <img
                src={notificationPost?notificationPost.userId.profilePicture:"https://www.clipartmax.com/png/middle/296-2969961_no-image-user-profile-icon.png"}
                alt=""
              />
              <p>
                <span>{notificationPost?notificationPost.userId.firstName:'Nandhu'}</span>
                change their cover picture
              </p>
    </>
  )
}

export default Notifications