
import React, { createContext, useContext, useState } from 'react';
import socketio from 'socket.io-client'

import IChats from '../interfaces/IChats';
import Message from '../interfaces/Message';
import UserState from './UserState';
import { ContainerContext } from './ContainerContext';

type SocketContextType = {
  chats: IChats[]
  setChats: React.Dispatch<React.SetStateAction<IChats[]>>
  login: (email: string, password: string) => void
  sendMessage: (content: Message) => void
}

const SocketContext = createContext<SocketContextType>({ chats: [], setChats: () => {}, login: () => {}, sendMessage: (content: Message) => {} })

const SocketProvider = (props: { children: JSX.Element }) => {
  // const { userState, setUserState } = useContext(UserContext)
  const { chats, setChats, userState, setUserState } = useContext(ContainerContext)

  const [socket] = useState(socketio('http://localhost:8080', { autoConnect: false }))
  
  socket.on('chatList', setChats)
  socket.on('userInfo', (data: Pick<UserState, 'name' | 'id'>) => setUserState({ ...userState, ...data }))

  socket.on('message', (content: Message) => {
    const chatsWithMessages = chats.map(chat => {
      if(chat.id === content.chat_id)
        return { ...chat, ...{ messages: chat?.messages?.length ? [...chat.messages, content] : [content]} }
      return chat
    })

    setChats(chatsWithMessages)
  })

  socket.on('messagesOnChat', (chatId: string, messages: Message[]) => {
    const id = parseInt(chatId)

    const chatsWithMessages = chats.map(chat => {
      if(chat.id == id)
        return { ...chat, ...{ messages } }
      return chat
    })

    setChats(chatsWithMessages)
  })

  const sendMessage = (content: Message) => socket.emit('message', content)

  function login(email: string, password: string){
    if(socket.connected) socket.disconnect()
    
    socket.io.opts.query = { email, password }
    socket.connect()
  }


  // const getUserChatList = (setChat: (chatList: IChats[]) => void) => {
  //   const userId = parseInt(sessionStorage.getItem('userId') as string)

  //   socket.emit('getChatList', { userId })
  // }

  return (
    <SocketContext.Provider value={{ chats, setChats, login, sendMessage }}>
      {props.children}
    </SocketContext.Provider>
  )
}

// function socketService() {
  
//   function setupWebSocket(email: string, password: string){
//     disconnect();
    
//     socket.io.opts.query = { email, password }
//     socket.connect();
    
//     socket.on('message', (data: Message) => {})
//   }
  
//   function disconnect(){
//     if(socket.connected)
//       socket.disconnect();
//   }
  
//   const sendMessage = (content: Message) => socket.emit('message', content)

  

//   const isConnected = socket.connected

//   return {
//     sendMessage,
//     setupWebSocket,
//     getUserChatList,
//     isConnected
//   }
// }

export { SocketContext, SocketProvider }