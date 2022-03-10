import axios from 'axios';

export async function login(code) {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    {
      code,
    },
    { withCredentials: true },
  );

  return response.data;
}

// export async function getUserGallery(token, email) {
//   const response = await axios.get(
//     `${process.env.REACT_APP_BASE_URL}/user/${email}/gallery`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//     { withCredentials: true },
//   );

//   return response.data;
// }
