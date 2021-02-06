import React from "react";
import styled, { css } from "styled-components";

const Modal = ({ visible, closeModal, children, ...props }) => {
  return (
    <Bg {...props} visible={visible} onClick={closeModal}>
      <ModalContainer visible={visible} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Bg>
  );
};

export default Modal;

const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  z-index: 90;
  transition: 0.4s ease;
  cursor: pointer;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: 0.4s ease;
  > div {
    transition: 0.4s ease;
  }

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;
