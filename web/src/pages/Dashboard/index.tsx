import React from 'react';
import { AxiosResponse } from 'axios';

import Chat from '../../components/Chat';
import ChatPreview from '../../components/ChatPreview';
import ChatHeader from '../../components/ChatHeader';

import '../../styles/dashboard.css';

import api from '../../services/api';
import { setupWebSocket, joinChat } from '../../services/socket';

import InputField from '../../components/InputField';

class Dashboard extends React.Component<{}, { chats: [], actualChat: any }>{
  constructor(props: { history: any }){
    super(props)

    if(!sessionStorage.getItem('token'))
      props.history.push('/login');

    this.state = {
      chats: [],
      actualChat: undefined
    }

    this.handleChatSelection = this.handleChatSelection.bind(this);
    this.listChats = this.listChats.bind(this);
  }

  componentDidMount(){
    this.listChats();
    setupWebSocket();
  }

  async listChats(){
    const response: AxiosResponse<any> = await api.get('/chats', { headers: { token: sessionStorage.getItem('token') } });
    this.setState({ chats: response.data })
  }

  handleChatSelection(chat_id: Number) {
    const actual = this.state.chats?.find((chat: any)=> chat.chat_id === chat_id);
    this.setState({
       actualChat: actual
    })
  }

  render(){
    return (
      <div className="dashboard-content">
        <aside className="contact-list">
          {this.state.chats?.map((chat: any)=>{
            joinChat(chat?.chat_id)

            return (
              <ChatPreview key={chat.chat_id} chat={chat} action={this.handleChatSelection} />
            )
          })}
        </aside>

        <main>
          <ChatHeader chat={this.state.actualChat} />
          <Chat chat={this.state.actualChat} />
          <InputField chat={this.state.actualChat} />
        </main>
      </div>
    );
  }
}

export default Dashboard;