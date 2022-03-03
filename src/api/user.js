import axios from 'axios';

export async function getUserInfo(token) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getUserGallery(token, email) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/${email}/gallery`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function savePhoto(token, email, photoInfo) {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/${email}/gallery`,
    photoInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
