import React, { useContext, useEffect } from 'react'

import './chat.css'
import MessageBox from '../MessageBox/MessageBox'
import { SocketContext } from '../../contexts/SocketContext'

function ChatBox(props: { selectedChatId: number | undefined }){
    const { messages } = useContext(SocketContext)

    useEffect(() => scrollToBottom(), [props.selectedChatId, messages])

    const scrollToBottom = () => {
        const el = document.getElementById('chat-container')

        el?.scrollTo({
            top: el.scrollHeight
        })
    }

    return (
        <div id="chat-container" className="chat">
            <button
                className="floating-button"
                onClick={scrollToBottom}
            >
                B
            </button>
            {props.selectedChatId ? messages[props.selectedChatId]?.map((message, index, arr) => <MessageBox id={index === arr.length - 1 ? 'last-message' : ''} key={index} content={message} />) : null}
        </div>
    )
}

export default ChatBox;