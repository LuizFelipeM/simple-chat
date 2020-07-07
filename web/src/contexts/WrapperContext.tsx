import React, { createContext, useState } from 'react'
import UserState from './UserState'
import ChatDto from '../interfaces/ChatDto'

type WrapperContextType = {
    currentUser: Partial<UserState> | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<Partial<UserState> | undefined>>
    chats: ChatDto
    setChats: React.Dispatch<React.SetStateAction<ChatDto>>
}

const initialContext = {
    currentUser: undefined,
    setCurrentUser: () => {},
    chats: [],
    setChats: () => {},
}

const WrapperContext = createContext<WrapperContextType>(initialContext)

const WrapperProvider = (props: { children: JSX.Element }) => {
    const [currentUser, setCurrentUser] = useState<Partial<UserState>>()
    const [chats, setChats] = useState<ChatDto>({})

    return (
        <WrapperContext.Provider value={{
            currentUser,
            setCurrentUser,
            chats,
            setChats
        }}>
            {props.children}
        </WrapperContext.Provider>
    )
}

export { WrapperContext, WrapperProvider }
