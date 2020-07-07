import React, { useState, useContext, useEffect } from 'react';

import ChatPreview from '../../components/ChatPreview/ChatPreview';
import ChatHeader from '../../components/ChatHeader/ChatHeader';

import '../../styles/dashboard.css';

import InputField from '../../components/InputField/InputField';
import ChatBox from '../../components/Chat/ChatBox';
import { WrapperContext } from '../../contexts/WrapperContext';
import ChatContent from '../../interfaces/ChatContent';

const Dashboard = () => {
  const { chats } = useContext(WrapperContext)

  const [selectedChat, setSelectedChat] = useState<ChatContent | undefined>(undefined)
  const [selectedChatId, setSelectedChatId] = useState<number | undefined>(undefined)

  const [chatIds, setChatIds] = useState<number[]>([])
  const [chatsContent, setChatsContent] = useState<ChatContent[]>([])

  useEffect(() => {
    const ids = Object.keys(chats)
    const contents = Object.values(chats)

    setChatIds(ids.map(id => parseInt(id)))
    setChatsContent(contents)
  }, [chats])

  function handleChatSelection(chatId: number) {
    const chat = chats[chatId]

    setSelectedChatId(chatId)
    setSelectedChat(chat)
  }
  
  return (
    <div className="dashboard-content">
      <aside className="contact-list">
        {chatIds.map((id, index) => <ChatPreview key={id} id={id} chat={chatsContent[index]} action={handleChatSelection} />)}
      </aside>

      <main>
        <ChatHeader selectedChat={selectedChat} />
        <ChatBox selectedChatId={selectedChatId} />
        <InputField selectedChatId={selectedChatId} selectedChat={selectedChat} />
      </main>
    </div>
  )
}

export default Dashboard;