import React, { useContext, useEffect } from 'react';
import { SocketContext, SocketProvider } from './contexts/socket/SocketContext';
import { BrowserRouter } from "react-router-dom";

import './App.css';
import Test from './components/test/test';
import Main from './components/Main';
import { ChakraProvider } from '@chakra-ui/react';

function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <ChakraProvider>
          <Main />
        </ChakraProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
