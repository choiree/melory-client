import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import proptypes from 'prop-types';
import { playTrack } from '../../api/spotify';

const Playercontainer = styled.div`
  width: 100vw;
  height: 90px;
  background-color: black;
  position: fixed;
  bottom: 0;

  .main-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Player = ({ track }) => {
  const token = localStorage.getItem('spotiAccesstoken');
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  // const [track, setTrack] = useState(track);
  const [divice, setDivice] = useState(undefined);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDivice(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }
        console.log('😈', state, state.track_window);
        // setTrack(state.track_window.track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  }, []);

  return (
    <Playercontainer>
      <div className="main-wrapper">
        <img
          src={track?.album.images[2].url}
          className="now-playing__cover"
          alt="Track image"
        />

        <div className="now-playing__side">
          <div className="now-playing__name">{track?.name}</div>
          <div className="now-playing__artist">{track?.artists[0].name}</div>
        </div>
        <button
          className="btn-spotify"
          onClick={() => {
            player.previousTrack();
          }}
        >
          &lt;&lt;
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            // playTrack(token, divice, track.uri);
            player.togglePlay();
          }}
        >
          {is_paused ? 'PLAY' : 'PAUSE'}
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.nextTrack();
          }}
        >
          &gt;&gt;
        </button>
      </div>
    </Playercontainer>
  );
};

Player.propTypes = {
  track: proptypes.object,
};
