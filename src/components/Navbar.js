import React from "react";
import styled from "styled-components";
import { BiCalendarHeart } from "react-icons/bi";
import { FaCloudRain } from "react-icons/fa";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>어디갈까?</Logo>
      <div>
        <WeatherIcon />
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

const WeatherIcon = styled(FaCloudRain)`
  font-size: 23px;
  margin-right: 20px;
`;
const FavIcon = styled(BiCalendarHeart)`
  font-size: 23px;
`;
