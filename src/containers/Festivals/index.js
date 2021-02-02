import React, { useEffect, useState } from "react";
import { getFestivals } from "components/api/api";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

const Festivals = () => {
  const [festivals, setFestivals] = useState([]);
  const { FavoriteStore } = useStore();

  useEffect(() => {
    const response = Promise.resolve(getFestivals());

    response.then((data) => {
      setFestivals(data);
    });
  }, []);

  return useObserver(() => (
    <Container>
      <Wrap>
        <Title>어디갈까, 축제</Title>
      </Wrap>
      <Wrap>
        {festivals.map((each) => (
          <FestvivalCard key={each.id}>
            <Img image={each.image1}>
              {FavoriteStore.favorite.some((ele) => ele === each.title) ? (
                <FillBookMark
                  onClick={() => FavoriteStore.getFavorite(each.title)}
                />
              ) : (
                <BookMark
                  onClick={() => FavoriteStore.getFavorite(each.title)}
                />
              )}
            </Img>
          </FestvivalCard>
        ))}
      </Wrap>
    </Container>
  ));
};

export default Festivals;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 20px;
`;

const Title = styled.span`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FestvivalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  cursor: pointer;
`;

const Img = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 350px;
  border-radius: 15px;
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
