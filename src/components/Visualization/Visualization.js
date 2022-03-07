import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import getSortedGenre from '../../utils/getSortedGenre';
import { getRandomMusic, getUserGallery } from '../../api/user';
import Player2 from '../Player/Player2';
import proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isOccurError } from '../../features/error/errorSlice';

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  background-color: black;
  overflow-y: hidden;
`;

const mock = [
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

const colorList = [
  '#32a852',
  '#ff00d0',
  '#0004ff',
  '#fffb00',
  '#00fff7',
  '#bb00ff',
  '#eb0286',
  '#ff1100',
  '#6302eb',
  '#eb025b',
  '#5beb02',
  '#02eb86',
  '#eb4402',
  '#029deb',
  '#cceb02',
  '#1d164d',
  '#dbff63',
];

export const Visualization = ({ setPlayTrack }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('jwtAccessToken');
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const el = useRef();

  useEffect(async () => {
    try {
      const response = await getUserGallery(accessToken, user.email);
      const { gallery } = response.result;
      const genreObj = getSortedGenre(gallery);

      setData(genreObj);
    } catch (err) {
      dispatch(isOccurError(err.result.error));
    }
  }, [user]);

  function randomColor(items) {
    const index = Math.floor(Math.random() * items.length);
    const color = items[index];
    items.splice(index, 1);

    return color;
  }

  function createSvg() {
    return d3
      .select(el.current)
      .append('svg')
      .attr('width', '100vw')
      .attr('height', '95vh');
  }

  function drawChart(svg) {
    const leaf = svg
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('fill', () => {
        const index = Math.floor(Math.random() * colorList.length);

        return colorList[index];
      })
      .attr(
        'transform',
        (d) =>
          `translate(${d.count * 30 + Math.random() * 1000},${
            d.count * 30 + Math.random() * 500
          })`,
      )
      // .on('mouseleave', function () {
      //   console.log('마우스 오버:', this);
      //   d3.select(this)
      //     .transition()
      //     .duration(3000)
      //     .attr('transform', (d) => {
      //       console.log(d);
      //       return `translate(${Math.random() * 1000},${Math.random() * 1000})`;
      //     });
      // })
      .on('mouseenter', function () {
        d3.select(this)
          .transition()
          .duration(3000)
          .ease(d3.easeBounce)
          .attr('transform', (d) => {
            const fullWidth = document.body.clientWidth;
            const fullHeight = document.body.clientHeight;
            const circleRadius = d.count * 30;
            let moveX = circleRadius + Math.random() * 1500;
            let moveY = circleRadius + Math.random() * 800;

            if (
              moveY <= circleRadius / 2 ||
              moveY >= fullHeight - (circleRadius / 2 + 48)
            ) {
              moveY = fullHeight / 2;
            }

            if (
              moveX <= circleRadius / 2 ||
              moveX >= fullWidth - circleRadius / 2
            ) {
              moveX = fullWidth / 2;
            }
            return `translate(${moveX},${moveY})`;
          });
      });

    leaf
      .append('circle')
      .attr('r', (d) => d.count * 30)
      .attr('fill-opacity', 0.8)
      .on('mouseenter', function () {
        d3.select(this)
          .transition()
          .duration(3000)
          .ease(d3.easeBounce)
          .attr('fill-opacity', 0.1);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(3000)
          .ease(d3.easeBounce)
          .attr('fill-opacity', 0.8);
      })
      .on('click', function () {
        d3.select(this).attr('fill-opacity', async (d) => {
          try {
            const res = await getRandomMusic(accessToken, user.email, d.name);
            const { musicUrl } = res.result;

            setPlayTrack(musicUrl);
            return 0.8;
          } catch (err) {
            dispatch(isOccurError(err.result.error));
          }
        });
      });

    leaf
      .append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text((d) => d.name)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '15px')
      .attr('fill', 'white');

    leaf.append('title').text((d) => d.name);
  }

  useEffect(() => {
    if (data.length !== 0) {
      const svg = createSvg();
      drawChart(svg);
    }
  }, [data]);

  return (
    <Container>
      <div id="bubblechart" ref={el}></div>
    </Container>
  );
};

Visualization.propTypes = {
  setPlayTrack: proptypes.func,
};
