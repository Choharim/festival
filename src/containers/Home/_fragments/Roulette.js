import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { set } from "mobx";

const Roulette = ({ festivals }) => {
  const randomNumber = Math.floor(Math.random() * festivals.length);
  const [rouletteArray, setRouletteArray] = useState(festivals);
  const [move, setMove] = useState(true);

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
    infinite: move,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    speed: 100,
    autoplaySpeed: 100,
    afterChange: (slide) =>
      slide === rouletteArray.length - 1 && setMove(false),
  };

  return (
    <RecommendWap>
      <RouletteContainer>
        <Text>오늘은</Text>
        {rouletteArray.length === festivals.length + 1 && (
          <Slider {...settings}>
            {rouletteArray.map((each, index) => (
              <Name key={index}>{each.title}</Name>
            ))}
          </Slider>
        )}
        <Text>어때요?</Text>
        <RouletteBtn
          onClick={() => {
            startRoulette();
            setMove(true);
          }}
        >
          Click !
        </RouletteBtn>
      </RouletteContainer>
      <DesContainer visible={!move}>
        <Img
          visible={!move}
          bg={rouletteArray[rouletteArray.length - 1].image1}
        />
        <TextContainer>
          <Text>{rouletteArray[rouletteArray.length - 1].subTitle}</Text>
          <DesWrap>
            <Des>
              {rouletteArray[rouletteArray.length - 1].startDate} ~ {""}
              {rouletteArray[rouletteArray.length - 1].endDate}
            </Des>
            <Des>{rouletteArray[rouletteArray.length - 1].time}</Des>
            <Des>{rouletteArray[rouletteArray.length - 1].address}</Des>
          </DesWrap>
        </TextContainer>
      </DesContainer>
    </RecommendWap>
  );
};

export default Roulette;

const RecommendWap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  margin: 20px;
`;

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Text = styled.span`
  font-size: 23px;
  text-align: center;
`;

const Name = styled.span`
  font-size: 28px;
  text-align: center;
  white-space: nowrap;
  height: 50px;
  line-height: 50px;
`;

const RouletteBtn = styled.button`
  outline: none;
  border: none;
  font-size: 18px;
  background-color: #fff;
  cursor: pointer;
`;

const DesContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s ease;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      visibility: visible;
    `};

  > div {
    opacity: 0;
    visibility: hidden;
    transition: 0.5s ease;
    ${(props) =>
      props.visible &&
      css`
        opacity: 1;
        visibility: visible;
      `};
  }
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  cursor: pointer;
`;

const Img = styled.div`
  width: 50%;
  height: auto;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: calc(50% - 40px);
  padding: 20px;
`;

const DesWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Des = styled.span`
  font-size: 18px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
