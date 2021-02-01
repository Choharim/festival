import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Roulette = ({ festivals }) => {
  const randomNumber = Math.floor(Math.random() * festivals.length);
  const [rouletteArray, setRouletteArray] = useState(festivals);

  useEffect(() => {
    setRouletteArray([...rouletteArray, rouletteArray[randomNumber]]);
  }, []);

  const settings = {
    autoplay: true,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    centerPadding: "10px",
    draggable: false,
    infinite: false,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    vertical: true,
    speed: 100,
    autoplaySpeed: 100,
  };

  return (
    <RouletteContainer>
      <Text>오늘은</Text>
      <Slider {...settings}></Slider>
      <Text>어때요?</Text>
    </RouletteContainer>
  );
};

export default Roulette;

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  font-size: 23px;
`;
