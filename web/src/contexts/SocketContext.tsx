import React, { createContext, useContext, useState, useEffect } from 'react'
import socketio from 'socket.io-client'

import Chat from '../interfaces/Chat'
import Message from '../interfaces/Message'
import UserState from './UserState'
import { WrapperContext } from './WrapperContext'
import ChatDto from '../interfaces/ChatDto'
import MessageDto from '../interfaces/MessagesDto'

type SocketContextType = {
  login: (email: string, password: string) => void
  sendMessage: (content: Message) => void
  messages: MessageDto
  setMessages: React.Dispatch<React.SetStateAction<MessageDto>>
}

const initialContext = {
  login: () => {},
  sendMessage: () => {},
  messages: {},
  setMessages: () => {},
}

const SocketContext = createContext<SocketContextType>(initialContext)

const SocketProvider = (props: { children: JSX.Element }) => {
  const { setChats, currentUser, setCurrentUser } = useContext(WrapperContext)
  
  const [messages, setMessages] = useState<MessageDto>({})
  const [socket] = useState(socketio('http://localhost:8080', {
    autoConnect: false
  }))

  useEffect(() => {
    removeSocketListeners()
    return removeSocketListeners()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  function removeSocketListeners() {
    socket.off('message')
    socket.off('messagesOnChat')
    socket.off('userInfo')
    socket.off('chatList')
  }
  
  socket.on('chatList', handleChatList)
  socket.on('userInfo', (data: Pick<UserState, 'name' | 'id'>) => setCurrentUser({ ...currentUser, ...data }))

  socket.on('message', handleMessage)

  socket.on('messagesOnChat', (chatId: string, incomingMessages: Message[]) => {
    const newMessages = Object.assign({}, messages, { [chatId]: incomingMessages })

    setMessages(newMessages)
  })

  function handleMessage(content: Message){
    socket.off('message')
    const messageArr = [...( messages[content.chat_id] ? messages[content.chat_id] : [] ), content]

    console.log('handleMessage', messageArr)

    setMessages(Object.assign({}, messages, { [content.chat_id]: messageArr }))
  }

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
    <SocketContext.Provider value={{
      login,
      sendMessage,
      messages,
      setMessages
    }}>
      {props.children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }