import React from "react";
import styled from "styled-components";

const Details = ({ festival }) => {
  return (
    <>
      <Img src={festival.image1}></Img>
      <span>{festival.desc}</span>
      <TextContainer>
        <Title>#날짜 #시간</Title>
        <div>
          <DesText>
            {festival.startDate} ~ {festival.endDate}
          </DesText>
          <DesText>{festival.time}</DesText>
        </div>
        <Title>#요금</Title>
        <>
          {Object.entries(festival.fee).map((ele, i) => (
            <div key={i}>
              <DesText>{ele[0]}</DesText> : <DesText>{ele[1]}</DesText>
            </div>
          ))}
        </>
        <Title>#전화번호</Title>
        <DesText>{festival.phone}</DesText>
        <Title>#주소</Title>
        <DesText>{festival.address}</DesText>
      </TextContainer>
    </>
  );
};

export default Details;

const Img = styled.img`
  width: 100%;
  margin: 10px 0;
`;

const DesText = styled.span`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`;

const Title = styled.span`
  margin-bottom: 10px;
  font-size: 23px;
  font-weight: bolder;
  &:not(:first-child) {
    margin-top: 10px;
  }
`;
