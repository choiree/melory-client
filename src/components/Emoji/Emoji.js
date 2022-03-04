import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MusicSelection } from '../Music/MusicSelection';

const EmojiContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffcd48;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;

  .emojiBoxs {
    display: flex;
    justify-content: center;
  }
`;

const SearchBtn = styled.button`
  margin: 15px 0 8%;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 7px 12px;
  font-size: 16px;
  color: #f0ae02;
  cursor: pointer;

  &:disabled {
    cursor: auto;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SelectedEmojiBox = styled.div`
  width: 350px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  font-size: 150px;
  cursor: pointer;

  i {
    font-size: 100px;
    color: #ffcd48;
  }
`;

const EmojiSlide = styled.div`
  width: 100vw;
  height: 170px;
  background-color: rgba(255, 255, 255, 0.3);
  overflow-x: scroll;
  overflow-y: hidden;
`;

const EmojiBox = styled.div`
  width: 6290px;

  div {
    width: 170px;
    line-height: 170px;
    font-size: 100px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
`;

export const Emoji = () => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const [selectEmoji, setSelectEmoji] = useState(null);
  const [selectEmoji2, setSelectEmoji2] = useState(null);
  const [emojiList, setEmojiList] = useState([]);
  const [openMusicSelection, setOpenMusicSelection] = useState(false);

  const onDragStart = (e) => {
    console.log('드래그 시작');

    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    console.log('드래그 끝');
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      console.log('scrollWidth', scrollWidth, scrollLeft);
      console.log(
        'clientWidth',
        clientWidth + scrollLeft,
        e.pageX,
        startX - e.pageX,
      );

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        console.log('scrollLeft 가 0일때', e.pageX);
        setStartX(e.pageX);
      } else if (scrollWidth === clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  useEffect(async () => {
    const res = await fetch('/Emoji.json');
    const emojis = await res.json();

    setEmojiList(emojis);
  }, []);

  const handleEmojiClick = (e) => {
    if ((!selectEmoji && selectEmoji2) || (!selectEmoji && !selectEmoji2)) {
      return setSelectEmoji([
        e.target.innerText,
        e.target.dataset.genre,
        e.target.dataset.valence,
      ]);
    }

    if (selectEmoji && !selectEmoji2) {
      return setSelectEmoji2([
        e.target.innerText,
        e.target.dataset.genre,
        e.target.dataset.valence,
      ]);
    }
  };

  return (
    <EmojiContainer>
      <div className="emojiBoxs">
        <SelectedEmojiBox>
          {selectEmoji ? (
            <div
              onClick={() => {
                setSelectEmoji(null);
              }}
            >
              {selectEmoji[0]}
            </div>
          ) : (
            <i className="fas fa-solid fa-plus" />
          )}
        </SelectedEmojiBox>
        <SelectedEmojiBox>
          {selectEmoji2 ? (
            <div
              onClick={() => {
                setSelectEmoji2(null);
              }}
            >
              {selectEmoji2[0]}
            </div>
          ) : (
            <i className="fas fa-solid fa-plus" />
          )}
        </SelectedEmojiBox>
      </div>
      <SearchBtn
        disabled={selectEmoji && selectEmoji2 ? false : true}
        onClick={() => {
          setOpenMusicSelection(true);
        }}
      >
        Search
      </SearchBtn>
      <EmojiSlide
        ref={scrollRef}
        // onMouseDown={onDragStart}
        // onMouseMove={onDragMove}
        // onMouseUp={onDragEnd}
        // onMouseLeave={onDragEnd}
      >
        <EmojiBox>
          {emojiList.map((emoji) => {
            return (
              <div
                key={emoji.content}
                onClick={handleEmojiClick}
                data-genre={emoji.genre}
                data-valence={emoji.valence}
              >
                {emoji.content}
              </div>
            );
          })}
        </EmojiBox>
      </EmojiSlide>
      {openMusicSelection && (
        <MusicSelection
          genres={{
            genre: [selectEmoji[1], selectEmoji2[1]],
            valence: (+selectEmoji[2] + +selectEmoji2[2]) / 2,
          }}
          imageUrl={selectEmoji[0] + selectEmoji2[0]}
          s3Key={null}
          closeMusicSelection={setOpenMusicSelection}
          setSelectEmoji={setSelectEmoji}
          setSelectEmoji2={setSelectEmoji2}
        />
      )}
    </EmojiContainer>
  );
};
