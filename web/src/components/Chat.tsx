import React from 'react';

import '../styles/chat.css';

import Message from './Message';
import { subToSocketMessages } from '../services/socket';
import MessageObserver from '../services/message.observer';
import IMessage from '../interfaces/content';
// import api from '../services/api';

let messageListener: MessageObserver;

class Chat extends React.Component<{chat: any}, { data: { chat_id: Number | null, content: IMessage[]}[] }> {
    constructor(props: { chat: any }){
        super(props);

        this.state = {
            data: []
        };
        
        messageListener = new MessageObserver(this);
        subToSocketMessages(messageListener);
    }

    render(){
        return (
            <div className="chat">
                {this.state.data?.map((chat: { chat_id: Number | null, content: IMessage[] }) => (
                    (chat?.chat_id === this.props.chat?.chat_id) ?
                        chat?.content?.map((message: IMessage, index: number) => 
                            <Message key={index} content={message} />
                        )
                    : null
                ))}
            </div>
        )
    }
    
}

export default Chat;