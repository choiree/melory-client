import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../api/user';
import { saveLoginUser } from '../../features/user/userSlice';
import { Login } from '../Login/Login';
import useAuth from './useAuth';

export const Main = () => {
  const dispatch = useDispatch();
  const code = new URLSearchParams(window.location.search).get('code');
  const accessToken = window.localStorage.getItem('jwtAccessToken');

  if (code) {
    const token = useAuth(code);
    const { accessToken, jwtAccessToken, email } = token;

    dispatch(saveLoginUser(email));
    window.localStorage.setItem('spotiAccesstoken', accessToken);
    window.localStorage.setItem('jwtAccessToken', jwtAccessToken);
  }

  useEffect(() => {
    const userInfo = async () => {
      const user = await getUserInfo(accessToken);
      const { email } = user.result;

      dispatch(saveLoginUser(email));
    };

    userInfo();
  }, []);

  return accessToken ? <div>main</div> : <Login />;
};
