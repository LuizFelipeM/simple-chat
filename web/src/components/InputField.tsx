import React, { useState, useContext, useEffect } from 'react';

// import '@material/react-material-icon/dist/material-icon.css';
import '../styles/inputField.css';
import IChats from '../interfaces/IChats';
import { SocketContext } from '../contexts/SocketContext';
import { ContainerContext } from '../contexts/ContainerContext';

function InputField(props: { selectedChat: IChats | undefined }) {
  const { userState } = useContext(ContainerContext)
  const { sendMessage } = useContext(SocketContext)

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    console.log('Input props.selectedChat', props.selectedChat)
  }, [props.selectedChat])

  const date = new Date();

  function handleSubmit(event: React.FormEvent){
    event.preventDefault()

    console.log('props?.selectedChat && userState?.id && userState?.name', (props?.selectedChat && userState?.id && userState?.name) ? true : false)
    
    if(props?.selectedChat && userState?.id && userState?.name)
      sendMessage({
        chat_id: props.selectedChat.id,
        message,
        message_sent_at: date.toISOString(),
        user_id: userState.id,
        user_name: userState.name
      })

    setMessage('')
  }

  return(
      <div className="input-field">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Digite uma mensagem..."
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e?.target?.value)}
          />
          <button type="submit">E</button>
        </form>
      </div>
  );
}

export default InputField;