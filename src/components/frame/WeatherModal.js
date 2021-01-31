import React from "react";
import styled, { css } from "styled-components";

const WeatherModal = ({ showWeather, setShowWeather, weather }) => {
  return (
    <Bg showWeather={showWeather} onClick={() => setShowWeather(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>hi</ModalContainer>
    </Bg>
  );
};

export default WeatherModal;

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
  transition: 0.5s ease;
  ${(props) =>
    props.showWeather &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  z-index: 100;
  opacity: 1;
  visibility: visible;
  transition: 0.2s ease;
  > div {
    transition: 0.2s ease;
  }
`;
