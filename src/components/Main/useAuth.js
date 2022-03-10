import { useEffect, useState } from 'react';
const axios = require('axios');

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [jwtAccessToken, setJwtAccessToken] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          code,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        setJwtAccessToken(res.data.jwtAccessToken);
        setEmail(res.data.email);
        window.history.pushState({}, null, '/');
      })
      .catch(() => {
        window.location = '/';
      });

    return {
      accessToken,
      jwtAccessToken,
      email,
    };
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
          {
            refreshToken,
          },
          { withCredentials: true },
        )
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = '/';
        });
    }, (expiresIn - 60) * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, expiresIn]);

  // axios.defaults.headers.common['Authorization'] = accessToken;
  return {
    accessToken,
    jwtAccessToken,
    email,
  };
}
