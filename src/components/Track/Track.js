import React, { useState } from 'react';
import styled from 'styled-components';
import proptypes from 'prop-types';

const Music = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  width: 500px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 10px;
  cursor: pointer;

  img {
    margin-right: 12px;
  }

  input {
    position: absolute;
    right: 10px;
  }

  .artist {
    margin-top: 5px;
    font-size: 13px;
    color: #c4c4c4;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const Track = ({ track, chooseTrack, setSelectedMusic }) => {
  const handleClickTrack = () => {
    chooseTrack(track);
  };

  const handleChecked = () => {
    setSelectedMusic(track);
  };

  return (
    <Music key={track.uri} data-track={track} onClick={handleClickTrack}>
      <img src={track.album.images[2].url} />
      <div>
        <div>{track.name}</div>
        <div className="artist">{track.artists[0].name}</div>
      </div>
      <input
        type="radio"
        id={track.uri}
        name="music"
        onChange={handleChecked}
      ></input>
    </Music>
  );
};

Track.propTypes = {
  track: proptypes.object,
  chooseTrack: proptypes.func,
  setSelectedMusic: proptypes.func,
};
