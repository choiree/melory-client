import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import GlobalStyle from './GlobalStyle';
import { Gallery } from './components/Gallery/Gallery';
import { Visualization } from './components/Visualization/Visualization';
import { Emoji } from './components/Emoji/Emoji';
import { Image } from './components/Image/Image';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/image" element={<Image />} />
        <Route path="/emoji" element={<Emoji />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/visualization" element={<Visualization />} />
      </Routes>
    </>
  );
}

export default App;
