import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

const FestivalsSlide = ({ festivals }) => {
  const { FavoriteStore } = useStore();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  return useObserver(() => (
    <Container>
      <Title>어디갈까, 축제</Title>
      <FestivalsContainer {...settings}>
        {festivals.map((each) => (
          <FestivalCard key={each.id} bg={each.image2}>
            {FavoriteStore.favorite.some((ele) => ele === each.title) ? (
              <FillBookMark
                onClick={() => FavoriteStore.getFavorite(each.title)}
              />
            ) : (
              <BookMark onClick={() => FavoriteStore.getFavorite(each.title)} />
            )}
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
  overflow: hidden;
`;

const Title = styled.span`
  font-size: 28px;
  margin-left: 20px;
`;

const FestivalsContainer = styled(Slider)`
  display: flex;
  width: 100%;
  margin: 20px 0;

  .slick-list {
    margin: 0 -10px;
  }
  .slick-slide > div {
    padding: 0 10px;
  }
`;

const FestivalCard = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Name = styled.span`
  font-size: 23px;
  color: #fff;
`;

const BookMark = styled(BsBookmark)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  color: #fff;
`;

const FillBookMark = styled(BsFillBookmarkFill)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  color: #fff;
`;
