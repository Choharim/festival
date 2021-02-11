import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import clear from "images/clear.png";
import clouds from "images/clouds.png";
import rain from "images/rain.png";
import snow from "images/snow.png";
import thunder from "images/thunder.png";
import Modal from "components/Modal";

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
    <Modal visible={showWeather} closeModal={() => setShowWeather(false)}>
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
    </Modal>
  );
};

export default WeatherModal;

const CloseBtn = styled(AiOutlineClose)`
  align-self: flex-end;
  font-size: 23px;
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 35px;
  font-family: "Stylish", sans-serif;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

const Text = styled.span`
  font-size: 18px;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 360px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
