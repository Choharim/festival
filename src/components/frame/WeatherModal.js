import React from "react";
import styled, { css } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import clear from "images/clear.png";
import clouds from "images/clouds.png";
import rain from "images/rain.png";
import snow from "images/snow.png";
import thunder from "images/thunder.png";

const WeatherModal = ({ showWeather, setShowWeather, weather }) => {
  const weatherIcon = (main) => {
    if (main.includes("clear")) {
      return clear;
    } else if (main.includes("rain")) {
      return rain;
    } else if (main.includes("snow")) {
      return snow;
    } else if (main.includes("thunder")) {
      return thunder;
    } else {
      return clouds;
    }
  };

  return (
    <Bg showWeather={showWeather} onClick={() => setShowWeather(false)}>
      <ModalContainer
        showWeather={showWeather}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn onClick={() => setShowWeather(false)} />
        <Title>오늘의 날씨</Title>
        {Object.keys(weather).length !== 0 ? (
          <>
            <Img src={weatherIcon(weather.weather[0].main)} />
            <Text>{weather.name}</Text>
            <TextContainer>
              <TextBox>
                <Text>현재 온도 : {weather.main.temp} °C</Text>
                <Text>최고 온도 : {weather.main.temp_max} °C</Text>
              </TextBox>
              <TextBox>
                <Text>풍속 : {weather.wind.speed} m/s</Text>
                <Text>최저 온도 : {weather.main.temp_min} °C</Text>
              </TextBox>
            </TextContainer>
          </>
        ) : (
          <Text>위치를 켜주세요!</Text>
        )}
      </ModalContainer>
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
  transition: 0.4s ease;
  ${(props) =>
    props.showWeather &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  height: 400px;
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
    props.showWeather &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const CloseBtn = styled(AiOutlineClose)`
  align-self: flex-end;
  font-size: 23px;
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 35px;
`;

const Img = styled.img`
  width: 40%;
  height: 40%;
  margin: 20px 0;
`;

const Text = styled.span`
  font-size: 23px;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
