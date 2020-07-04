import React from 'react';

import Routes from './Routes';
import api from './services/api';
import { UserProvider } from './contexts/UserContext';
import { SocketProvider } from './contexts/SocketContext';
import { WrapperProvider } from './contexts/WrapperContext';

const App = () => {
  if(sessionStorage.getItem('token'))
    api.defaults.headers.common['token'] = sessionStorage.getItem('token');

  return (
    <WrapperProvider>
      <SocketProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </SocketProvider>
    </WrapperProvider>
  );
}

export default App;