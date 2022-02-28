import React from 'react';
import { Login } from '../Login/Login';
import useAuth from './useAuth';

export const Main = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const accessToken = window.localStorage.getItem('token');

  if (code) {
    const accessToken = useAuth(code);

    window.localStorage.setItem('token', accessToken);
  }

  return accessToken ? <div>main</div> : <Login />;
};
