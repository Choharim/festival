import React, { useState } from "react";
import styled, { css } from "styled-components";
import address from "images/address.png";
import time from "images/time.png";
import money from "images/money.png";
import phone from "images/phone.png";

const Category = ({ festival }) => {
  const [category, setCategory] = useState("");

  const showInfo = (category) => {
    switch (category) {
      case "시간":
        return `${festival.time}`;
      case "주소":
        return festival.address;
      case "요금":
        for (const [key, value] of Object.entries(festival.fee)) {
          return `${key} : ${value}`;
        }
        return;
      case "전화번호":
        return festival.phone;
      default:
        return `${festival.title}, 어때요?`;
    }
  };

  return (
    <>
      <CategoryContainer>
        <CategoryBox
          onClick={(e) =>
            e.target.innerText === category
              ? setCategory("")
              : setCategory(e.target.innerText)
          }
        >
          <CategoryIcon category={category === "시간"} bg={time}></CategoryIcon>
          <CategoryText category={category === "시간"}>시간</CategoryText>
        </CategoryBox>
        <CategoryBox
          onClick={(e) =>
            e.target.innerText === category
              ? setCategory("")
              : setCategory(e.target.innerText)
          }
        >
          <CategoryIcon
            category={category === "주소"}
            bg={address}
          ></CategoryIcon>
          <CategoryText category={category === "주소"}>주소</CategoryText>
        </CategoryBox>
        <CategoryBox
          onClick={(e) =>
            e.target.innerText === category
              ? setCategory("")
              : setCategory(e.target.innerText)
          }
        >
          <CategoryIcon
            category={category === "요금"}
            bg={money}
          ></CategoryIcon>
          <CategoryText category={category === "요금"}>요금</CategoryText>
        </CategoryBox>
        <CategoryBox
          onClick={(e) =>
            e.target.innerText === category
              ? setCategory("")
              : setCategory(e.target.innerText)
          }
        >
          <CategoryIcon
            category={category === "전화번호"}
            bg={phone}
          ></CategoryIcon>
          <CategoryText category={category === "전화번호"}>
            전화번호
          </CategoryText>
        </CategoryBox>
      </CategoryContainer>
      <InfoContainer category={category}>
        <span>{showInfo(category)}</span>
      </InfoContainer>
    </>
  );
};

export default Category;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  height: 70px;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  border-right: 0.5px solid #959494;
  cursor: pointer;
  &:last-child {
    border: none;
  }
`;

const CategoryIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-image: url(${(props) => props.bg});
  background-size: contain;
  pointer-events: none;
  ${(props) =>
    props.category &&
    css`
      width: 25px;
      height: 25px;
    `}
`;

const CategoryText = styled.span`
  color: #959494;
  ${(props) =>
    props.category &&
    css`
      font-weight: bolder;
      color: black;
    `}
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: 40px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`;
