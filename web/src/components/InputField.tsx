import React, { useState } from 'react';

// import '@material/react-material-icon/dist/material-icon.css';
import '../styles/inputField.css';
import { sendMessage } from '../services/socket';

function InputField({ chat }: any) {
  const [message, setMessage] = useState<string>('')

  const date = new Date();

  function handleSubmit(event: React.FormEvent){
    event.preventDefault()

    sendMessage(chat?.chat_id, { email: sessionStorage.getItem('user_email'), message, timestamp: date.getUTCDate().toString()});
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