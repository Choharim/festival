import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import useStore from "useStore";
import { useObserver } from "mobx-react";
import styled from "styled-components";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

const FastivalDetails = () => {
  let location = useLocation();
  let history = useHistory();
  const { FavoriteStore } = useStore();

  useEffect(() => {
    if (location.state === undefined) {
      history.push("/festivals");
    }
  }, [history, location]);

  return useObserver(() => (
    <>
      {location.state !== undefined && (
        <Container>
          <Img bg={location.state.festival.image2}></Img>
          <DesContainer>
            <Title>{location.state.festival.title}</Title>
            <SubTitle>{location.state.festival.subTitle}</SubTitle>
            <HeadContainer>
              <HeadWrap>
                <div>
                  {location.state.festival.hashTage.map((tage, i) => (
                    <HashTage key={i}>#{tage}</HashTage>
                  ))}
                </div>
                <Date>
                  {location.state.festival.startDate} ~{" "}
                  {location.state.festival.endDate}
                </Date>
              </HeadWrap>
              {FavoriteStore.favorite.some(
                (ele) => ele === location.state.festival.title
              ) ? (
                <FillBookMark
                  onClick={() =>
                    FavoriteStore.getFavorite(location.state.festival.title)
                  }
                />
              ) : (
                <BookMark
                  onClick={() =>
                    FavoriteStore.getFavorite(location.state.festival.title)
                  }
                />
              )}
            </HeadContainer>
          </DesContainer>
        </Container>
      )}
    </>
  ));
};

export default FastivalDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Img = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 440px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
`;

const Title = styled.span`
  align-self: flex-start;
  margin: 5px 0;
  font-size: 16px;
`;

const SubTitle = styled.span`
  align-self: flex-start;
  font-size: 32px;
  font-weight: bolder;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

const HeadWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 55px;
`;

const HashTage = styled.span`
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 16px;
  color: #959494;
  background-color: #f2f2f2;

  &:first-child {
    margin-right: 10px;
  }
`;

const Date = styled.span`
  font-size: 16px;
`;

const BookMark = styled(BsBookmark)`
  font-size: 32px;
  cursor: pointer;
`;

const FillBookMark = styled(BsFillBookmarkFill)`
  font-size: 32px;
  cursor: pointer;
`;
