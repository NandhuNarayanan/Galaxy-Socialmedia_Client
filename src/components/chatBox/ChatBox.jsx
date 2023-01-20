import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../app/api/chatRequests'
import { addMessage, getMessages } from '../../app/api/messageRequests'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { MessageChatbot } from 'tabler-icons-react';
import './chatBox.scss'

function ChatBox({ chat, currentUser, setSendMessage, recieveMessage }) {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scroll = useRef()


  useEffect(()=>{
    if (recieveMessage !== null && recieveMessage?.chatId === chat?._id) {
      setMessages([...messages,recieveMessage]);
    }
  },[recieveMessage])

  // fetching data for header
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
    if (message.text==="") {
     const {data} = newMessage()
    }else{
      
      //send message to database
      try {
          const {data} = await addMessage(message);
          setMessages([...messages,data])
          setNewMessage("")
      } catch (error) {
          console.log(error);
      } 
      //send message to socket server
      const receiverId = chat.members.find((id)=>id !== currentUser);
      setSendMessage({...message,receiverId})
    }
   
  }

  //Always scroll to last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

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
                    
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    alt=""
                    className="followersImage"
                    
                  />
                )}
                <div className="chatName">
                  <span>{userData?.newUser.firstName}</span>
                </div>
              </div>
            </div>
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                  ref={scroll}
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
          <>
          <MessageChatbot style={{margin:'27rem',width:'36rem',height:'6rem'}}/>
          <span className='chatbox-empty-message'>Send messages to a friend...</span>
          </>
        )}
      </div>
    </>
  )
}

export default ChatBox
