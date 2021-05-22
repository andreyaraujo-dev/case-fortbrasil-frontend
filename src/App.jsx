import React from 'react';
import { Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from './Routes';
import history from './services/history';
import customTheme from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Router history={history}>
        <Routes />
      </Router>
    </ChakraProvider>
  );
}

export default App;
