import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useObserver } from "mobx-react";
import useStore from "useStore";

const FestivalsSlide = ({ festivals }) => {
  const { FavoriteStore } = useStore();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  return useObserver(() => (
    <Container>
      <Title>어디갈까, 축제</Title>
      <FestivalsContainer {...settings}>
        {festivals.map((each) => (
          <FestivalCard key={each.id} bg={each.image2}>
            <Name>{each.title}</Name>
          </FestivalCard>
        ))}
      </FestivalsContainer>
    </Container>
  ));
};

export default FestivalsSlide;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span`
  font-size: 23px;
  margin-left: 20px;
`;

const FestivalsContainer = styled(Slider)`
  display: flex;
  width: 100%;
  margin: 10px 0;
`;

const FestivalCard = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  outline: none;
  border: none;
`;

const Name = styled.span`
  font-size: 23px;
  color: #fff;
`;
