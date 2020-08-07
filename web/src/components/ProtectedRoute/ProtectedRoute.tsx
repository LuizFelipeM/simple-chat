import React, { useContext } from 'react'
import { ContainerContext } from '../../contexts/ContainerContext'
import { Route } from 'react-router-dom'

interface ProtectedRouterProps {
    Component: React.FunctionComponent<any>,
    rest: React.ComponentProps<any>
}

const ProtectedRoute = ({ Component, ...rest }: ProtectedRouterProps) => {
    const { userState } = useContext(ContainerContext)

    return (
        <Route
            {...rest}
            render={props => {
                if(!userState?.email)
                    return <div/>

                return <Component {...props} />
            }}
        />
    )
}

export default ProtectedRoute
