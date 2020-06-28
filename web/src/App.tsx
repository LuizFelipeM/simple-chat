import React from 'react';

import Routes from './Routes';
import api from './services/api';
import { UserProvider } from './contexts/UserContext';
import { SocketProvider } from './contexts/SocketContext';
import { ContainerProvider } from './contexts/ContainerContext';

const App = () => {
  if(sessionStorage.getItem('token'))
    api.defaults.headers.common['token'] = sessionStorage.getItem('token');

  return (
    <ContainerProvider>
      <SocketProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </SocketProvider>
    </ContainerProvider>
  );
}

export default App;