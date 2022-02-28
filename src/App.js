import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Main } from './components/Main/Main';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
