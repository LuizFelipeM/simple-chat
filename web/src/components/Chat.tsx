import React, { useContext, useState, useEffect } from 'react'

import '../styles/chat.css'
import IChats from '../interfaces/IChats'
import MessageBox from './MessageBox'
import { WrapperContext } from '../contexts/WrapperContext'

function Chat(props: { selectedChat: IChats | undefined }){
    const { chats } = useContext(WrapperContext)

    const [chat, setChat] = useState(chats.find(chat => chat.id == props.selectedChat?.id))

    useEffect(() => {
        setChat(chats.find(chat => chat.id == props.selectedChat?.id))
    }, [chats, props.selectedChat])

    return (
        <div className="chat">
            {chat?.messages?.map((message, index) => <MessageBox key={index} content={message} />)}
        </div>
    )
}

export default Chat;