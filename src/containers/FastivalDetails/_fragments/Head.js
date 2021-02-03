import React from "react";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import styled from "styled-components";
import useStore from "useStore";
import { useObserver } from "mobx-react";

const Head = ({ festival }) => {
  const { FavoriteStore } = useStore();

  return useObserver(() => (
    <>
      <Title>{festival.title}</Title>
      <SubTitle>{festival.subTitle}</SubTitle>
      <HeadContainer>
        <HeadWrap>
          <div>
            {festival.hashTage.map((tage, i) => (
              <HashTage key={i}>#{tage}</HashTage>
            ))}
          </div>
          <Date>
            {festival.startDate} ~ {festival.endDate}
          </Date>
        </HeadWrap>
        {FavoriteStore.favorite.some((ele) => ele === festival.title) ? (
          <FillBookMark
            onClick={() => FavoriteStore.getFavorite(festival.title)}
          />
        ) : (
          <BookMark onClick={() => FavoriteStore.getFavorite(festival.title)} />
        )}
      </HeadContainer>
    </>
  ));
};

export default Head;

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
