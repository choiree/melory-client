import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Spinner = styled.div`
  --animation-duration: 1000ms;

  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 48%;
  left: 48%;

  .spinner-item {
    width: calc(75px / 12);
    height: 80%;
    background: var(--clr-spinner);
    animation: spinner1 var(--animation-duration) ease-in-out infinite;

    @keyframes spinner1 {
      50% {
        transform: scaleY(0.25);
      }
    }
  }

  .spinner-item:nth-child(1) {
    --clr-spinner: #4248ff;
    animation-delay: calc(var(--animation-duration) / 10 * -3);
  }

  .spinner-item:nth-child(2) {
    --clr-spinner: #0008ff;
    animation-delay: calc(var(--animation-duration) / 10 * -1);
  }

  .spinner-item:nth-child(3) {
    --clr-spinner: #babcff;
    animation-delay: calc(var(--animation-duration) / 10 * -2);
  }

  .spinner-item:nth-child(4) {
    --clr-spinner: #4248ff;
    animation-delay: calc(var(--animation-duration) / 10 * -1);
  }

  .spinner-item:nth-child(5) {
    --clr-spinner: #babcff;
    animation-delay: calc(var(--animation-duration) / 10 * -3);
  }
`;

export const Loading = () => {
  return (
    <Container>
      <Spinner className="spinner">
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
      </Spinner>
    </Container>
  );
};
