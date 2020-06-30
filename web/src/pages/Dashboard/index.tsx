import React, { useState, useContext, useEffect } from 'react';

import ChatPreview from '../../components/ChatPreview';
import ChatHeader from '../../components/ChatHeader';

import '../../styles/dashboard.css';

import InputField from '../../components/InputField';
import IChats from '../../interfaces/IChats';
import { SocketContext } from '../../contexts/SocketContext';
import Chat from '../../components/Chat';

const Dashboard = () => {
  const { chats } = useContext(SocketContext)

  const [selectedChat, setSelectedChat] = useState<IChats | undefined>(undefined)

  function handleChatSelection(chatId: Number) {
    const chat = chats?.find(chat => chat.id === chatId)
    setSelectedChat(chat)
  }
  
  return (
    <div className="dashboard-content">
      <aside className="contact-list">
        {chats?.map(chat => <ChatPreview key={chat.id} chat={chat} action={handleChatSelection} />)}
      </aside>

      <main>
        <ChatHeader selectedChat={selectedChat} />
        <Chat selectedChat={selectedChat} />
        <InputField selectedChat={selectedChat} />
      </main>
    </div>
  )
}

export default Dashboard;