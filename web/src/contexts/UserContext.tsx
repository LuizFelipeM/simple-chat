import React, { createContext, useEffect, useContext } from 'react';
import UserState from './UserState';
import { SocketContext } from './SocketContext';
import { WrapperContext } from './WrapperContext';

// const socketMessages = new Subject();
// const subToSocketMessages = (Observer: IObserver<any>) => { socketMessages.subscribe(Observer) };

type UserContextType = {
    // userState: Partial<UserState> | undefined
    // setUserState: React.Dispatch<React.SetStateAction<Partial<UserState> | undefined>>
}

// const UserContext = createContext<UserContextType>({ userState: undefined, setUserState: () => {} })
const UserContext = createContext<UserContextType>({})

const UserProvider = (props: { children: JSX.Element }): JSX.Element => {
    const { login } = useContext(SocketContext)
    const { userState, setUserState } = useContext(WrapperContext)

    useEffect(() => {
        const sessionUserData: Partial<UserState> = {
            id: parseInt(sessionStorage.getItem('userId') as string),
            name: sessionStorage.getItem('userName') as string,
            email: sessionStorage.getItem('userEmail') as string,
            token: sessionStorage.getItem('token') as string
        }

        if(sessionUserData.email)
            login(sessionUserData.email, '123')

        setUserState(sessionUserData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(userState?.id) sessionStorage.setItem('userId', userState.id.toString())
        if(userState?.name) sessionStorage.setItem('userName', userState.name)
        if(userState?.email) sessionStorage.setItem('userEmail', userState.email)
        if(userState?.token) sessionStorage.setItem('token', userState.token)
    }, [userState])

    return (
        <UserContext.Provider value={{}}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };