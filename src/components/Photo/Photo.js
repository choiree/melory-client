import React, { useState } from 'react';
import proptypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { deletePhoto, getUserGallery } from '../../api/user';
import { isOccurError } from '../../features/error/errorSlice';
import { useDispatch } from 'react-redux';

const PhotoCatainer = styled.div`
  line-height: 250px;
  height: 250px;
  font-size: 105px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  margin: 7px;
  position: relative;
  cursor: pointer;

  img {
    width: 210px;
    object-fit: contain;
  }

  .modal-photo {
    width: 550px;
  }
`;

const HoverPhoto = styled.div`
  width: 210px;
  height: 250px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #000;
  line-height: 18px;

  img {
    margin: 13px 0;
    width: 150px;
    object-fit: contain;
  }

  .title {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fa-caret-right {
    font-size: 70px;
    position: absolute;
    color: #fff;
    top: 70px;
  }

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 13px;
    color: white;
    border: none;
    border-radius: 3px;
    background-color: rgba(255, 13, 0, 0.7);
    cursor: pointer;
  }
`;

export const Photo = ({ info, playTrack, setGallery }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('jwtAccessToken');
  const user = useSelector((state) => state.user);
  const [isHovering, setIsHovering] = useState(false);
  const [idModalOpen, setIsModalOpen] = useState(false);

  const handleClickPhoto = () => {
    setIsModalOpen(true);
    setIsHovering(false);
  };

  const handleClickPlayBtn = (e) => {
    e.stopPropagation();
    playTrack(e.target.dataset.url);
  };

  const handleClickDeleteBtn = async (e) => {
    e.stopPropagation();
    try {
      await deletePhoto(accessToken, user.email, info._id);
      const response = await getUserGallery(accessToken, user.email);
      const { gallery } = response.result;

      setGallery(gallery);
    } catch (err) {
      dispatch(isOccurError(err.result.error));
    }
  };

  return info.type === 'Photo' ? (
    <PhotoCatainer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={info.imageUrl} alt="photo" />
      {isHovering && (
        <HoverPhoto onClick={handleClickPhoto}>
          <img src={info.album} />
          <div className="title">{info.title}</div>
          <div>{info.artist}</div>
          <i
            className="fas fa-solid fa-caret-right"
            onClick={handleClickPlayBtn}
            data-url={info.musicUrl}
          />
          <button onClick={handleClickDeleteBtn}>삭제</button>
        </HoverPhoto>
      )}
      {idModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <img src={info.imageUrl} alt="photo" className="modal-photo" />
        </Modal>
      )}
    </PhotoCatainer>
  ) : (
    <PhotoCatainer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {info.imageUrl}
      {isHovering && (
        <HoverPhoto>
          <img src={info.album} />
          <div className="title">{info.title}</div>
          <div>{info.artist}</div>
          <i
            className="fas fa-solid fa-caret-right"
            onClick={handleClickPlayBtn}
            data-url={info.musicUrl}
          />
          <button onClick={handleClickDeleteBtn}>삭제</button>
        </HoverPhoto>
      )}
    </PhotoCatainer>
  );
};

Photo.propTypes = {
  info: proptypes.object,
  playTrack: proptypes.func,
  setGallery: proptypes.func,
};
