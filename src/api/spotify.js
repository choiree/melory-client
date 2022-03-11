import axios from 'axios';

export async function getRecommended(token, genre, valence) {
  if (genre.length === 1) {
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=8&market=KR&seed_genres=${genre[0]}&target_valence=${valence}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  const response = await axios.get(
    `https://api.spotify.com/v1/recommendations?limit=8&market=KR&seed_genres=${genre[0]}%2C${genre[1]}&target_valence=${valence}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function getDevices(token) {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/player/devices`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
}

export async function getPlaybackState(token) {
  const response = await axios.get(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}

export async function pause(token, deviceId) {
  const response = await axios.put(
    `https://api.spotify.com/v1/me/player/pause`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
}

export async function play(token, deviceId, trackUri) {
  const response = await axios.put(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}}`,
    {
      context_uri: trackUri,
      offset: {
        position: 5,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
}
