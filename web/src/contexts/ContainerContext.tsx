import React, { createContext, useState } from 'react'
import IChats from '../interfaces/IChats'
import UserState from './UserState'

type ContainerContextType = {
    userState: Partial<UserState> | undefined
    setUserState: React.Dispatch<React.SetStateAction<Partial<UserState> | undefined>>
    chats: IChats[]
    setChats: React.Dispatch<React.SetStateAction<IChats[]>>
}

const ContainerContext = createContext<ContainerContextType>({ userState: undefined, setUserState: () => {}, chats: [], setChats: () => {} })

const ContainerProvider = (props: { children: JSX.Element }) => {
    const [userState, setUserState] = useState<Partial<UserState>>()
    const [chats, setChats] = useState<IChats[]>([])

    return (
        <ContainerContext.Provider value={{ userState, setUserState, chats, setChats }}>
            {props.children}
        </ContainerContext.Provider>
    )
}

export { ContainerContext, ContainerProvider }
