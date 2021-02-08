import React from "react";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import styled from "styled-components";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const List = ({ festivals }) => {
  const { FavoriteStore, LogInStore } = useStore();
  let history = useHistory();

  return useObserver(() => (
    <Wrap>
      {festivals.map((each) => (
        <FestvivalCard key={each.id}>
          <Img
            image={each.image1}
            id="card"
            onClick={(e) => {
              e.target.id === "card" &&
                history.push({
                  pathname: `/festivals/:${each.id}`,
                  state: { festival: each },
                });
            }}
          >
            {FavoriteStore.favorite.some((ele) => ele === each.title) ? (
              <FillBookMark
                onClick={() => FavoriteStore.getFavorite(each.title)}
              />
            ) : (
              <BookMark
                onClick={() => {
                  LogInStore.logInSuccess
                    ? FavoriteStore.getFavorite(each.title)
                    : alert("로그인을 해주세요!");
                }}
              />
            )}
          </Img>
          <TextWrap>
            <DesText>{each.subTitle}</DesText>
            <div>
              {each.hashTage.map((tage, i) => (
                <HashTage key={i}>#{tage}</HashTage>
              ))}
            </div>
          </TextWrap>
        </FestvivalCard>
      ))}
      {festivals.length === 0 && (
        <None>
          <NonIcon />
          <span>검색 결과가 없습니다</span>
        </None>
      )}
    </Wrap>
  ));
};

export default List;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  &:first-child {
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 700px) {
    justify-content: center;
  }
`;

const FestvivalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 1000px) {
    width: 49%;
  }
  @media only screen and (max-width: 700px) {
    width: 90%;
  }
`;

const Img = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 350px;
  border-radius: 15px;
  cursor: pointer;

  @media only screen and (max-width: 700px) {
    height: 400px;
  }
`;

const BookMark = styled(BsBookmark)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: #fff;
`;

const FillBookMark = styled(BsFillBookmarkFill)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: #fff;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
`;

const DesText = styled.span`
  font-size: 18px;
  height: 60px;
`;

const HashTage = styled.span`
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 16px;
  color: #959494;
  background-color: #f2f2f2;

  &:first-child {
    margin-right: 5px;
  }
`;

const None = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NonIcon = styled(BiError)`
  font-size: 50px;
`;
