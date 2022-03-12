import React from 'react';
import styled from 'styled-components';

const LoginBackground = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: white;
  width: 400px;
  height: 270px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 200px;
    margin-bottom: 30px;
  }

  a {
    width: 200px;
    line-height: 50px;
    text-align: center;
    background-color: #44d760;
    color: white;
    font-size: 18px;
    box-shadow: 3px 3px 5px #a0a0a0;
  }
`;
const generateRandomString = function (length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const state = generateRandomString(16);
const AUTH_URL = `http://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&state=${state}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing`;

export const Login = () => {
  return (
    <LoginBackground>
      <LoginBox>
        <img src="/images/spotify-logo.png" alt="spotify Logo" />
        <a href={AUTH_URL}>Sign in with Spotify</a>
      </LoginBox>
    </LoginBackground>
  );
};
