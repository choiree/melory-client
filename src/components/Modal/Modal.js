import React from 'react';
import styled from 'styled-components';
import proptypes from 'prop-types';

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  width: 550px;
  height: 550px;
  max-width: 550px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  display: flex;
`;

export const Modal = ({ onClose, children }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <ModalOverlay />
      <ModalWrapper onClick={onMaskClick} tabIndex={-1}>
        <ModalInner tabIndex={0} className="modal-inner">
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

Modal.propTypes = {
  onClose: proptypes.func,
  children: proptypes.node,
};

export default Modal;
