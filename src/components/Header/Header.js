import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 2;

  .logo {
    width: 120px;
  }

  .menu {
    width: 30px;
    cursor: pointer;
  }
`;
const Menu = styled.div`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Archivo Black', sans-serif;

  div {
    font-size: 50px;
    font-weight: bold;
    color: white;
    margin: 10px 0;
    cursor: pointer;
  }
`;

export const Header = () => {
  const navigate = useNavigate();
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <img src="/images/melory-logo.png" className="logo" />
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
