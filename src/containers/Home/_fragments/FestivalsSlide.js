import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import { BsFillBookmarkFill, BsBookmark, BsArrowRight } from "react-icons/bs";

const FestivalsSlide = ({ festivals }) => {
  const [slideCount, setSlideCount] = useState(3);
  const { FavoriteStore } = useStore();
  let history = useHistory();

  const updateSize = () => {
    if (window.innerWidth !== 0) {
      if (window.innerWidth > 1000) {
        setSlideCount(3);
      } else if (window.innerWidth > 630) {
        setSlideCount(2);
      } else {
        setSlideCount(1);
      }
    }
  };

  const resize = () => {
    window.addEventListener("resize", updateSize);
    //window.removeEventListener("resize", updateSize);
  };
  resize();

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return window.removeEventListener("resize", updateSize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slideCount,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  return useObserver(() => (
    <Container>
      <HeadContainer>
        <Title>어디갈까, 축제</Title>
        <MoreBtn to="/festivals">
          축제 더보기 <Arrow />
        </MoreBtn>
      </HeadContainer>
      <FestivalsContainer {...settings}>
        {festivals.map((each) => (
          <FestivalCard
            key={each.id}
            bg={each.image2}
            id="card"
            onClick={(e) =>
              e.target.id === "card" &&
              history.push({
                pathname: `/festivals/:${each.id}`,
                state: { festival: each },
              })
            }
          >
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

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: calc(100% - 40px);
`;

const Title = styled.span`
  font-size: 28px;
  font-family: "Stylish", sans-serif;
`;

const MoreBtn = styled(Link)`
  display: flex;
  align-items: center;
`;

const Arrow = styled(BsArrowRight)`
  margin-left: 10px;
  font-size: 23px;
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

  @media only screen and (max-width: 900px) {
    height: 200px;
  }
`;

const Name = styled.span`
  font-size: 18px;
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
