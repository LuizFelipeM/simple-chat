import React, { createContext, useEffect, useContext } from 'react';
import UserState from './UserState';
import { SocketContext } from './SocketContext';
import { WrapperContext } from './WrapperContext';

// const socketMessages = new Subject();
// const subToSocketMessages = (Observer: IObserver<any>) => { socketMessages.subscribe(Observer) };

type UserContextType = {
    // currentUser: Partial<UserState> | undefined
    // setCurrentUser: React.Dispatch<React.SetStateAction<Partial<UserState> | undefined>>
}

// const UserContext = createContext<UserContextType>({ currentUser: undefined, setCurrentUser: () => {} })
const UserContext = createContext<UserContextType>({})

const UserProvider = (props: { children: JSX.Element }): JSX.Element => {
    const { login } = useContext(SocketContext)
    const { currentUser, setCurrentUser } = useContext(WrapperContext)

    useEffect(() => {
        const sessionUserData: Partial<UserState> = {
            id: parseInt(sessionStorage.getItem('userId') as string),
            name: sessionStorage.getItem('userName') as string,
            email: sessionStorage.getItem('userEmail') as string,
            token: sessionStorage.getItem('token') as string
        }

        if(sessionUserData.email)
            login(sessionUserData.email, '123')

        setCurrentUser(sessionUserData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(currentUser?.id) sessionStorage.setItem('userId', currentUser.id.toString())
        if(currentUser?.name) sessionStorage.setItem('userName', currentUser.name)
        if(currentUser?.email) sessionStorage.setItem('userEmail', currentUser.email)
        if(currentUser?.token) sessionStorage.setItem('token', currentUser.token)
    }, [currentUser])

    return (
        <UserContext.Provider value={{}}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };