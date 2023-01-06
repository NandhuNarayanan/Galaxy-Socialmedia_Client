import React, { useEffect, useState } from 'react'
import { getUser } from '../../app/api/chatRequests'
import { addMessage, getMessages } from '../../app/api/messageRequests'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser }) {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) getUserData()
  }, [chat, currentUser])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id)
        setMessages(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) fetchMessages()
  }, [chat])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async (event)=> {
    event.preventDefault();
    const message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat._id,
    
    }
   
    //send message to database
    try {
        const {data} = await addMessage(message);
        setMessages([...messages,data])
        setNewMessage("")
    } catch (error) {
        console.log(error);
    } 
  }

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower"></div>
              <div>
                {userData?.newUser.profilePicture ? (
                  <img
                    src={userData.newUser.profilePicture}
                    alt=""
                    className="followersImage"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    alt=""
                    className="followersImage"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                )}
                <div className="name" style={{ fontSize: '0.8rem' }}>
                  <span>{userData?.newUser.firstName}</span>
                </div>
              </div>
              <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
            </div>
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    className={
                      message.senderId === currentUser
                        ? 'message own'
                        : 'message'
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>Send</div>
            </div>
          </>
        ) : (
          <span className='chatbox-empty-message'>Tap on a Chat to start Conversation...</span>
        )}
      </div>
    </>
  )
}

export default ChatBox
