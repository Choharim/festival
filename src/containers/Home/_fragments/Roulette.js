import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Roulette = ({ festivals }) => {
  const randomNumber = Math.floor(Math.random() * festivals.length);
  const [rouletteArray, setRouletteArray] = useState(festivals);
  const [stop, setStop] = useState(true);

  const startRoulette = () => {
    setRouletteArray([...festivals, festivals[randomNumber]]);
  };

  useEffect(() => {
    startRoulette();
  }, []);

  const settings = {
    initialSlide: -1,
    autoplay: true,
    dots: false,
    infinite: stop,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    speed: 100,
    autoplaySpeed: 100,
    afterChange: (slide) =>
      slide === rouletteArray.length - 1 && setStop(false),
  };

  return (
    <RouletteContainer>
      <Text>오늘은</Text>
      {rouletteArray.length === festivals.length + 1 && (
        <Slider {...settings}>
          {rouletteArray.map((each, index) => (
            <SliderContainer key={index}>
              <Text>{each.title}</Text>
            </SliderContainer>
          ))}
        </Slider>
      )}
      <Text>어때요?</Text>
      <Text
        onClick={() => {
          setRouletteArray(festivals);
          startRoulette();
          setStop(true);
        }}
      >
        룰렛 돌리기
      </Text>
    </RouletteContainer>
  );
};

export default Roulette;

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const SliderContainer = styled(Slider)`
  .slick-slider {
    height: 100px;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const Text = styled.span`
  font-size: 23px;
  text-align: center;
`;
