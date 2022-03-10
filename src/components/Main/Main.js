import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../../api/user';
import { isOccurError } from '../../features/error/errorSlice';
import { saveLoginUser } from '../../features/user/userSlice';
import useAuth from './useAuth';

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const MainLeft = styled.div`
  width: 50vw;
  height: 100vh;
  background-color: #2b3255;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 400px;
    height: 300px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }

  i {
    font-size: 250px;
    color: #2b3255;
    cursor: pointer;
  }
`;

const MainRight = styled.div`
  width: 50vw;
  height: 100vh;
  background-color: #ffcd48;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150px;

  div {
    cursor: pointer;
  }
`;

export const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  const accessToken = window.localStorage.getItem('jwtAccessToken');
  console.log('여긴메인');
  if (code) {
    const token = useAuth(code);
    const { accessToken, jwtAccessToken, email } = token;
    console.log('👁useAuth 결과', token);
    dispatch(saveLoginUser(email));
    window.localStorage.setItem('spotiAccesstoken', accessToken);
    window.localStorage.setItem('jwtAccessToken', jwtAccessToken);
  }

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
    // if (accessToken !== 'undefined') {
    // }
  }, []);

  return accessToken !== 'undefined' ? (
    <MainWrapper>
      <MainLeft>
        <div
          onClick={() => {
            navigate('/image');
          }}
        >
          <i className="fas fa-solid fa-image" />
        </div>
      </MainLeft>
      <MainRight>
        <div
          onClick={() => {
            navigate('/emoji');
          }}
        >
          😻
        </div>
      </MainRight>
    </MainWrapper>
  ) : (
    <Navigate to="/login" />
  );
};
