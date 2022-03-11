import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import getSortedGenre from '../../utils/getSortedGenre';
import { getRandomMusic, getUserGallery } from '../../api/user';
import proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isOccurError } from '../../features/error/errorSlice';
import { COLORLIST } from '../../constants';

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  background-color: black;
  overflow-y: hidden;

  svg {
    cursor: pointer;
  }
`;

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
        const index = Math.floor(Math.random() * COLORLIST.length);

        return COLORLIST[index];
      })
      .attr(
        'transform',
        (d) =>
          `translate(${d.count * 30 + Math.random() * 1200},${
            d.count * 30 + Math.random() * 600
          })`,
      )
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
      .attr('r', (d) => {
        if (d.count === 1) {
          return d.count * 30;
        }

        return d.count * 16;
      })
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
