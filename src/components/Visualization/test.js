import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { select } from 'd3';
import { getUserGallery } from '../../api/user';
import { useSelector } from 'react-redux';
import getSortedGenre from '../../utils/getSortedGenre';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const test = () => {
  let mock = [
    { name: 'r-n-b', count: 9 },
    { name: 'summer', count: 1 },
    { name: 'sad', count: 2 },
    { name: 'movies', count: 3 },
    { name: 'party', count: 1 },
    { name: 'children', count: 1 },
    { name: 'hip-hop', count: 1 },
    { name: 'study', count: 1 },
    { name: 'happy', count: 3 },
    { name: 'sleep', count: 1 },
    { name: 'electronic', count: 1 },
    { name: 'acoustic', count: 1 },
    { name: 'romance', count: 1 },
    { name: 'rainy-day', count: 1 },
  ];
  const accessToken = localStorage.getItem('jwtAccessToken');
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(mock);
  const svgRef = useRef(null);

  // useEffect(async () => {
  //   const response = await getUserGallery(accessToken, user.email);
  //   const { gallery } = response.result;
  //   const genreObj = getSortedGenre(gallery);

  //   setData(genreObj);
  // }, []);

  useEffect(() => {
    const svg = select(svgRef.current);

    svg
      .attr('width', '80%')
      .attr('height', '80%')
      .selectAll('circle') //circle로 그리겠다
      .data(data) //data 전달
      .join(
        (enter) => enter.append('circle').attr('class', 'new'),
        (update) => update.attr('class', 'update'), //업데이트 시 클래스가 업데이트 된다
        (exit) => exit.remove(),
      ) //join으로 요소를 생성
      .attr('r', (value) => +value.count * 10) //radius 를 추가한다
      .attr('cx', () => Math.random() * 500) //x좌표
      .attr('cy', () => Math.random() * 600) //y좌표
      .attr('stroke', 'red')
      .append('text')
      .text((d) => d.name)
      .attr('class', 'name')
      .attr('fill', 'white');
  }, [data]);

  return (
    <Container>
      <svg ref={svgRef} />
      <button
        onClick={() => {
          setData(data.map((el) => +el.count + 5));
        }}
      >
        increse + 5
      </button>
      <button
        onClick={() => {
          setData(data.filter((el) => +el.count > 100));
        }}
      >
        filter circle r should gt 35
      </button>
    </Container>
  );
};
