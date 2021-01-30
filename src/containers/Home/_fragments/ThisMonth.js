import React from "react";
import styled from "styled-components";

const ThisMonth = ({ festivals }) => {
  return (
    <Container>
      <Title>이번달 축제</Title>
      <FestivalsContainer></FestivalsContainer>
    </Container>
  );
};

export default ThisMonth;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span``;

const FestivalsContainer = styled.div`
  display: flex;
  align-items: center;
`;
