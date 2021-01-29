import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiCalendarHeart } from "react-icons/bi";
import { FaCloudRain, FaCloud, FaRegSnowflake } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { IoIosThunderstorm } from "react-icons/io";

const Navbar = () => {
  const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
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
    }
  };

  return (
    <NavbarContainer>
      <Logo>어디갈까?</Logo>
      <div>
        {weatherIcon()}
        <FavIcon />
      </div>
    </NavbarContainer>
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

const Rain = styled(FaCloudRain)`
  font-size: 23px;
  margin-right: 20px;
  color: #37a7d8;
`;

const Cloud = styled(FaCloud)`
  font-size: 23px;
  margin-right: 20px;
  color: #3656b2;
`;

const Snow = styled(FaRegSnowflake)`
  font-size: 23px;
  margin-right: 20px;
  color: #e1e7f6;
`;

const Thunder = styled(IoIosThunderstorm)`
  font-size: 23px;
  margin-right: 20px;
  color: #78787a;
`;

const Sun = styled(FiSun)`
  font-size: 23px;
  margin-right: 20px;
  color: #f63838;
`;

const FavIcon = styled(BiCalendarHeart)`
  font-size: 23px;
`;
