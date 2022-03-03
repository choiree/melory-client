import React, { useEffect, useState } from 'react';
import proptypes from 'prop-types';
import styled from 'styled-components';
import { getRecommended, pause } from '../../api/spotify';
import { Player } from '../Player/Player';
import { Track } from '../Track/Track';
import Player2 from '../Player/Player2';
import { savePhoto } from '../../api/user';
import { useSelector } from 'react-redux';

const MusicBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1e1e;
  position: absolute;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const MusicSelection = ({ genres, imageUrl, setImageUrl }) => {
  const { genre, valence } = genres;
  const spotifyAccessToken = localStorage.getItem('spotiAccesstoken');
  const accessToken = localStorage.getItem('jwtAccessToken');
  const loginUser = useSelector((state) => state.user);

  const [playList, setPlaylist] = useState([]);
  const [playTrack, setplayTrack] = useState(playList[0]);
  const [selectedMusic, setSelectedMusic] = useState();

  function chooseTrack(track) {
    setplayTrack(track);
  }

  useEffect(() => {
    const getPlaylist = async () => {
      const response = await getRecommended(spotifyAccessToken, genre, valence);

      setPlaylist(response.tracks);
    };

    getPlaylist();

    return () => getPlaylist;
  }, []);

  return (
    <>
      <MusicBackground>
        <button
          onClick={async () => {
            const photoInfo = {
              type: 'Photo',
              imageUrl,
              musicUrl: selectedMusic.uri,
              artist: selectedMusic.artists[0].name,
              album: selectedMusic.album.images[2].url,
              title: selectedMusic.name,
              genre,
            };

            await savePhoto(accessToken, loginUser.email, photoInfo);
            setImageUrl(null);
          }}
          disabled={selectedMusic ? false : true}
        >
          저장
        </button>
        {playList &&
          playList.map((list) => (
            <Track
              key={list.uri}
              track={list}
              chooseTrack={chooseTrack}
              setSelectedMusic={setSelectedMusic}
            />
          ))}
      </MusicBackground>

      <Player2 accessToken={spotifyAccessToken} trackUri={playTrack?.uri} />
    </>
  );
};

MusicSelection.propTypes = {
  genres: proptypes.object,
  imageUrl: proptypes.string,
  setImageUrl: proptypes.func,
};
