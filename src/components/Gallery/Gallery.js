import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import proptypes from 'prop-types';
import { getUserGallery } from '../../api/user';
import { Photo } from '../Photo/Photo';
import { useDispatch } from 'react-redux';
import { isOccurError } from '../../features/error/errorSlice';

const GalleryContainer = styled.div`
  width: 100vw;
  height: 95vh;
  background-color: #1e1e1e;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  padding: 100px 0 0;

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

export const Gallery = ({ setPlayTrack }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('jwtAccessToken');
  const user = useSelector((state) => state.user);
  const [gallery, setGallery] = useState();

  useEffect(async () => {
    try {
      const response = await getUserGallery(accessToken, user.email);
      const { gallery } = response.result;

      setGallery(gallery);
    } catch (err) {
      dispatch(isOccurError(err.result.error));
    }
  }, [user]);

  return (
    <GalleryContainer>
      <Photos>
        {gallery?.map((photo) => {
          return (
            <Photo
              info={photo}
              key={photo._id}
              playTrack={setPlayTrack}
              setGallery={setGallery}
            />
          );
        })}
      </Photos>
    </GalleryContainer>
  );
};

Gallery.propTypes = {
  setPlayTrack: proptypes.func,
};
