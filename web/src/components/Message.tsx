import React from 'react'
import IMessage from '../interfaces/content'

function Message(props: { content: IMessage }){
    return (
        <div className={(sessionStorage.getItem('user_email') === props.content.email)?"my-message":"other-message"}>
            <div className="message-content">
                <header>
                    <span className="name">{sessionStorage.getItem('user_name') ? sessionStorage.getItem('user_name') : props.content.email?.split('@')[0]}</span>
                    <small className="timestamp">{props.content.timestamp}</small>
                </header>
                <span className="message">{props?.content?.message}</span>
            </div>
        </div>
    )
}

export default Message