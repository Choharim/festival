import React, { useEffect, useState } from "react";
import useStore from "useStore";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getFestivals } from "components/api/api";
import List from "./_fragments/List";

const FavoriteFestivals = () => {
  const { LogInStore, FavoriteStore } = useStore();
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    if (LogInStore.logInSuccess && FavoriteStore.favorite.length !== 0) {
      const response = Promise.resolve(getFestivals());
      response.then((data) => {
        setFestivals(
          FavoriteStore.favorite.map((each) =>
            data.find((obj) => obj.title === each)
          )
        );
      });
    }
  }, [LogInStore, FavoriteStore]);

  return useObserver(() => (
    <>
      {!LogInStore.logInSuccess ? (
        <Container>
          <Wrap>
            <Logo>어디갈까?</Logo>
            <LogInBtn to="/logIn">로그인 하러가기</LogInBtn>
          </Wrap>
        </Container>
      ) : FavoriteStore.favorite.length === 0 ? (
        <h1>관심축제가 없습니다</h1>
      ) : (
        <List festivals={festivals} />
      )}
    </>
  ));
};

export default FavoriteFestivals;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 68.8px);
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.span`
  font-family: "Stylish", sans-serif;
  font-size: 80px;
`;

const LogInBtn = styled(Link)`
  margin-top: 50px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  outline: none;
  border: none;
  border-radius: 25px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
`;
