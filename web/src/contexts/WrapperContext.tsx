import React, { createContext, useState } from 'react'
import IChats from '../interfaces/IChats'
import UserState from './UserState'

type WrapperContextType = {
    userState: Partial<UserState> | undefined
    setUserState: React.Dispatch<React.SetStateAction<Partial<UserState> | undefined>>
    chats: IChats[]
    setChats: React.Dispatch<React.SetStateAction<IChats[]>>
}

const WrapperContext = createContext<WrapperContextType>({ userState: undefined, setUserState: () => {}, chats: [], setChats: () => {} })

const WrapperProvider = (props: { children: JSX.Element }) => {
    const [userState, setUserState] = useState<Partial<UserState>>()
    const [chats, setChats] = useState<IChats[]>([])

    return (
        <WrapperContext.Provider value={{ userState, setUserState, chats, setChats }}>
            {props.children}
        </WrapperContext.Provider>
    )
}

export { WrapperContext, WrapperProvider }
