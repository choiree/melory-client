import React, { useEffect, useState } from 'react';
import proptypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player2({ accessToken, trackUri }) {
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
    />
  );
}

Player2.propTypes = {
  accessToken: proptypes.string,
  trackUri: proptypes.string,
};
