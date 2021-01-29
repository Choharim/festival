import React from "react";
import styled from "styled-components";

const ThisMonth = ({ festival }) => {
  return (
    <Container>
      <Title>이번달 축제</Title>
      <FestivalsContainer>
        {festival.map((each, i) => (
          <Festival key={i}>
            <Picture src={each.firstimage} />
            <Name>{each.title}</Name>
          </Festival>
        ))}
      </FestivalsContainer>
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

const Festival = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.span``;

const Picture = styled.img``;
