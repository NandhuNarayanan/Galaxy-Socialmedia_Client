import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../../app/api/chatRequests'
import ChatBox from '../../components/chatBox/ChatBox'
import Conversation from '../../components/conversation/Conversation'
import './chat.scss'
import { io } from 'socket.io-client'

function Chat() {
  const user = useSelector((state) => state.auth.newUser)

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)

  const socket = useRef()

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  //recieve message from socket server
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setRecieveMessage(data)
    })
  }, [])

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


  const checkOnlineStatus = (chat)=> {
    const chatMember = chat.members.find((member)=> member!== user._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true:false
  }


  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChatBox
        chat={currentChat}
        currentUser={user._id}
        setSendMessage={setSendMessage}
        recieveMessage={recieveMessage}
      />
    </div>
  )
}

export default Chat
