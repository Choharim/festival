import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import WeatherModal from "./WeatherModal";
import styled, { css } from "styled-components";
import { FaCloudRain, FaCloud, FaRegSnowflake, FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { IoIosThunderstorm } from "react-icons/io";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import CheckLogOut from "./CheckLogOut";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [weather, setWeather] = useState({});
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [checkLogOut, setCheckLogOut] = useState(false);
  const history = useHistory();
  const { LogInStore } = useStore();

  useEffect(() => {
    const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;

    const getWeather = async (lat, lon) => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((res) => {
          setWeather(res);
          setWeatherLoading(true);
        });
    };
    const getGeolocation = async () => {
      await navigator.geolocation.getCurrentPosition(
        (data) => {
          getWeather(data.coords.latitude, data.coords.longitude);
        },
        () => console.log("error")
      );
    };

    getGeolocation();
  }, []);

  const weatherIcon = () => {
    if (weatherLoading) {
      if (weather.weather[0].main.includes("clear")) {
        return <Sun />;
      } else if (weather.weather[0].main.includes("rain")) {
        return <Rain />;
      } else if (weather.weather[0].main.includes("snow")) {
        return <Snow />;
      } else if (weather.weather[0].main.includes("thunderstorm")) {
        return <Thunder />;
      } else {
        return <Cloud />;
      }
    } else {
      return <Weather>위치를 켜주세요!</Weather>;
    }
  };

  return useObserver(() => (
    <>
      <NavbarContainer>
        <Logo onClick={() => history.push("/")}>어디갈까?</Logo>
        <WeatherBox>
          <Weather
            onClick={() => {
              setShowWeather(true);
              setShowNav(false);
            }}
          >
            오늘의 날씨
          </Weather>
          <NavBar onClick={() => setShowNav(true)} />
        </WeatherBox>
      </NavbarContainer>
      <NavBarBox showNav={showNav}>
        <CloseBtn onClick={() => setShowNav(false)} />
        <UrlBox>
          <Url to="/">홈</Url>
          <Url to="/festivals">어디갈까, 축제</Url>
          <Url to="/favorite">가고싶은, 축제</Url>
          {LogInStore.logInSuccess ? (
            <LogOutBtn onClick={() => setCheckLogOut(true)}>로그아웃</LogOutBtn>
          ) : (
            <Url to="/logIn">로그인</Url>
          )}
        </UrlBox>
        <WeatherBox>
          {weatherLoading && (
            <Weather
              onClick={() => {
                setShowNav(false);
                setShowWeather(true);
              }}
            >
              오늘의 날씨
            </Weather>
          )}
          {weatherIcon()}
        </WeatherBox>
      </NavBarBox>
      <WeatherModal
        setShowWeather={setShowWeather}
        showWeather={showWeather}
        weather={weather}
      />
      <CheckLogOut
        visible={checkLogOut}
        setCheckLogOut={setCheckLogOut}
        checkLogOut={checkLogOut}
      />
    </>
  ));
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: calc(100% - 40px);
  padding: 20px;
  font-size: 23px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const Logo = styled.span`
  font-family: "Stylish", sans-serif;
  cursor: pointer;
`;

const NavBar = styled(FaBars)`
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
  width: calc(300px - 40px);
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

const Url = styled(Link)`
  font-family: "Stylish", sans-serif;
`;

const LogOutBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-family: "Stylish", sans-serif;
  font-size: 23px;
  cursor: pointer;
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Weather = styled.span`
  margin-right: 15px;
  font-size: 18px;
  cursor: pointer;
  font-family: "Stylish", sans-serif;
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
