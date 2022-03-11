import axios from 'axios';

export async function loginUser(code) {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    {
      code,
    },
    { withCredentials: true },
  );

  return response.data;
}

export async function getNewAccessToken(refreshToken) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
    {
      refreshToken,
    },
    { withCredentials: true },
  );

  return response.data;
}
