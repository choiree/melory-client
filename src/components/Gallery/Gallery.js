import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUserGallery } from '../../api/user';
import Playe2 from '../../components/Player/Player2';
import { Photo } from '../Photo/Photo';

const GalleryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1e1e;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  padding: 100px 0 55px 0;

  .player {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
`;

const Photos = styled.div`
  width: 900px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
`;

export const Gallery = () => {
  const accessToken = localStorage.getItem('jwtAccessToken');
  const spotifyAccessToken = localStorage.getItem('spotiAccesstoken');
  const loginUser = useSelector((state) => state.user);
  const [gallery, setGallery] = useState();
  const [playTrack, setplayTrack] = useState(null);

  useEffect(async () => {
    const response = await getUserGallery(accessToken, loginUser.email);
    const { gallery } = response.result;

    setGallery(gallery);
  }, []);

  return (
    <GalleryContainer>
      <Photos>
        {gallery?.map((photo) => {
          return (
            <Photo
              info={photo}
              key={photo._id}
              playTrack={setplayTrack}
              setGallery={setGallery}
            />
          );
        })}
      </Photos>
      <div className="player">
        <Playe2 accessToken={spotifyAccessToken} trackUri={playTrack} />
      </div>
    </GalleryContainer>
  );
};
