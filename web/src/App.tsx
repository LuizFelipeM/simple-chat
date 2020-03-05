import React from 'react';

import Routes from './Routes';
import api from './services/api';

const App = () => {
  if(sessionStorage.getItem('token'))
    api.defaults.headers.common['token'] = sessionStorage.getItem('token');

  return (
    <Routes />
  );
}

export default App;