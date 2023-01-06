import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../../app/api/chatRequests'
import ChatBox from '../../components/chatBox/ChatBox'
import Conversation from '../../components/conversation/Conversation'
import './chat.scss'
import { io } from 'socket.io-client'

function Chat() {
  const user = useSelector((state) => state.auth.newUser)
  console.log(user, 'user😎')

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(user._id)
        setChats(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user])

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">Right Side</div>
      <ChatBox chat={currentChat} currentUser={user._id} />
    </div>
  )
}

export default Chat
