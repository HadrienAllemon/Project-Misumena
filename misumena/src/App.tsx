import React,{ useContext, useEffect } from 'react';
import { SocketContext, SocketProvider } from './contexts/socket/SocketContext';
import { BrowserRouter } from "react-router-dom";

import './App.css';
import Test from './components/test/test';
import Main from './components/Main';

function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <Main />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
