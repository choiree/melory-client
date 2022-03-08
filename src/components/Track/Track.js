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
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ButtonBox = styled.div`
  width: 110px;
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    &:hover {
      background-color: #3c00ff;
    }
  }
`;

export const Track = ({ track, chooseTrack, saveMusic }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClickTrack = (e) => {
    e.stopPropagation();
    chooseTrack(track);
  };

  return (
    <Music
      key={track.uri}
      data-track={track}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={track.album.images[2].url} />
      <div>
        <div>{track.name}</div>
        <div className="artist">{track.artists[0].name}</div>
      </div>
      {isHovering && (
        <ButtonBox>
          <button
            className="btn"
            onClick={() => {
              saveMusic(track);
            }}
          >
            저장
          </button>
          <button className="btn" onClick={handleClickTrack}>
            재생
          </button>
        </ButtonBox>
      )}
    </Music>
  );
};

Track.propTypes = {
  track: proptypes.object,
  chooseTrack: proptypes.func,
  saveMusic: proptypes.func,
};
