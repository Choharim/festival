import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { FaCloudRain, FaCloud, FaRegSnowflake, FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { IoIosThunderstorm } from "react-icons/io";

const Navbar = () => {
  const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;

  const [showNav, setShowNav] = useState(false);
  const [weather, setWeather] = useState("");
  const [weatherLoading, setWeatherLoading] = useState(false);

  const getWeather = async (lat, lon) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
    )
      .then((resp) => resp.json())
      .then((res) => {
        setWeather(res.weather[0].description);
        setWeatherLoading(true);
      });
  };

  useEffect(() => {
    const getGeolocation = async () => {
      await navigator.geolocation.getCurrentPosition(
        (data) => getWeather(data.coords.latitude, data.coords.longitude),
        () => console.log("error")
      );
    };

    getGeolocation();
  }, []);

  const weatherIcon = () => {
    if (weatherLoading) {
      if (weather.includes("clear")) {
        return <Sun />;
      } else if (weather.includes("rain")) {
        return <Rain />;
      } else if (weather.includes("clouds") || weather.includes("mist")) {
        return <Cloud />;
      } else if (weather.includes("snow")) {
        return <Snow />;
      } else {
        return <Thunder />;
      }
    } else {
      return <Weather>위치를 켜주세요</Weather>;
    }
  };

  return (
    <>
      <NavbarContainer>
        <Logo>어디갈까?</Logo>
        <NavBar onClick={() => setShowNav(true)} />
      </NavbarContainer>
      <NavBarBox showNav={showNav}>
        <CloseBtn onClick={() => setShowNav(false)} />
        <UrlBox>
          <Link to="/">홈</Link>
          <Link to="/festivals">어디갈까, 축제</Link>
          <Link to="/bookMark">가고싶은, 축제</Link>
          <Link to="/logIn">로그인</Link>
        </UrlBox>
        <WeatherBox>
          {weatherLoading && <Weather>오늘의 날씨</Weather>}
          {weatherIcon()}
        </WeatherBox>
      </NavBarBox>
    </>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: calc(100% - 40px);
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const Logo = styled.span`
  font-family: "Stylish", sans-serif;
  font-size: 23px;
`;

const NavBar = styled(FaBars)`
  font-size: 23px;
  margin-right: 20px;
  cursor: pointer;
`;

const NavBarBox = styled.div`
  position: fixed;
  top: 0;
  right: -300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: calc(100% - 40px);
  padding: 20px;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease;
  ${(props) =>
    props.showNav &&
    css`
      right: 0;
      visibility: visible;
      opacity: 1;
    `}
  z-index: 100;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 23px;
  > div,
  span {
    font-family: "Stylish", sans-serif;
  }
`;

const CloseBtn = styled(AiOutlineClose)`
  align-self: flex-end;
`;

const UrlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 180px;
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Weather = styled.span`
  margin-right: 10px;
`;

const Rain = styled(FaCloudRain)`
  margin-right: 20px;
  color: #37a7d8;
`;

const Cloud = styled(FaCloud)`
  margin-right: 20px;
  color: #3656b2;
`;

const Snow = styled(FaRegSnowflake)`
  margin-right: 20px;
  color: #e1e7f6;
`;

const Thunder = styled(IoIosThunderstorm)`
  margin-right: 20px;
  color: #78787a;
`;

const Sun = styled(FiSun)`
  font-size: 23px;
  margin-right: 20px;
  color: #f63838;
`;
