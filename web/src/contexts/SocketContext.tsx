
import React, { createContext, useContext, useState } from 'react';
import socketio from 'socket.io-client'

import Chat from '../interfaces/Chat';
import Message from '../interfaces/Message';
import UserState from './UserState';
import { WrapperContext } from './WrapperContext';
import ChatDto from '../interfaces/ChatDto';
import ChatContent from '../interfaces/ChatContent';

type SocketContextType = {
  login: (email: string, password: string) => void
  sendMessage: (content: Message) => void
}

const SocketContext = createContext<SocketContextType>({ login: () => {}, sendMessage: () => {} })

const SocketProvider = (props: { children: JSX.Element }) => {
  // const { currentUser, setCurrentUser } = useContext(UserContext)
  const { chats, setChats, currentUser, setCurrentUser } = useContext(WrapperContext)

  const [socket] = useState(socketio('http://localhost:8080', { autoConnect: false }))
  
  socket.on('chatList', handleChatList)
  socket.on('userInfo', (data: Pick<UserState, 'name' | 'id'>) => setCurrentUser({ ...currentUser, ...data }))

  socket.on('message', (content: Message) => {
    console.log('chats', chats)
    const messages = [ ...chats[content.chat_id].messages, content ]

    setChats({ ...chats, ...{ ...chats[content.chat_id], messages } })
  })

  socket.on('messagesOnChat', (chatId: string, messages: Message[]) => {
    if(chats[parseInt(chatId)]){
      const chat: ChatContent = { 
        name: chats[parseInt(chatId)].name,
        description: chats[parseInt(chatId)].description,
        img_url: chats[parseInt(chatId)].img_url,
        messages
      }
      
      const newChats = Object.assign({}, chats, { [chatId]: chat })
      console.log('newChats', newChats)
      // setChats(newChats)
    }
  })

  const sendMessage = (content: Message) => socket.emit('message', content)

  function login(email: string, password: string){
    if(socket.connected) socket.disconnect()
    
    socket.io.opts.query = { email, password }
    socket.connect()
  }

  function handleChatList(chatList: Chat[]) {
    const chatsTest: ChatDto = {}

    chatList.forEach(chat => {
      const { id, ...chatContent } = chat

      Object.assign(chatsTest, { [id]: chatContent })
    })

    setChats(chatsTest)
  }

  return (
    <SocketContext.Provider value={{ login, sendMessage }}>
      {props.children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }