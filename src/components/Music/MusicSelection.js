import React, { useEffect, useState } from 'react';
import proptypes from 'prop-types';
import styled from 'styled-components';
import { getRecommended, pause } from '../../api/spotify';
import { Player } from '../Player/Player';
import { Track } from '../Track/Track';
import Player2 from '../Player/Player2';
import { savePhoto } from '../../api/user';
import { useSelector } from 'react-redux';
import { Loading } from '../Loading/Loading';

const MusicBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1e1e;
  position: fixed;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      cursor: auto;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const MusicSelection = ({
  genres,
  imageUrl,
  s3Key,
  closeMusicSelection,
  setSelectEmoji,
  setSelectEmoji2,
}) => {
  const { genre, valence } = genres;
  const spotifyAccessToken = localStorage.getItem('spotiAccesstoken');
  const accessToken = localStorage.getItem('jwtAccessToken');
  const loginUser = useSelector((state) => state.user);
  const type = imageUrl.length > 20 ? 'Photo' : 'Emoji';

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

  const saveMusic = async () => {
    const photoInfo = {
      type,
      imageUrl,
      s3Key,
      musicUrl: selectedMusic.uri,
      artist: selectedMusic.artists[0].name,
      album: selectedMusic.album.images[1].url,
      title: selectedMusic.name,
      genre,
    };

    await savePhoto(accessToken, loginUser.email, photoInfo);
    closeMusicSelection(null);
    setSelectEmoji(null);
    setSelectEmoji2(null);
  };

  return (
    <>
      {!playList?.length ? (
        <Loading />
      ) : (
        <>
          <MusicBackground>
            <button onClick={saveMusic} disabled={selectedMusic ? false : true}>
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
      )}
    </>
  );
};

MusicSelection.propTypes = {
  genres: proptypes.object.isRequired,
  imageUrl: proptypes.string.isRequired,
  closeMusicSelection: proptypes.func.isRequired,
  s3Key: proptypes.string,
  setSelectEmoji: proptypes.func,
  setSelectEmoji2: proptypes.func,
};
