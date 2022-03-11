import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import GlobalStyle from './GlobalStyle';
import { Gallery } from './components/Gallery/Gallery';
import { Visualization } from './components/Visualization/Visualization';
import { Emoji } from './components/Emoji/Emoji';
import { Image } from './components/Image/Image';
import { NotFound } from './components/NotFound/NotFound';
import { VerifyLogin } from './components/Login/VerifyLogin';
import { useSelector } from 'react-redux';
import Player from './components/Player/Player';

function App() {
  const error = useSelector((state) => state.error);
  const accessToken = localStorage.getItem('spotiAccesstoken');
  const [playTrack, setPlayTrack] = useState('');
  const location = useLocation().pathname;
  const isLoginPage = location === '/login';
  const isPlayer = location === '/gallery' || location === '/visualization';

  return (
    <>
      <GlobalStyle />
      {error.isOccurError && <div>{error.message}</div>}
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route element={<VerifyLogin />}>
          <Route path="/image" element={<Image />} />
          <Route path="/emoji" element={<Emoji />} />
          <Route
            path="/gallery"
            element={<Gallery setPlayTrack={setPlayTrack} />}
          />
          <Route
            path="/visualization"
            element={<Visualization setPlayTrack={setPlayTrack} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isPlayer && <Player trackUri={playTrack} accessToken={accessToken} />}
    </>
  );
}

export default App;
