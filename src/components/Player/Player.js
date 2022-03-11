import React, { useEffect, useState } from 'react';
import proptypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  const [play, setplay] = useState(false);

  useEffect(() => {
    setplay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIconur
      callback={(state) => {
        if (!state.isPlaying) setplay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: 'red',
        bgColor: 'black',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#4248ff',
        sliderHandleColor: '#fff',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  );
}

Player.propTypes = {
  accessToken: proptypes.string,
  trackUri: proptypes.string,
};
