import React, { useState } from "react";
import styled, { css } from "styled-components";
import address from "images/address.png";
import time from "images/time.png";
import money from "images/money.png";
import phone from "images/phone.png";

const Details = ({ festival }) => {
  const [category, setCategory] = useState("");

  return (
    <CategoryBox>
      <Category
        onClick={(e) =>
          e.target.innerText === category
            ? setCategory("")
            : setCategory(e.target.innerText)
        }
      >
        <CategoryIcon category={category === "시간"} bg={time}></CategoryIcon>
        <CategoryText category={category === "시간"}>시간</CategoryText>
      </Category>
      <Category
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
      </Category>
      <Category
        onClick={(e) =>
          e.target.innerText === category
            ? setCategory("")
            : setCategory(e.target.innerText)
        }
      >
        <CategoryIcon category={category === "요금"} bg={money}></CategoryIcon>
        <CategoryText category={category === "요금"}>요금</CategoryText>
      </Category>
      <Category
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
        <CategoryText category={category === "전화번호"}>전화번호</CategoryText>
      </Category>
    </CategoryBox>
  );
};

export default Details;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  height: 80px;
`;

const Category = styled.div`
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
      width: 30px;
      height: 30px;
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
