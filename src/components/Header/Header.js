import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 22;

  .logo {
    margin-bottom: -5px;
    cursor: pointer;
  }

  .logo2 {
    margin-left: 3px;
    width: 28px;
  }

  .logo3 {
    margin-bottom: -6px;
  }

  .menu {
    width: 30px;
    cursor: pointer;
  }
`;

const openMenu = keyframes`
  0%{width:0vw; height:0vh; border-radius: 50% 0 50% 50%;}
  50%{border-radius: 30% 0 30% 30%;}
  100%{width:100vw; height:100vh; border-radius: 0;}
`;

const Menu = styled.div`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  right: 0;
  z-index: 21;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Archivo Black', sans-serif;
  animation: ${openMenu} 0.4s ease;

  div,
  a {
    font-size: 50px;
    margin: 12px 0;
    cursor: pointer;
    position: relative;
    display: block;
    padding: 4px 0;
    color: #ecf0f1;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;

    &::after {
      position: absolute;
      content: '';
      top: 100%;
      left: 0;
      width: 100%;
      height: 3px;
      background: #4248ff;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s;
    }

    &:hover {
      color: #9e9fb5;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <div
          className="logo"
          onClick={() => {
            navigate('/');
            setMenuToggle(false);
          }}
        >
          <img src="/images/logo1.png" className="logo1" />
          <img src="/images/logo2.png" className="logo2" />
          <img src="/images/logo3.png" className="logo3" />
        </div>
        <img
          src="/images/menu.jpeg"
          className="menu"
          onClick={() => {
            setMenuToggle((state) => !state);
          }}
        />
      </HeaderWrapper>
      {menuToggle && (
        <Menu>
          <div
            onClick={() => {
              navigate('/');
              setMenuToggle(false);
            }}
          >
            Home
          </div>
          <div
            onClick={() => {
              navigate('/gallery');
              setMenuToggle(false);
            }}
          >
            Gallery
          </div>
          <div
            onClick={() => {
              navigate('/visualization');
              setMenuToggle(false);
            }}
          >
            Visualization
          </div>
          <a href="electron-fiddle://open">APPLICATION</a>
          <div
            onClick={() => {
              window.localStorage.clear();
              navigate('/login');
              setMenuToggle(false);
            }}
          >
            Logout
          </div>
        </Menu>
      )}
    </>
  );
};
