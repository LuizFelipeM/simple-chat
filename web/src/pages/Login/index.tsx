import React, { useState, useContext } from 'react';
import * as H from 'history';

import '../../styles/login.css';

// import * as logo from '../../assets/logo-1.png'
import { SocketContext } from '../../contexts/SocketContext';
import { WrapperContext } from '../../contexts/WrapperContext';
// const logo = '../../assets/logo-1.png'


function Login(props: { history: H.History }){
  const { currentUser, setCurrentUser } = useContext(WrapperContext)
  const { login } = useContext(SocketContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: any){
    event.preventDefault();

    // const response = await api.post('/users/auth', { email, password });

    // if(response.status === 200){
    //   sessionStorage.setItem('user_email', email);
    //   sessionStorage.setItem('token', response?.data?.token);
    //   api.defaults.headers.common['token'] = response?.data?.token;

    //   history.push('/');
    // }

    setCurrentUser({ ...currentUser, ...{ email }})
    login(email, password)
    props.history.push('/');
  }

  return(
    <div className="login-form">
      {/* <img src={logo} alt="Whatsapp logo"/> */}
      {/* <img src={logo} /> */}

      <div className="content">
        <form onSubmit={handleSubmit}>
            <input required type="email" placeholder="Digite seu email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e?.target?.value)} />
            <input required type="password" placeholder="Insira sua senha" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e?.target?.value)} />
            
            <button type="submit">Entrar</button>
            <a href="/sign-up">Ainda não sou cadastrado</a>
        </form>
      </div>
    </div>
  );
}

export default Login;