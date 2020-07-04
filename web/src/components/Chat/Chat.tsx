import React, { useContext, useState, useEffect } from 'react'

import './chat.css'
import Chat from '../../interfaces/Chat'
import MessageBox from '../MessageBox/MessageBox'
import { WrapperContext } from '../../contexts/WrapperContext'
import ChatContent from '../../interfaces/ChatContent'

function ChatBox(props: { selectedChatId: number | undefined, selectedChat: ChatContent | undefined }){
    const { chats } = useContext(WrapperContext)

    const [chat, setChat] = useState<ChatContent | undefined>(undefined)

    useEffect(() => {
        if(props.selectedChatId)
            setChat(chats[props.selectedChatId])
    }, [chats, props.selectedChatId])

    return (
        <div className="chat">
            {chat?.messages?.map((message, index) => <MessageBox key={index} content={message} />)}
        </div>
    )
}

export default ChatBox;