import React, { useState, useContext } from 'react';

// import '@material/react-material-icon/dist/material-icon.css';
import './inputField.css';
import { SocketContext } from '../../contexts/SocketContext';
import { WrapperContext } from '../../contexts/WrapperContext';
import ChatContent from '../../interfaces/ChatContent';

function InputField(props: { selectedChatId: number | undefined, selectedChat: ChatContent | undefined }) {
  const { currentUser } = useContext(WrapperContext)
  const { sendMessage } = useContext(SocketContext)

  const [message, setMessage] = useState<string>('')

  const date = new Date();

  function handleSubmit(event: React.FormEvent){
    event.preventDefault()

    if(props?.selectedChat && props.selectedChatId && currentUser?.id && currentUser?.name)
      sendMessage({
        chat_id: props.selectedChatId,
        message,
        message_sent_at: date.toISOString(),
        user_id: currentUser.id,
        user_name: currentUser.name
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