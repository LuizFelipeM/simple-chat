import React, { createContext, useState, useEffect } from 'react'
import Chat from '../interfaces/Chat'
import UserState from './UserState'
import ChatDto from '../interfaces/ChatDto'
import MessageDto from '../interfaces/MessagesDto'

type WrapperContextType = {
    currentUser: Partial<UserState> | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<Partial<UserState> | undefined>>
    chats: ChatDto
    setChats: React.Dispatch<React.SetStateAction<ChatDto>>
    messages: MessageDto
    setMessages: React.Dispatch<React.SetStateAction<MessageDto>>
}

const initialContext = {
    currentUser: undefined,
    setCurrentUser: () => {},
    chats: [],
    setChats: () => {},
    messages: {},
    setMessages: () => {},
}

const WrapperContext = createContext<WrapperContextType>(initialContext)

const WrapperProvider = (props: { children: JSX.Element }) => {
    const [currentUser, setCurrentUser] = useState<Partial<UserState>>()
    const [chats, setChats] = useState<ChatDto>({})
    const [messages, setMessages] = useState<MessageDto>({})

    useEffect(() => {
        console.log('chats', chats)
    }, [chats])

    return (
        <WrapperContext.Provider value={{
            currentUser,
            setCurrentUser,
            chats,
            setChats,
            messages,
            setMessages
        }}>
            {props.children}
        </WrapperContext.Provider>
    )
}

export { WrapperContext, WrapperProvider }
