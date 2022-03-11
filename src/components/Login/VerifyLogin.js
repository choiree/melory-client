import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserInfo } from '../../api/user';
import { isOccurError } from '../../features/error/errorSlice';
import { saveLoginUser } from '../../features/user/userSlice';

export const VerifyLogin = () => {
  const dispatch = useDispatch();
  const accessToken = window.localStorage.getItem('jwtAccessToken');

  useEffect(() => {
    const userInfo = async () => {
      try {
        const user = await getUserInfo(accessToken);
        const { email } = user.result;

        dispatch(saveLoginUser(email));
      } catch (err) {
        dispatch(isOccurError(err.result.error));
      }
    };

    userInfo();
  }, []);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
